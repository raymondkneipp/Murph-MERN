import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "../components/Container";
import { formatDate, msToTime } from "../util/format";

const LeaderboardsStyle = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  & h1 {
    text-align: center;
    color: #a0aec0;
    font-weight: bold;
    font-size: 2rem;

    & svg {
      margin-right: 0.5rem;
    }
  }
`;

const Table = styled.table`
  margin: auto;
  border-collapse: collapse;

  & tr th:nth-child(1),
  & tr td:nth-child(1) {
    display: none;
  }

  @media (min-width: 24em) {
    & tr th:nth-child(1),
    & tr td:nth-child(1) {
      display: table-cell;
    }
  }

  & > thead {
    color: #63b3ed;
  }

  & th {
    border-bottom: 0.1rem solid #4a5568;
    padding: 0.8rem 1rem;
  }

  & td {
    border-bottom: 0.1rem solid #4a5568;
    border-right: 0.1rem solid #4a5568;
    padding: 0.8rem 1rem;
    color: #a0aec0;

    &:last-child {
      border-right: 0;
    }

    &:first-child,
    &:nth-child(3) {
      text-align: center;
    }
  }

  & tbody {
    & tr {
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background-color: #4a5568;
      }
    }

    & tr:last-child td {
      border-bottom: 0;
    }
  }
`;

export const Leaderboard = ({ history }) => {
  const [murphs, setMurphs] = useState([]);

  useEffect(() => {
    async function fetchMurphs() {
      try {
        const res = await axios.get("/api/murphs");

        setMurphs(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMurphs();
  }, []);

  return (
    <LeaderboardsStyle>
      <Container>
        <h1>
          <FontAwesomeIcon icon={faTrophy} />
          Leaderboard
        </h1>
        <Table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Total Time</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {murphs.map((murph, index) => {
              return (
                <tr
                  key={murph._id}
                  onClick={() => history.push(`/murph/${murph._id}`)}
                >
                  <td>{index + 1}</td>
                  <td>
                    {murph.user.fname} {murph.user.lname}
                  </td>
                  <td>{msToTime(murph.totalTime)}</td>
                  <td>{formatDate(murph.date)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </LeaderboardsStyle>
  );
};
