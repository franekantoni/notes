import React from "react";
import { FaLock, FaArrowAltCircleRight } from "react-icons/fa";

export default class PasswordInput extends React.PureComponent {
  handlePasswordChange = (event) => {
    this.password = event.target.value;
  };

  submitPassowrd = () => {
    this.props.submitPassowrd(this.password);
  };

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.labels}>
          <p style={styles.idStyle}>{this.props.noteId}</p>
          {!this.props.wrongPassword && (
            <p style={styles.passwordLabel}>
              password protected <FaLock />
            </p>
          )}
          {this.props.wrongPassword && (
            <p style={styles.wrongPasswordLabel}>wrong password</p>
          )}
        </div>
        <div style={styles.center}>
          <input
            type="text"
            id="lname"
            name="lname"
            onChange={this.handlePasswordChange}
            style={styles.passwordInputStyle}
          />
          <button onClick={this.submitPassowrd} style={styles.button}>
            <FaArrowAltCircleRight size={30} color={"rgb(0,122,255)"} />
          </button>
        </div>
      </div>
    );
  }
}

const styles = {
  idStyle: { 
  	margin: 0, 
  	color: "white", 
  	fontWeight: "500" 
  },
  container: { 
  	marginBottom: "20vh" 
  },
  labels: { 
  	marginBottom: 10 
  },
  passwordLabel: {
    margin: 0,
    color: "white",
    fontWeight: "500",
    opacity: 0.4,
  },
  wrongPasswordLabel: {
    margin: 0,
    color: "red",
    fontWeight: "500",
    opacity: 0.8,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  passwordInputStyle: {
    backgroundColor: "rgba(255,255,255,0.2)",
    fontSize: "calc(12px + 2vmin)",
    padding: "2vh",
    borderRadius: 10,
    borderWidth: 0,
    outline: "none",
    color: "white",
  },
  button: {
    margin: "1vw",
    backgroundColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    outline: "none",
  },
};
