import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/img/logo.svg";
import menu from "../assets/img/menu.svg";
import { AuthContext } from "../Store";
import { Container } from "./Container";

const Nav = styled.nav`
  background-color: #1a202c;
  box-shadow: 0 0 0.2rem #090c10;

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  & .logo {
    & img {
      width: 100%;
      height: auto;
      max-width: 4rem;
    }
  }
`;

const LinksList = styled.div`
  align-items: center;
  display: none;
  flex-direction: column;
  flex-basis: 100%;

  @media (min-width: 48em) {
    flex-direction: row;
    justify-content: center;
    flex-basis: auto;
  }

  @media (min-width: 48em) {
    display: flex;
  }

  &.open {
    display: flex;
  }

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
  border-right: 0.1rem solid #4a5568;
  display: flex;
  align-items: center;

  @media (min-width: 48em) {
    border-right: 0;
  }
`;

const Menu = styled.div`
  display: block;
  display: flex;

  & > img {
    cursor: pointer;
    padding: 0.5rem;
  }

  @media (min-width: 48em) {
    & > img {
      display: none;
    }
  }
`;

export const Navbar = () => {
  const { state } = useContext(AuthContext);
  const { isAuthenticated, user } = state;
  const [open, setOpen] = useState(false);

  return (
    <Nav>
      <Container>
        <NavLink to="/" className="logo">
          <img src={logo} alt="Murph" />
        </NavLink>

        <Menu>
          {isAuthenticated && user ? (
            <Greeting>Welcome {user.fname}</Greeting>
          ) : (
            <Greeting>Welcome Guest</Greeting>
          )}
          <img src={menu} alt="Menu" onClick={() => setOpen(!open)} />
        </Menu>

        <LinksList className={open ? "open" : ""}>
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
