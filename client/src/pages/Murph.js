import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../components/Container";

const MurphStyle = styled.div`
  display: flex;
  flex: 1;

  & h1 {
    text-align: center;
    color: #a0aec0;
    font-weight: bold;
    font-size: 2rem;
  }
`;

export const Murph = () => {
  const { id } = useParams();
  const [murph, setMurph] = useState({});

  useEffect(() => {
    async function fetchMurph() {
      try {
        let res = await fetch(`/api/murphs/${id}`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });

        let data = await res.json();
        setMurph(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMurph();
  }, []);

  return (
    <MurphStyle>
      <Container>
        <h1>Murph</h1>
        <p>{murph.totalTime}</p>
      </Container>
    </MurphStyle>
  );
};
