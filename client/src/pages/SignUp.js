import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "../components/Container";
import { Errors } from "../components/Errors";
import { AuthContext } from "../Store";

const SignUpStyle = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & h1 {
    color: #a0aec0;
    font-weight: bold;
    font-size: 2rem;
    text-align: center;
  }

  & form {
    display: flex;
    flex-direction: column;
    max-width: 24rem;
    width: 100%;

    & label {
      color: #a0aec0;
      margin-bottom: 0.5rem;
    }

    & input {
      border-radius: 0.6rem;
      border: 0;
      padding: 0.8rem 1rem;
      font-size: 1rem;
      margin-bottom: 0.5rem;

      &:focus {
        outline: 0;
      }
    }
  }
`;

const SignUpButton = styled.button`
  margin: 1rem auto;

  color: #63b3ed;
  transition: all 0.2s;
  border: 0.1rem solid #63b3ed;
  border-radius: 5rem;
  padding: 1rem 1.2rem;
  font-size: 1.1rem;
  background-color: #1a202c;
  cursor: pointer;

  &:focus {
    outline: 0;
  }

  &:hover {
    color: #1a202c;
    background-color: #63b3ed;
  }
`;

export const SignUp = ({ history }) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const { dispatch, state } = useContext(AuthContext);
  const { isAuthenticated } = state;

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/profile");
    }
  }, [isAuthenticated, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrors([...errors, { msg: "Passwords do not match" }]);
    } else {
      try {
        let res = await fetch("/api/users", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fname,
            lname,
            email,
            password,
          }),
        });

        let data = await res.json();

        if (res.ok) {
          setErrors([]);
          dispatch({
            type: "LOGIN",
            payload: data,
          });
        } else {
          throw data;
        }
      } catch (error) {
        setErrors(error["errors"]);
      }
    }
  };

  return (
    <SignUpStyle>
      <Container>
        <Errors errors={errors} />
        <h1>
          <FontAwesomeIcon icon={faUserPlus} /> Sign Up
        </h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="fname">First Name</label>
          <input
            required
            type="text"
            id="fname"
            name="fname"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
          <label htmlFor="lname">Last Name</label>
          <input
            required
            type="text"
            id="lname"
            name="lname"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            required
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            required
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <SignUpButton type="submit">
            <FontAwesomeIcon icon={faUserPlus} /> Sign Up
          </SignUpButton>
        </form>
      </Container>
    </SignUpStyle>
  );
};
