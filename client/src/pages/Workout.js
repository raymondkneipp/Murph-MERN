import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faRunning,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../components/Container";
import { CounterGroup } from "../components/CounterGroup";
import { Laps } from "../components/Laps";
import { Timer } from "../components/Timer";
import { AuthContext } from "../Store";

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

export const Workout = () => {
  const [startTime] = useState(new Date());
  const [running, setRunning] = useState(true);
  const [stage, setStage] = useState(1);
  const [laps, setLaps] = useState([]);

  const { state } = useContext(AuthContext);
  const { isAuthenticated } = state;

  const handleClick = () => {
    setStage(stage + 1);
    if (stage === 3) {
      setRunning(false);
    }

    if (stage === 1) {
      setLaps([
        {
          text: "First Mile",
          time: { start: startTime, finish: new Date() },
        },
      ]);
    }

    if (stage === 2) {
      setLaps([
        ...laps,
        {
          text: "Calisthenics",
          time: {
            start: laps[0].time.finish,
            finish: new Date(),
          },
        },
      ]);
    }

    if (stage === 3) {
      setLaps([
        ...laps,
        {
          text: "Second Mile",
          time: {
            start: laps[1].time.finish,
            finish: new Date(),
          },
        },
      ]);

      // Add Murph to database if logged in
      if (isAuthenticated) {
        const murph = {
          mileOneTime: laps[0].time.finish - startTime,
          calisthenicsTime: laps[1].time.finish - laps[1].time.start,
          mileTwoTime: new Date() - laps[1].time.finish,
          totalTime: new Date() - startTime,
        };

        async function saveMurph(murph) {
          try {
            let res = await fetch("/api/murphs", {
              method: "post",
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": `${localStorage.getItem("token")}`,
              },
              body: JSON.stringify(murph),
            });

            let data = await res.json();

            if (res.ok) {
              console.log("saved");
            } else {
              throw data;
            }
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
        <Laps laps={laps} />
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
