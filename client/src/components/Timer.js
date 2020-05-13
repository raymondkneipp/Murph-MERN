import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import WorkoutContext from "../context/workout/workoutContext";
import { formatTime } from "../util/format";

const TimerStyle = styled.div`
  color: #63b3ed;
  font-weight: bold;
  font-size: 4rem;
  text-align: center;
  margin: 2rem 0;
`;

export const Timer = ({ running }) => {
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [milliSeconds, setMilliSeconds] = useState("00");

  const { startTime } = useContext(WorkoutContext);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        const currentTime = new Date();
        const time = formatTime(startTime, currentTime);

        setMinutes(time["minutes"]);
        setSeconds(time["seconds"]);
        setMilliSeconds(time["milliseconds"]);
      }, 10);
    }
    return () => {
      clearInterval(interval);
    };
  }, [running, startTime]);

  return (
    <TimerStyle>
      {minutes}:{seconds}.{milliSeconds}
    </TimerStyle>
  );
};
