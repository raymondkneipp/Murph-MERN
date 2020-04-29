import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "../components/Container";
import { Errors } from "../components/Errors";
import { AuthContext } from "../Store";

const SignInStyle = styled.div`
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

const SignInButton = styled.div`
  margin: 1rem auto;

  & button {
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
  }
`;

export const SignIn = ({ history }) => {
  const [email, setEmail] = useState("raymond.f.kneipp@gmail.com");
  const [password, setPassword] = useState("123456");
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

    try {
      let res = await fetch("/api/auth", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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

        history.push("/profile");
      } else {
        throw data;
      }
    } catch (error) {
      setErrors(error["errors"]);
    }
  };

  return (
    <SignInStyle>
      <Container>
        <Errors errors={errors} />
        <h1>
          <FontAwesomeIcon icon={faSignInAlt} /> Sign In
        </h1>
        <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="email" className="text-sm text-gray-500 mt-3">
            Email
          </label>
          <input
            required
            type="email"
            id="email"
            name="email"
            className="bg-white, focus:outline-none focus:shadow-outline border border-gray-500 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="text-sm text-gray-500 mt-3">
            Password
          </label>
          <input
            required
            type="password"
            id="password"
            name="password"
            className="bg-white, focus:outline-none focus:shadow-outline border border-gray-500 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SignInButton>
            <button
              type="submit"
              className="bg-blue-400 shadow rounded-full py-4 px-6 text-lg hover:underline text-gray-900 self-center mt-6"
            >
              <FontAwesomeIcon icon={faSignInAlt} /> Sign In
            </button>
          </SignInButton>
        </form>
      </Container>
    </SignInStyle>
  );
};
