import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import classes from "./QuarantineClock.module.css";
import { Button } from "@material-ui/core";

const t1 = 0;

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 200,
  strokeWidth: 15,
};

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className={time}></div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

export default function QuarantineClock() {
  const [quarantineTimer, setQuarantineTimer] = useState(false);
  const startTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = startTime + daySeconds * 14; // use UNIX timestamp in seconds

  const remainingTime = endTime - startTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;
  if (quarantineTimer === true) {
    return (
      <div className={classes.clock}>
        <CountdownCircleTimer
          {...timerProps}
          colors=" #51C4D3"
          duration={daysDuration}
          initialRemainingTime={remainingTime}
        >
          {({ elapsedTime, color }) => (
            <span style={{ color: "black", fontSize: "30px" }}>
              {days}
              {renderTime("days left", getTimeDays(daysDuration - elapsedTime))}
            </span>
          )}
        </CountdownCircleTimer>
      </div>
    );
  } else {
    return (
      <div className={classes.notQ}>
        <Button
          className={classes.startButton}
          onClick={() => {
            setQuarantineTimer(true);
          }}
        >
          Start Timer!
        </Button>
      </div>
    );
  }
}
