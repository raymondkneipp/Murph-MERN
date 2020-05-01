import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { formatTime } from "../util/time";

const TimerStyle = styled.div`
  color: #63b3ed;
  font-weight: bold;
  font-size: 4rem;
  text-align: center;
  margin: 2rem 0;
`;

export const Timer = ({ running, startTime }) => {
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [milliSeconds, setMilliSeconds] = useState("00");

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
