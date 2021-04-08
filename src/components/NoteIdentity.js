import React from "react";
import { FaCheck } from "react-icons/fa";

export default class NoteIdentity extends React.PureComponent {
  render() {
    return (
      <div style={styles.contaier}>
        <div style={styles.urlStrip}>
          <p style={styles.url}>{this.props.url}</p>
        </div>

        <div style={styles.inline}>
          <button onClick={this.props.copy} style={styles.button}>
            <p style={styles.copyLabel}>
              {this.props.copied ? "copied" : "copy"}
            </p>
            {this.props.copied && (
              <div style={styles.iconContainer}>
                <FaCheck color={"white"} />
              </div>
            )}
          </button>
        </div>
      </div>
    );
  }
}

const styles = {
  contaier: { flexDirection: "row" },
  urlStrip: {
    padding: "1vw",
    margin: 5,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.1)",
    display: "inline-block",
    borderColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
  },
  url: { margin: 0, fontSize: "calc(10px + 1vmin)"},
  button: {
    padding: "1vw",
    margin: 5,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.0)",
    borderWidth: 0,
    outline: "none",
  },
  copyLabel: { margin: 0, color: "white", fontWeight: "600" },
  inline: { display: "inline-block" },
  iconContainer: { marginLeft: 6 },
};
