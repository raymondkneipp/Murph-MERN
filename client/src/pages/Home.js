import {
  faDotCircle,
  faHourglassStart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../components/Container";

const List = styled.ul`
  list-style: none;
  padding: 1rem 0;
  margin: 1rem;

  & li {
    margin-bottom: 0.5rem;
    color: #a0aec0;

    &::before {
      content: " ";
      display: inline-block;
      position: relative;
      top: 2.1rem;
      left: 0.8rem;
      width: 0.3rem;
      height: 2rem;
      background-color: #a0aec0;
    }

    &:last-child::before {
      content: " ";
      display: inline-block;
      position: relative;
      top: 2.1rem;
      left: 0.8rem;
      width: 0.3rem;
      height: 2rem;
      background-color: transparent;
    }

    & svg {
      margin-right: 1rem;
    }
  }

  & li:last-child {
    margin-bottom: 0;
  }
`;

const HomeStyle = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  & h1 {
    color: #a0aec0;
    font-weight: bold;
    font-size: 2rem;
    text-align: center;
  }

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const BeginButton = styled.div`
  margin: 1rem 0;
  & a {
    color: #63b3ed;
    transition: all 0.2s;
    border: 0.1rem solid #63b3ed;
    border-radius: 5rem;
    text-decoration: none;
    padding: 1rem 1.2rem;
    font-size: 1.1rem;

    &:focus {
      outline: 0;
      box-shadow: 0 0 0 0.2rem #63b3ed;
    }

    &:hover {
      color: #1a202c;
      background-color: #63b3ed;
    }
  }
`;

export const Home = () => {
  return (
    <HomeStyle>
      <Container>
        <h1>The Murph Workout</h1>
        <List>
          <li>
            <FontAwesomeIcon icon={faDotCircle} size="lg" color="#a0aec0" /> 1
            Mile Run
          </li>
          <li>
            <FontAwesomeIcon icon={faDotCircle} size="lg" color="#a0aec0" /> 100
            Pull Ups
          </li>
          <li>
            <FontAwesomeIcon icon={faDotCircle} size="lg" color="#a0aec0" /> 200
            Push Ups
          </li>
          <li>
            <FontAwesomeIcon icon={faDotCircle} size="lg" color="#a0aec0" /> 300
            Squats
          </li>
          <li>
            <FontAwesomeIcon icon={faDotCircle} size="lg" color="#a0aec0" /> 1
            Mile Run
          </li>
        </List>

        <BeginButton>
          <Link to="/workout">
            <FontAwesomeIcon icon={faHourglassStart} /> Begin Workout
          </Link>
        </BeginButton>
      </Container>
    </HomeStyle>
  );
};
