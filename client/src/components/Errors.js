import React, { useContext } from "react";
import AuthContext from "../context/auth/authContext";
import { Container } from "./Container";
import styled from "styled-components";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ErrorStyle = styled.div`
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
  border: 1px solid #f56565;
  margin: auto;

  & p {
    font-size: 1rem;
    color: white;
    margin: 0;
  }
`;

const CloseButton = styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;
  padding: 0.3rem;
  color: #a0aec0;
  border-radius: 100rem;
  width: 1.7rem;
  height: 1.7rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: 0;
    color: white;
  }

  &:hover {
    color: white;
  }

  & svg {
    font-size: 1rem;
    margin: 0;
    font-weight: normal;
    transition: all 0.2s;
  }
`;

export const Errors = () => {
  const { errors, deleteErrorAlert } = useContext(AuthContext);

  return (
    <Container>
      {errors &&
        errors.map((error, index) => (
          <ErrorStyle key={index}>
            <p>{error.msg}</p>
            <CloseButton onClick={() => deleteErrorAlert(index)}>
              <FontAwesomeIcon icon={faTimes} />
            </CloseButton>
          </ErrorStyle>
        ))}
    </Container>
  );
};
