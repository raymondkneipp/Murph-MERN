import React, { useState } from "react";

export const Counter = ({ exercise, max, increments }) => {
  const [reps, setReps] = useState(0);

  const percentage = (reps * 100) / max;

  const handleClick = increment => {
    if (reps + increment < 0) {
      setReps(0);
    } else if (reps + increment > max) {
      setReps(max);
    } else {
      setReps(reps + increment);
    }
  };

  return (
    <div className="max-w-xs w-full mb-5">
      <div className="flex flex-row justify-between items-baseline">
        <p className="text-lg text-gray-100 max-w-xs">{exercise}</p>
        <p className="text-sm text-gray-500 max-w-xs">
          {reps} / {max}
        </p>
      </div>
      <div className="flex">
        <button
          className="flex-1 transition duration-500 bg-gray-800 hover:bg-gray-700 hover:text-white shadow rounded-l-full flex items-center justify-center text-md flex items-center text-gray-500 py-3 px-4"
          onClick={() => handleClick(increments[0])}
        >
          +{increments[0]}
        </button>
        <button
          className="flex-1 transition duration-500 bg-gray-800 hover:bg-gray-700 hover:text-white shadow flex items-center justify-center text-md flex items-center text-gray-500 py-3 px-4"
          onClick={() => handleClick(increments[1])}
        >
          +{increments[1]}
        </button>
        <button
          className="flex-1 transition duration-500 bg-gray-800 hover:bg-gray-700 hover:text-white shadow flex items-center justify-center text-md flex items-center text-gray-500 py-3 px-4"
          onClick={() => handleClick(increments[2])}
        >
          +{increments[2]}
        </button>
        <button
          className="flex-1 transition duration-500 bg-gray-800 hover:bg-gray-700 hover:text-white shadow rounded-r-full flex items-center justify-center text-md flex items-center text-gray-500 py-3 px-4"
          onClick={() => handleClick(increments[3])}
        >
          +{increments[3]}
        </button>
      </div>
      <div className="bg-gray-800 h-1 w-full flex-1 rounded-full mt-2">
        <div
          className="bg-blue-500 h-1 flex-1 rounded-full mt-1"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
