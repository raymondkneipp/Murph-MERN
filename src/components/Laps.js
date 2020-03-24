import React from "react";

export const Laps = ({ laps }) => {
  return (
    <>
      {laps.map(lap => {
        return (
          <div
            key={lap.time}
            className="bg-gray-800 max-w-xs flex items-center justify-between w-full max-w-xs rounded-lg px-3 py-2 my-2"
          >
            <h4 className="text-sm text-gray-500">{lap.text}</h4>
            <h3 className="text-lg text-white font-bold">{lap.time}</h3>
          </div>
        );
      })}
    </>
  );
};
