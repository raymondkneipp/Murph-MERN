import React from "react";
import styled from "styled-components";

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

  & h4 {
    font-size: 1rem;
    color: #a0aec0;
    margin: 0;
    font-weight: normal;
  }
`;

export const Errors = ({ errors }) => {
  return (
    <>
      {errors.map((error, index) => {
        return (
          <ErrorStyle key={index}>
            <h4>{error.msg}</h4>
          </ErrorStyle>
        );
      })}
    </>
  );
};
