import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../components/Container";
import { formatDate, msToTime } from "../util/time";

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  grid-column-gap: 1rem;
  grid-row-gap: 0.5rem;

  & h3 {
    color: #63b3ed;
    text-align: right;
    margin: 0rem;
  }

  & p {
    margin: 0;
    padding: 1rem;
    color: #a0aec0;
  }
`;

export const Murph = () => {
  const { id } = useParams();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mileOneTime, setMileOneTime] = useState(0);
  const [calisthenicsTime, setCalisthenicsTime] = useState(0);
  const [mileTwoTime, setMileTwoTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [date, setDate] = useState(0);

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

        setFname(data.user.fname);
        setLname(data.user.lname);
        setMileOneTime(data.mileOneTime);
        setCalisthenicsTime(data.calisthenicsTime);
        setMileTwoTime(data.mileTwoTime);
        setTotalTime(data.totalTime);
        setDate(data.date);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMurph();
  }, [id]);

  return (
    <MurphStyle>
      <Container>
        <h1>Murph</h1>

        <Grid>
          <h3>User</h3>
          <p>
            {fname} {lname}
          </p>

          <h3>1st Mile Time</h3>
          <p>{msToTime(mileOneTime)}</p>

          <h3>Calisthenics Time</h3>
          <p>{msToTime(calisthenicsTime)}</p>

          <h3>2nd Mile Time</h3>
          <p>{msToTime(mileTwoTime)}</p>

          <h3>Total Time</h3>
          <p>{msToTime(totalTime)}</p>

          <h3>Date</h3>
          <p>{formatDate(date)}</p>
        </Grid>
      </Container>
    </MurphStyle>
  );
};
