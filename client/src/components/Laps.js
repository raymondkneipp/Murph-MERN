import React from "react";
import styled from "styled-components";
import { formatTime } from "../util/time";

const LapsStyle = styled.div`
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

export const Laps = ({ laps }) => {
  return (
    <>
      {laps.map((lap) => {
        const { minutes, seconds } = formatTime(
          lap.time.start,
          lap.time.finish
        );
        return (
          <LapsStyle key={lap.text}>
            <h4 className="text-sm text-gray-500">{lap.text}</h4>
            <h3 className="text-lg text-white font-bold">
              {minutes}:{seconds}
            </h3>
          </LapsStyle>
        );
      })}
    </>
  );
};
