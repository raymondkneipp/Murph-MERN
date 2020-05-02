import { faCalendarAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "../components/Container";
import { AuthContext } from "../Store";

const ProfileStyles = styled.div`
  display: flex;
  flex: 1;

  & > div {
    display: grid;
    grid-template-columns: 1fr 3fr;
  }

  & h1 {
    text-align: center;
    color: #a0aec0;
    font-weight: bold;
    font-size: 2rem;
  }
`;

const User = styled.div`
  background-color: #2d3748;
  padding: 0.8rem 1rem;
  border-radius: 0.6rem;
  display: flex;
  align-items: center;
  flex-direction: column;

  & svg {
    margin: 1rem 0;
  }

  & h3 {
    color: #fff;
    font-size: 1.7rem;
    text-align: center;
    font-weight: normal;
    margin: 0;

    & span {
      color: #a0aec0;
      font-weight: normal;
      font-size: 1.4rem;
    }
  }

  & h4 {
    color: #a0aec0;
    font-size: 1rem;
    text-align: center;
    font-weight: normal;
    margin: 0;
    display: flex;
    align-items: center;

    & svg {
      margin-right: 0.5rem;
    }
  }
`;

const Backdrop = styled.div`
  margin: 1rem 0;
  background-color: #a0aec0;
  border-radius: 100%;
  padding: 3rem;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
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
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4) {
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

export const Profile = ({ history }) => {
  const { state } = useContext(AuthContext);
  const { isAuthenticated } = state;
  const [usersMurphs, setUsersMurphs] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/signin");
    }

    async function getUsersMurphs() {
      try {
        if (state.user) {
          let res = await fetch(`/api/murphs/${state.user._id}`, {
            method: "get",
            headers: {
              "Content-Type": "application/json",
            },
          });

          let data = await res.json();

          if (res.ok) {
            setUsersMurphs(data);
          } else {
            throw data;
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUsersMurphs();
  }, [isAuthenticated, history, state.user]);

  return (
    <ProfileStyles>
      <Container>
        <User>
          <Backdrop>
            <FontAwesomeIcon icon={faUser} size="6x" color="#4a5568" />
          </Backdrop>
          <h3>
            {state.user && state.user.fname}{" "}
            <span>{state.user && state.user.lname}</span>
          </h3>
          <h4>
            <FontAwesomeIcon icon={faCalendarAlt} color="#a0aec0" />{" "}
            {state.user && new Date(state.user.date).toDateString()}
          </h4>
        </User>

        <div>
          <h1>My Murphs</h1>
          <Table>
            <thead>
              <tr>
                <th>1st Mile Time</th>
                <th>Calisthenics Time</th>
                <th>2nd Time</th>
                <th>Total Time</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {usersMurphs.map((murph) => {
                return (
                  <tr key={murph._id}>
                    <td>{murph.mileOneTime}</td>
                    <td>{murph.calisthenicsTime}</td>
                    <td>{murph.mileTwoTime}</td>
                    <td>{murph.totalTime}</td>
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
        </div>
      </Container>
    </ProfileStyles>
  );
};
