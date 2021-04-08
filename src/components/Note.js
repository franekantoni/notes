import React from "react";

import NewButton from "./NewButton.js";
import SaveControl from "./SaveControl.js";
import NoteIdentity from "./NoteIdentity.js";
import TimeControl from "./TimeControl.js";
import PasswordInput from "./PasswordInput.js";
import PasswordStrip from "./PasswordStrip.js";

var sha256 = require("js-sha256");

const initialState = {
  text: "",
  savedText: "",
  copied: false,
  saveLoading: false,
  wrongPassword: false,
  noteId: null,
  password: null,
  untilTimestamp: Date.now() + 1000 * 60 * 60 * 24,
  timeChangeDone: true,
};

const howMuchTimeLeft = (untilTimestamp) => {
  const mil = untilTimestamp - Date.now();
  var minutes = mil / (1000 * 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  return { days: days, hours: hours, minutes: minutes };
};

export default class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const noteId = window.location.pathname.replace("/", "");
    if (noteId.length > 0) {
      this.setState({ noteId: noteId });
    } else {
      this.setState({ loaded: true });
      this.openNewNote();
    }
  }

  openNewNote = () => {
    var newState = Object.assign({}, initialState);
    const noteId = sha256((Date.now() * Math.random() * 100).toString()).slice(
      0,
      14
    );
    newState.noteId = noteId;
    newState.password = sha256(
      (Date.now() * Math.random() * 100).toString()
    ).slice(0, 10);
    this.setState(newState);
  };

  handleTextChange = (event) => {
    this.setState({ text: event.target.value });
  };

  save = () => {
    this.setState({ savedText: this.state.text, saveLoading: true });
    fetch(
      "https://3lzatsbxak.execute-api.eu-central-1.amazonaws.com/beta/note",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pk: this.state.noteId,
          password: this.state.password,
          untilTimestamp: this.state.untilTimestamp,
          text: this.state.text
        }),
      }
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.success) {
          this.setState({ saveLoading: false });
        }
      });
  };

  submitPassowrd = (password) => {
    const pk = this.state.noteId;
    const hash = sha256(password);

    fetch(
      "https://3lzatsbxak.execute-api.eu-central-1.amazonaws.com/beta/note?sk=" +
        encodeURIComponent(hash) +
        "&pk=" +
        encodeURIComponent(pk),
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.note) {
          this.setState({
            loaded: true,
            text: jsonResponse.note.text,
            untilTimestamp: jsonResponse.note.untilTimestamp,
            savedText: jsonResponse.note.text,
            password: password,
          });
        } else {
          this.setState({ wrongPassword: true });
        }
      });
  };

  copy = () => {
    this.setState({ copied: true });
    navigator.clipboard.writeText(
      window.location.origin + "/" + this.state.noteId
    );
    setTimeout(() => {
      this.setState({ copied: false });
    }, 2000);
  };

  changeTime = (adding) => {
    clearTimeout(this.timeChangeTimeout);
    const { days, hours, minutes } = howMuchTimeLeft(this.state.untilTimestamp);
    const oneMinute = 1000 * 60;
    const oneHour = oneMinute * 60;
    const oneDay = oneHour * 24;

    var newUntilTimestamp = 0;
    for (const { timeSegment, segmentLength } of [
      { timeSegment: days, segmentLength: oneDay },
      { timeSegment: hours, segmentLength: oneHour },
      { timeSegment: minutes, segmentLength: oneMinute },
    ]) {
      if (timeSegment > 0) {
        if (adding) {
          newUntilTimestamp = this.state.untilTimestamp + segmentLength;
        } else {
          newUntilTimestamp = Math.max(
            this.state.untilTimestamp - segmentLength,
            Date.now() + segmentLength, 
          );
        }
        break;
      }
    }

    this.setState({ timeChangeDone: false, untilTimestamp: newUntilTimestamp });
    this.startTimeChangeTimeout();
  };

  startTimeChangeTimeout = () => {
    this.timeChangeTimeout = setTimeout(() => {
      fetch(
        "https://3lzatsbxak.execute-api.eu-central-1.amazonaws.com/beta/time",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pk: this.state.noteId,
            sk: sha256(this.state.password),
            untilTimestamp: this.state.untilTimestamp,
          }),
        }
      )
        .then((response) => response.json())
        .then((jsonResponse) => {
          this.setState({ timeChangeDone: true });
        });
    }, 1000);
  };

  render() {
    return (
      <div style={styles.container}>
        {this.state.loaded && (
          <div>
            {this.state.savedText && (
              <div style={styles.header}>
                <NoteIdentity
                  url={window.location.origin + "/" + this.state.noteId}
                  copy={this.copy}
                  copied={this.state.copied}
                />

                <NewButton openNewNote={this.openNewNote} />
              </div>
            )}
            {this.state.password && this.state.savedText && (
              <PasswordStrip password={this.state.password} />
            )}
            <div style={styles.center}>
              <div>
                <div style={styles.noteContainer}>
                  <div>
                    {this.state.savedText && (
                      <TimeControl
                        timeChangeDone={this.state.timeChangeDone}
                        changeTime={this.changeTime}
                        untilTimestamp={this.state.untilTimestamp}
                      />
                    )}
                  </div>
                  <SaveControl
                    loading={this.state.saveLoading}
                    save={this.save}
                    isSaved={this.state.text === this.state.savedText}
                  />
                </div>
                <textarea
                  value={this.state.text}
                  onChange={this.handleTextChange}
                  style={styles.textArea}
                />
              </div>
            </div>
          </div>
        )}
        {!this.state.loaded && (
          <PasswordInput
            noteId={this.state.noteId}
            wrongPassword={this.state.wrongPassword}
            submitPassowrd={this.submitPassowrd}
          />
        )}
      </div>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "#282c34",
    minHeight: "100vh",
    color: "white",
    padding: "1vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginTop: "1vw",
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
  },
  center: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  noteContainer: {
    width: "80vw",
    flexDirection: "row",
    marginBottom: "2vh",
    marginTop: "7vh",
    alignItems: "flex-end",
    display: "flex",
    justifyContent: "space-between",
  },
  textArea: {
    width: "76vw",
    outline: "none",
    minHeight: "70vh",
    fontSize: "calc(12px + 1vmin)",
    padding: "2vw",
    margin: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    color: "white",
    borderRadius: 10,
    borderWidth: 0,
  },
};
