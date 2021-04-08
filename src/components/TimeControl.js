import React from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

const getTimeLeft = (mil) => {
  var minutes = mil / (1000 * 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return days + " days";
  } else if (hours > 0) {
    return hours + " hours";
  } else {
    return Math.floor(minutes) + " minutes";
  }
};

export default class TimeControl extends React.PureComponent {
  addTime = () => {
    this.props.changeTime(true);
  };

  subTime = () => {
    this.props.changeTime(false);
  };

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.labelContainer}>
          <p style={styles.noMargin}>Available for</p>
        </div>
        <button onClick={this.addTime} style={styles.buttonContainer}>
          <FaPlusCircle size={"16"} color={"rgb(0,122,255)"} />
        </button>
        <button onClick={this.subTime} style={styles.buttonContainer}>
          <FaMinusCircle size={"16"} color={"rgb(0,122,255)"} />
        </button>

        <div
          style={{
            margin: 5,
            borderRadius: 5,
            display: "inline-block",
            borderColor: "rgba(255,255,255,0.2)",
            borderWidth: 1,
            opacity: this.props.timeChangeDone ? 1 : 0.4,
          }}
        >
          <p style={styles.timeLabel}>
            {getTimeLeft(this.props.untilTimestamp - Date.now())}
          </p>
        </div>
      </div>
    );
  }
}

const styles = {
  container: { flexDirection: "row" },
  labelContainer: {
    margin: 5,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.0)",
    flexDirection: "row",
    display: "inline-block",
    borderColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
  },
  buttonContainer: {
    backgroundColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    outline: "none",
  },
  noMargin: { margin: 0 },
  timeLabel: { margin: 0, fontWeight: "600", color: "white" },
};
