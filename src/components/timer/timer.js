import { Box, Typography } from "@mui/material";
import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useTimer } from "react-timer-hook";

const defaultTime = new Date();

const Timer = forwardRef(({ timeInMinutes }, ref) => {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    defaultTime,
    onExpire: () => console.warn("onExpire called"),
  });

  useEffect(() => {
    restartTimer();
  }, []);

  useImperativeHandle(ref, () => ({
    restart() {
      restartTimer();
    },
    stop() {
      pause();
    },
    resume() {
      resume();
    },
  }));

  const restartTimer = () => {
    const time = new Date();
    time.setMinutes(time.getMinutes() + timeInMinutes);
    restart(time);
  };

  return (
    <Box>
      <Typography variant="h6">{`${hours * 60 + minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}`}</Typography>
    </Box>
  );
});

export default Timer;
