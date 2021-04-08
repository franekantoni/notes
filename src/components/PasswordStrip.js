import React from "react";
import { FaLock, FaCheck } from "react-icons/fa";

export default class PasswordStrip extends React.Component {
  state = {
    showPassword: false,
    copied: false,
  };
  show = () => {
    this.setState({ showPassword: true });
  };
  hide = () => {
    this.setState({ showPassword: false });
  };
  copy = () => {
    navigator.clipboard.writeText(this.props.password);
    this.setState({ copied: true });
    setTimeout(() => {
      this.setState({ copied: false });
    }, 2000);
  };
  render() {
    return (
      <button
        style={styles.container}
        onClick={this.copy}
        onMouseEnter={this.show}
        onMouseLeave={this.hide}
      >
        <div style={styles.iconContainer}>
          <FaLock color={"white"} />
        </div>
        <div style={styles.passwordContainer}>
          {this.state.showPassword && (
            <p style={styles.p}>{this.props.password}</p>
          )}
          {!this.state.showPassword && <p style={styles.p}>************</p>}
        </div>
        <div style={styles.labelContainer}>
          {this.state.copied && (
            <p style={styles.p}>
              copied <FaCheck color={"white"} />
            </p>
          )}
          {!this.state.copied && this.state.showPassword && (
            <p style={styles.p}>copy</p>
          )}
        </div>
      </button>
    );
  }
}

const styles = {
  container: {
    flexDirection: "row",
    padding: "1vw",
    backgroundColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    outline: "none",
  },
  iconContainer: { margin: 5, display: "inline-block" },
  passwordContainer: {
    margin: 5,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.0)",
    display: "inline-block",
  },
  labelContainer: { margin: 5, display: "inline-block" },
  p: { margin: 0, color: "white" },
};
