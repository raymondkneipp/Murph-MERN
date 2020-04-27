import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Store";
import logo from "../assets/img/logo.svg";
import { Container } from "./Container";

const Nav = styled.nav`
  background-color: #1a202c;
  box-shadow: 0 0 0.2rem #090c10;

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  & .logo {
    & img {
      width: 100%;
      height: auto;
      max-width: 5rem;
    }
  }
`;

const LinksList = styled.div`
  display: flex;
  align-items: center;

  & a {
    color: #a0aec0;
    text-decoration: none;
    white-space: nowrap;
    padding: 0.5rem;

    &.active {
      color: white;
    }

    &:hover {
      text-decoration: underline;
    }

    &.primaryButton {
      border: 0.1rem solid #63b3ed;
      color: #63b3ed;
      border-radius: 5rem;
      padding: 0.4rem 0.6rem;
    }

    &.secondaryButton {
      border: 0.1rem solid #fc8181;
      color: #fc8181;
      border-radius: 5rem;
      padding: 0.4rem 0.6rem;
    }
  }
`;

const Greeting = styled.div`
  color: #4a5568;
  padding-right: 1rem;
  margin-right: 0.5rem;
  font-style: italic;
  border-right: 1px solid #4a5568;
`;

export const Navbar = () => {
  const { state } = useContext(AuthContext);
  const { isAuthenticated, user } = state;

  return (
    <Nav>
      <Container>
        <NavLink to="/" className="logo">
          <img src={logo} alt="Murph" />
        </NavLink>

        <LinksList>
          {isAuthenticated && user && (
            <Greeting>
              Welcome {user.fname} {user.lname}
            </Greeting>
          )}
          <NavLink to="/" exact>
            Home
          </NavLink>
          <NavLink to="/leaderboards">Leaderboards</NavLink>

          {!isAuthenticated && (
            <>
              <NavLink to="/signin">Sign In</NavLink>
              <NavLink to="/signup" className="primaryButton">
                Sign Up
              </NavLink>
            </>
          )}

          {isAuthenticated && (
            <>
              <NavLink to="/profile">Profile</NavLink>
              <NavLink className="secondaryButton" to="/signout">
                Sign Out
              </NavLink>
            </>
          )}
        </LinksList>
      </Container>
    </Nav>
  );
};
