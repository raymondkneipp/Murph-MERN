import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faRunning,
  faThumbsUp,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../components/Container";
import { CounterGroup } from "../components/CounterGroup";
import { Split } from "../components/Split";
import { Timer } from "../components/Timer";
import AuthContext from "../context/auth/authContext";
import WorkoutContext from "../context/workout/workoutContext";

const WorkoutStyle = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & h2 {
    color: #a0aec0;
    font-weight: bold;
    font-size: 1.5rem;
    text-align: center;
    margin: 2rem 0;
  }

  & p {
    color: #a0aec0;
    font-size: 1rem;
    text-align: center;
    margin: 0;
  }

  & a {
    color: #a0aec0;
    text-decoration: none;
    transition: all 0.2s;
    font-size: 0.9rem;
    margin: 1rem 0;

    &:hover {
      color: white;
    }
  }
`;

const Button = styled.div`
  margin: 1rem auto;

  color: #63b3ed;
  transition: all 0.2s;
  border: 0.1rem solid #63b3ed;
  border-radius: 5rem;
  padding: 1rem 1.2rem;
  font-size: 1.1rem;
  background-color: #1a202c;
  cursor: pointer;

  &:focus {
    outline: 0;
  }

  &:hover {
    color: #1a202c;
    background-color: #63b3ed;
  }
`;

const BackButton = styled.button`
  color: #a0aec0;
  text-decoration: none;
  transition: all 0.2s;
  font-size: 0.9rem;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  margin: 1rem 0;

  &:hover {
    color: white;
  }

  &:focus {
    outline: none;
  }
`;

export const Workout = ({ history }) => {
  const [running, setRunning] = useState(true);
  const [stage, setStage] = useState(1);
  const [saved, setSaved] = useState(false);

  const { isAuthenticated } = useContext(AuthContext);
  const {
    startTime,
    firstMileFinishTime,
    calisthenicsFinishTime,
    secondMileFinishTime,
    setStartTime,
    setFirstMileFinishTime,
    setCalisthenicsFinishTime,
    setSecondMileFinishTime,
    saveMurph,
    clearWorkout,
  } = useContext(WorkoutContext);

  // When component mounts set start time
  useEffect(() => {
    setStartTime(new Date());

    return () => {
      clearWorkout();
    };
    // eslint-disable-next-line
  }, []);

  const handleClick = () => {
    setStage(stage + 1);

    if (stage === 1) {
      setFirstMileFinishTime(new Date());
    }

    if (stage === 2) {
      setCalisthenicsFinishTime(new Date());
    }

    if (stage === 3) {
      setSecondMileFinishTime(new Date());

      // Stop timer
      setRunning(false);

      // Add Murph to database if logged in
      if (isAuthenticated) {
        const murph = {
          mileOneTime: firstMileFinishTime - startTime,
          calisthenicsTime: calisthenicsFinishTime - firstMileFinishTime,
          mileTwoTime: new Date() - calisthenicsFinishTime,
          totalTime: new Date() - startTime,
        };

        saveMurph(murph);
      }
    }
  };

  return (
    <WorkoutStyle>
      <Container>
        {stage === 1 && (
          <Link to="/">
            <FontAwesomeIcon icon={faArrowLeft} /> Cancel
          </Link>
        )}
        {stage === 2 && (
          <BackButton onClick={() => setStage(1)}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </BackButton>
        )}
        {stage === 4 && (
          <Link to="/">
            <FontAwesomeIcon icon={faArrowLeft} /> Back to Home
          </Link>
        )}
        <Split />
        <Timer running={running} />
        {stage === 1 && (
          <>
            <FontAwesomeIcon size="4x" color="#63b3ed" icon={faRunning} />
            <h2>First One Mile Run</h2>
          </>
        )}
        {stage === 2 && <CounterGroup />}
        {stage === 3 && (
          <>
            <FontAwesomeIcon color="#63b3ed" size="4x" icon={faRunning} />
            <h2>Second One Mile Run</h2>
            <Button onClick={() => handleClick()}>
              Finish <FontAwesomeIcon icon={faCheck} />
            </Button>
          </>
        )}
        {stage === 4 && (
          <>
            <FontAwesomeIcon color="#63b3ed" size="4x" icon={faThumbsUp} />
            <h2>Congratulations</h2>
            {isAuthenticated ? (
              <>{saved && <p>Workout Saved!</p>}</>
            ) : (
              <Button onClick={() => history.push("/signup")}>
                <FontAwesomeIcon icon={faUserPlus} /> Sign Up and Save Workouts
              </Button>
            )}
          </>
        )}
        {stage !== 4 && stage !== 3 && (
          <Button onClick={() => handleClick()}>
            Next <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        )}
      </Container>
    </WorkoutStyle>
  );
};
