import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Timer } from "../components/Timer";
import { Laps } from "../components/Laps";
import { CounterGroup } from "../components/CounterGroup";

export const Workout = () => {
  const [running, setRunning] = useState(true);
  const [time, setTime] = useState({});

  const [stage, setStage] = useState(1);

  const [laps, setLaps] = useState([]);

  const handleClick = () => {
    setStage(stage + 1);
    if (stage === 3) {
      setRunning(false);
    }

    if (stage === 1) {
      setLaps([
        {
          text: "First Mile",
          time: `${time.minutes}:${time.seconds}.${time.milliSeconds}`
        }
      ]);
    }

    if (stage === 2) {
      setLaps([
        ...laps,
        {
          text: "Calisthenics",
          time: `${time.minutes}:${time.seconds}.${time.milliSeconds}`
        }
      ]);
    }

    if (stage === 3) {
      setLaps([
        ...laps,
        {
          text: "Second Mile",
          time: `${time.minutes}:${time.seconds}.${time.milliSeconds}`
        }
      ]);
    }
  };

  const getTime = time => {
    setTime(time);
  };

  return (
    <div className="flex flex-col items-center flex-1 justify-center">
      {stage === 1 && (
        <Link
          to="/"
          className="text-sm text-gray-500 hover:underline mt-3 flex items-center"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="arrow-left"
            className="w-3 inline mr-1 text-gray-500"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"
            ></path>
          </svg>
          Cancel
        </Link>
      )}
      {stage === 2 && (
        <button
          className="text-sm text-gray-500 hover:underline mt-3 flex items-center"
          onClick={() => setStage(1)}
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="arrow-left"
            className="w-3 inline mr-1 text-gray-500"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"
            ></path>
          </svg>
          Back
        </button>
      )}
      <Laps laps={laps} />
      <Timer running={running} getTime={time => getTime(time)} />
      {stage === 3 && (
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="running"
          className="w-12 text-blue-500 mb-6"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 416 512"
        >
          <path
            fill="currentColor"
            d="M272 96c26.51 0 48-21.49 48-48S298.51 0 272 0s-48 21.49-48 48 21.49 48 48 48zM113.69 317.47l-14.8 34.52H32c-17.67 0-32 14.33-32 32s14.33 32 32 32h77.45c19.25 0 36.58-11.44 44.11-29.09l8.79-20.52-10.67-6.3c-17.32-10.23-30.06-25.37-37.99-42.61zM384 223.99h-44.03l-26.06-53.25c-12.5-25.55-35.45-44.23-61.78-50.94l-71.08-21.14c-28.3-6.8-57.77-.55-80.84 17.14l-39.67 30.41c-14.03 10.75-16.69 30.83-5.92 44.86s30.84 16.66 44.86 5.92l39.69-30.41c7.67-5.89 17.44-8 25.27-6.14l14.7 4.37-37.46 87.39c-12.62 29.48-1.31 64.01 26.3 80.31l84.98 50.17-27.47 87.73c-5.28 16.86 4.11 34.81 20.97 40.09 3.19 1 6.41 1.48 9.58 1.48 13.61 0 26.23-8.77 30.52-22.45l31.64-101.06c5.91-20.77-2.89-43.08-21.64-54.39l-61.24-36.14 31.31-78.28 20.27 41.43c8 16.34 24.92 26.89 43.11 26.89H384c17.67 0 32-14.33 32-32s-14.33-31.99-32-31.99z"
          ></path>
        </svg>
      )}
      {stage === 1 && (
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="running"
          className="w-12 text-blue-500 mb-6"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 416 512"
        >
          <path
            fill="currentColor"
            d="M272 96c26.51 0 48-21.49 48-48S298.51 0 272 0s-48 21.49-48 48 21.49 48 48 48zM113.69 317.47l-14.8 34.52H32c-17.67 0-32 14.33-32 32s14.33 32 32 32h77.45c19.25 0 36.58-11.44 44.11-29.09l8.79-20.52-10.67-6.3c-17.32-10.23-30.06-25.37-37.99-42.61zM384 223.99h-44.03l-26.06-53.25c-12.5-25.55-35.45-44.23-61.78-50.94l-71.08-21.14c-28.3-6.8-57.77-.55-80.84 17.14l-39.67 30.41c-14.03 10.75-16.69 30.83-5.92 44.86s30.84 16.66 44.86 5.92l39.69-30.41c7.67-5.89 17.44-8 25.27-6.14l14.7 4.37-37.46 87.39c-12.62 29.48-1.31 64.01 26.3 80.31l84.98 50.17-27.47 87.73c-5.28 16.86 4.11 34.81 20.97 40.09 3.19 1 6.41 1.48 9.58 1.48 13.61 0 26.23-8.77 30.52-22.45l31.64-101.06c5.91-20.77-2.89-43.08-21.64-54.39l-61.24-36.14 31.31-78.28 20.27 41.43c8 16.34 24.92 26.89 43.11 26.89H384c17.67 0 32-14.33 32-32s-14.33-31.99-32-31.99z"
          ></path>
        </svg>
      )}
      {stage === 4 && (
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="far"
          data-icon="thumbs-up"
          className="w-12 text-blue-500 mb-6"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M466.27 286.69C475.04 271.84 480 256 480 236.85c0-44.015-37.218-85.58-85.82-85.58H357.7c4.92-12.81 8.85-28.13 8.85-46.54C366.55 31.936 328.86 0 271.28 0c-61.607 0-58.093 94.933-71.76 108.6-22.747 22.747-49.615 66.447-68.76 83.4H32c-17.673 0-32 14.327-32 32v240c0 17.673 14.327 32 32 32h64c14.893 0 27.408-10.174 30.978-23.95 44.509 1.001 75.06 39.94 177.802 39.94 7.22 0 15.22.01 22.22.01 77.117 0 111.986-39.423 112.94-95.33 13.319-18.425 20.299-43.122 17.34-66.99 9.854-18.452 13.664-40.343 8.99-62.99zm-61.75 53.83c12.56 21.13 1.26 49.41-13.94 57.57 7.7 48.78-17.608 65.9-53.12 65.9h-37.82c-71.639 0-118.029-37.82-171.64-37.82V240h10.92c28.36 0 67.98-70.89 94.54-97.46 28.36-28.36 18.91-75.63 37.82-94.54 47.27 0 47.27 32.98 47.27 56.73 0 39.17-28.36 56.72-28.36 94.54h103.99c21.11 0 37.73 18.91 37.82 37.82.09 18.9-12.82 37.81-22.27 37.81 13.489 14.555 16.371 45.236-5.21 65.62zM88 432c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24 24-24 24 10.745 24 24z"
          ></path>
        </svg>
      )}

      {stage === 1 && (
        <h3 className="text-xl font-medium text-gray-100 max-w-xs text-center mb-6">
          First One Mile Run
        </h3>
      )}
      {stage === 2 && (
        <>
          <CounterGroup />
        </>
      )}
      {stage === 3 && (
        <h3 className="text-xl font-medium text-gray-100 max-w-xs text-center mb-6">
          Second One Mile Run
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
