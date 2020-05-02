import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "../components/Container";

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

      &:hover {
        background-color: #4a5568;
      }
    }

    & tr:last-child td {
      border-bottom: 0;
    }
  }
`;

export const Leaderboard = () => {
  const [murphs, setMurphs] = useState([]);

  useEffect(() => {
    async function fetchMurphs() {
      try {
        let res = await fetch("/api/murphs", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });

        let data = await res.json();
        setMurphs(data);
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
                <tr key={murph._id}>
                  <td>{index + 1}</td>
                  <td>
                    {murph.user.fname} {murph.user.lname}
                  </td>
                  <td>
                    {
                      new Date(murph.totalTime * 1000)
                        .toUTCString()
                        .match(/(\d\d:\d\d:\d\d)/)[0]
                    }
                  </td>
                  <td>
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    }).format(new Date(murph.date))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </LeaderboardsStyle>
  );
};
