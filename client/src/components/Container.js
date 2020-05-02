import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  margin: auto;
  box-sizing: border-box;
  padding: 1rem;
  overflow: hidden;

  @media (min-width: 24em) {
    max-width: 24em;
  }
  @media (min-width: 36em) {
    max-width: 36em;
  }

  @media (min-width: 48em) {
    max-width: 48em;
  }

  @media (min-width: 60em) {
    max-width: 60em;
  }
`;

export const Container = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
