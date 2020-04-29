import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  margin: auto;
  box-sizing: border-box;
  padding: 1rem;
  overflow: hidden;

  border-style: solid;
  border-width: 0;

  @media (min-width: 24em) {
    border-color: red;
    max-width: 24em;
  }
  @media (min-width: 36em) {
    border-color: blue;
    max-width: 36em;
  }

  @media (min-width: 48em) {
    border-color: yellow;
    max-width: 48em;
  }

  @media (min-width: 60em) {
    border-color: green;
    max-width: 60em;
  }
`;

export const Container = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
