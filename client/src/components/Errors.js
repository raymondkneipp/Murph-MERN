import React from "react";

export const Errors = ({ errors }) => {
  return (
    <>
      {errors.map((error, index) => {
        return (
          <div
            key={index}
            className="shadow bg-gray-800 max-w-xs flex items-center justify-center w-full max-w-xs rounded-lg px-3 py-2 my-2"
          >
            <h4 className="text-sm text-gray-500">{error.msg}</h4>
          </div>
        );
      })}
    </>
  );
};
