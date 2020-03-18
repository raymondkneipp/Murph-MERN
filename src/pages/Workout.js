import React, { useState, useEffect } from "react";
import { Counter } from "../components/Counter";

export const Workout = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [running, setRunning] = useState(true);

  const [stage, setStage] = useState(1);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(
        () =>
          setElapsedTime(prevElapsedTime => {
            const newElapsedTime = prevElapsedTime + 0.1;

            setMinutes(Math.floor(newElapsedTime / 60));
            setSeconds(newElapsedTime - Math.floor(newElapsedTime / 60) * 60);

            return newElapsedTime;
          }),
        100
      );
    }
    return () => {
      clearInterval(interval);
    };
  }, [running]);

  const handleClick = () => {
    setStage(stage + 1);
    if (stage === 3) {
      setRunning(false);
    }
  };

  return (
    <div className="flex flex-col items-center flex-1 justify-center">
      <h1 className="text-6xl font-black text-blue-400 p-2">
        {minutes
          .toFixed(0)
          .toString()
          .padStart(2, "0")}
        :
        {seconds
          .toFixed(0)
          .toString()
          .padStart(2, "0")}
      </h1>
      {stage === 1 && (
        <h3 className="text-xl font-medium text-gray-100 max-w-xs text-center mb-6">
          One Mile Run
        </h3>
      )}
      {stage === 2 && (
        <>
          <Counter exercise="Pull Ups" max={100} />
          <Counter exercise="Push Ups" max={200} />
          <Counter exercise="Squats" max={300} />
        </>
      )}
      {stage === 3 && (
        <h3 className="text-xl font-medium text-gray-100 max-w-xs text-center mb-6">
          One Mile Run
        </h3>
      )}
      {stage === 4 && (
        <h3 className="text-xl font-medium text-gray-100 max-w-xs text-center mb-6">
          Congratulations
        </h3>
      )}
      {stage !== 4 && stage !== 3 && (
        <button
          className="bg-blue-400 shadow rounded-full py-4 px-6 text-lg hover:underline flex items-center text-gray-900"
          onClick={() => handleClick()}
        >
          Next
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="arrow-right"
            className="w-6 inline ml-4 text-gray-900"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"
            ></path>
          </svg>
        </button>
      )}
      {stage === 3 && (
        <button
          className="bg-blue-400 shadow rounded-full py-4 px-6 text-lg hover:underline flex items-center text-gray-900"
          onClick={() => handleClick()}
        >
          Finish
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="arrow-right"
            className="w-6 inline ml-4 text-gray-900"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
};
