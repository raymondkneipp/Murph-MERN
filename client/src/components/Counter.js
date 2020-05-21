import React, { useState } from "react";
import styled from "styled-components";

const CouterStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 24rem;
  margin: 0.5rem 0;
`;

const Details = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  & h3 {
    color: white;
    font-weight: normal;
    margin: 0;
  }

  & p {
    margin: 0;
    color: #a0aec0;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  margin: 0.5rem 0;
`;

const Button = styled.button`
  flex: 1;
  background-color: #2d3748;
  border: 0;
  color: #a0aec0;
  padding: 1.3rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  margin: 0;

  &:hover {
    background-color: #4a5568;
    color: #fff;
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem #63b3ed;
    z-index: 10000;
  }

  &:first-child {
    border-radius: 5rem 0 0 5rem;
  }

  &:last-child {
    border-radius: 0 5rem 5rem 0;
  }
`;

const ProgressBar = styled.div`
  background-color: #2d3748;
  height: 0.4rem;
  width: 100%;
  border-radius: 5rem;
  overflow: hidden;

  & > div {
    height: 0.4rem;
    background-color: #63b3ed;
    border-radius: 5rem;
    transition: all 0.2s;
  }
`;

export const Counter = ({ exercise, max, increments }) => {
  const [reps, setReps] = useState(0);

  const percentage = (reps * 100) / max;

  const handleClick = (increment) => {
    if (reps + increment < 0) {
      setReps(0);
    } else if (reps + increment > max) {
      setReps(max);
    } else {
      setReps(reps + increment);
    }
  };

  return (
    <CouterStyle>
      <Details>
        <h3>{exercise}</h3>
        <p>
          {reps} / {max}
        </p>
      </Details>
      <ButtonGroup>
        <Button onClick={() => handleClick(increments[0])}>
          +{increments[0]}
        </Button>
        <Button onClick={() => handleClick(increments[1])}>
          +{increments[1]}
        </Button>
        <Button onClick={() => handleClick(increments[2])}>
          +{increments[2]}
        </Button>
        <Button onClick={() => handleClick(increments[3])}>
          +{increments[3]}
        </Button>
      </ButtonGroup>
      <ProgressBar>
        <div style={{ width: `${percentage}%` }}></div>
      </ProgressBar>
    </CouterStyle>
  );
};
