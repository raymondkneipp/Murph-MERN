import { faHourglassStart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 mx-2">
      <div className="bg-gray-800 py-4 px-8 mb-6 shadow rounded-lg flex flex-col items-center max-w-xs w-full box-border">
        <h3 className="text-xl font-medium text-gray-100 max-w-xs text-center mb-2">
          The Murph Workout
        </h3>
        <ul className="text-gray-500 text-center">
          <li>One Mile Run</li>
          <li>
            <ul>
              <li>100 Pull Ups</li>
              <li>200 Push Ups</li>
              <li>300 Squats</li>
            </ul>
          </li>
          <li>One Mile Run</li>
        </ul>
      </div>
      <Link
        to="/workout"
        className="shadow rounded-full py-4 px-6 text-lg border-2 border-solid border-blue-400 text-blue-400"
      >
        <FontAwesomeIcon icon={faHourglassStart} /> Begin Workout
      </Link>
    </div>
  );
};
