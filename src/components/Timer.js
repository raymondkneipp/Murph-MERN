import React, { useState, useEffect } from "react";

export const Timer = ({ running, getTime }) => {
  const [startTime] = useState(new Date());
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [milliSeconds, setMilliSeconds] = useState("00");

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        const currentTime = new Date();

        var secondsPassed = ((currentTime - startTime) / 1000).toFixed(0);

        setMinutes(
          Math.floor(secondsPassed / 60)
            .toString()
            .padStart(2, "0")
        );
        setSeconds(
          (secondsPassed - Math.floor(secondsPassed / 60) * 60)
            .toString()
            .padStart(2, "0")
        );
        setMilliSeconds((currentTime - startTime).toString().slice(-3, -1));

        getTime({
          minutes: Math.floor(secondsPassed / 60)
            .toString()
            .padStart(2, "0"),
          seconds: (secondsPassed - Math.floor(secondsPassed / 60) * 60)
            .toString()
            .padStart(2, "0"),
          milliSeconds: (currentTime - startTime).toString().slice(-3, -1)
        });
      }, 10);
    }
    return () => {
      clearInterval(interval);
    };
  }, [running, startTime, getTime]);

  return (
    <div>
      <h1 className="text-6xl font-black text-blue-400 p-2">
        {minutes}:{seconds}.{milliSeconds}
      </h1>
    </div>
  );
};
