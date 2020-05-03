import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faRunning,
  faThumbsUp,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../components/Container";
import { CounterGroup } from "../components/CounterGroup";
import { Split } from "../components/Split";
import { Timer } from "../components/Timer";
import AuthContext from "../context/auth/authContext";

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
  const [startTime] = useState(new Date());
  const [running, setRunning] = useState(true);
  const [stage, setStage] = useState(1);
  const [splits, setSplits] = useState([]);
  const [saved, setSaved] = useState(false);

  const { isAuthenticated } = useContext(AuthContext);

  const handleClick = () => {
    setStage(stage + 1);
    if (stage === 3) {
      setRunning(false);
    }

    if (stage === 1) {
      setSplits([
        {
          text: "First Mile",
          time: { start: startTime, finish: new Date() },
        },
      ]);
    }

    if (stage === 2) {
      setSplits([
        ...splits,
        {
          text: "Calisthenics",
          time: {
            start: splits[0].time.finish,
            finish: new Date(),
          },
        },
      ]);
    }

    if (stage === 3) {
      setSplits([
        ...splits,
        {
          text: "Second Mile",
          time: {
            start: splits[1].time.finish,
            finish: new Date(),
          },
        },
      ]);

      // Add Murph to database if logged in
      if (isAuthenticated) {
        const murph = {
          mileOneTime: splits[0].time.finish - startTime,
          calisthenicsTime: splits[1].time.finish - splits[1].time.start,
          mileTwoTime: new Date() - splits[1].time.finish,
          totalTime: new Date() - startTime,
        };

        async function saveMurph(murph) {
          try {
            await axios.post("/api/murphs", murph);

            setSaved(true);
          } catch (error) {
            console.error("Error Saving Murph");
            console.error(error);
          }
        }

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
        <Split splits={splits} />
        <Timer running={running} startTime={startTime} />
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
