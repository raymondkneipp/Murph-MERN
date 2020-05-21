import axios from "axios";
import React, { useReducer } from "react";
import WorkoutContext from "./workoutContext";
import workoutReducer from "./workoutReducer";

export const WorkoutState = ({ children }) => {
  const initialState = {
    startTime: null,
    firstMileFinishTime: null,
    calisthenicsFinishTime: null,
    secondMileFinishTime: null,
    exercises: [
      { name: "Pull Ups", reps: 0, max: 100, increments: [2, 5, 10, 20] },
      { name: "Push Ups", reps: 0, max: 200, increments: [4, 10, 20, 40] },
      { name: "Squats", reps: 0, max: 300, increments: [6, 15, 30, 60] },
    ],
  };

  const [state, dispatch] = useReducer(workoutReducer, initialState);

  const setStartTime = (date) => {
    dispatch({
      type: "START_TIME",
      payload: date,
    });
  };

  const setFirstMileFinishTime = (date) => {
    dispatch({
      type: "FIRST_MILE_FINISH_TIME",
      payload: date,
    });
  };

  const setCalisthenicsFinishTime = (date) => {
    dispatch({
      type: "CALISTHENICS_FINISH_TIME",
      payload: date,
    });
  };

  const setSecondMileFinishTime = (date) => {
    dispatch({
      type: "SECOND_MILE_FINISH_TIME",
      payload: date,
    });
  };

  const saveMurph = async (murph) => {
    try {
      await axios.post("/api/murphs", murph);
    } catch (error) {
      console.error("Error Saving Murph");
      console.error(error);
    }
  };

  const clearWorkout = () => {
    dispatch({
      type: "CLEAR_WORKOUT",
    });
  };

  return (
    <WorkoutContext.Provider
      value={{
        startTime: state.startTime,
        firstMileFinishTime: state.firstMileFinishTime,
        calisthenicsFinishTime: state.calisthenicsFinishTime,
        secondMileFinishTime: state.secondMileFinishTime,
        exercises: state.exercises,
        setStartTime,
        setFirstMileFinishTime,
        setCalisthenicsFinishTime,
        setSecondMileFinishTime,
        saveMurph,
        clearWorkout,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};
