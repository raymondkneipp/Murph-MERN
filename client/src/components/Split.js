import React, { useContext } from "react";
import styled from "styled-components";
import WorkoutContext from "../context/workout/workoutContext";
import { msToTime } from "../util/format";

const SplitStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 24rem;
  background-color: #2d3748;
  padding: 0.8rem 1rem;
  border-radius: 0.6rem;
  margin: 0.5rem;
  box-sizing: border-box;

  & h4 {
    font-size: 1rem;
    color: #a0aec0;
    margin: 0;
    font-weight: normal;
  }

  & h3 {
    font-size: 1.2rem;
    color: white;
    margin: 0;
  }
`;

export const Split = () => {
  const {
    startTime,
    firstMileFinishTime,
    calisthenicsFinishTime,
    secondMileFinishTime,
  } = useContext(WorkoutContext);

  return (
    <>
      {startTime && firstMileFinishTime && (
        <SplitStyle>
          <h4>First Mile</h4>
          <h3>{msToTime(firstMileFinishTime - startTime)}</h3>
        </SplitStyle>
      )}
      {firstMileFinishTime && calisthenicsFinishTime && (
        <SplitStyle>
          <h4>Calisthenics</h4>
          <h3>{msToTime(calisthenicsFinishTime - firstMileFinishTime)}</h3>
        </SplitStyle>
      )}
      {calisthenicsFinishTime && secondMileFinishTime && (
        <SplitStyle>
          <h4>Second Mile</h4>
          <h3>{msToTime(secondMileFinishTime - calisthenicsFinishTime)}</h3>
        </SplitStyle>
      )}
    </>
  );
};
