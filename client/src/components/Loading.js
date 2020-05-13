import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const LoadingStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

export const Loading = () => {
  return (
    <LoadingStyle>
      <FontAwesomeIcon icon={faSpinner} size="3x" spin color="#4a5568" />
    </LoadingStyle>
  );
};
