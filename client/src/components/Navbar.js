import {
  faBars,
  faChartPie,
  faHome,
  faSignInAlt,
  faSignOutAlt,
  faTrophy,
  faUserPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/img/logo.svg";
import AuthContext from "../context/auth/authContext";
import { Container } from "./Container";

const Nav = styled.nav`
  background-color: #1a202c;
  box-shadow: 0 0 0.2rem #090c10;

  & > div {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  & .logo {
    justify-self: flex-start;

    & img {
      height: auto;
      width: 4rem;
    }
  }
`;

const LinksList = styled.div`
  align-items: center;
  display: none;
  flex-direction: column;
  flex-basis: 100%;
  margin-top: 0.5rem;

  @media (min-width: 48em) {
    flex-direction: row;
    justify-content: center;
    flex-basis: auto;
    margin-top: 0;
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
    transition: all 0.2s;
    display: flex;
    align-items: center;
    margin: 0.3rem 0.2rem;
    transition: all 0.2s;
    border-radius: 100rem;

    &:focus {
      outline: 0;
      box-shadow: 0 0 0 0.2rem #63b3ed;
    }

    & svg {
      margin-right: 0.5rem;
    }

    &.active {
      color: white;
    }

    &:hover {
      color: white;
    }

    &.primaryButton {
      border: 0.1rem solid #63b3ed;
      color: #63b3ed;
      border-radius: 5rem;
      padding: 0.4rem 0.6rem;
      transition: all 0.2s;

      &:hover {
        color: #1a202c;
        background-color: #63b3ed;
      }
    }
  }

  & .secondaryButton {
    border: 0.1rem solid #fc8181;
    color: #fc8181;
    border-radius: 5rem;
    padding: 0.4rem 0.6rem;
    font-size: 1rem;
    white-space: nowrap;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    margin: 0.3rem 0.2rem;
    background-color: transparent;
    cursor: pointer;

    &:focus {
      outline: 0;
      box-shadow: 0 0 0 0.2rem #63b3ed;
    }

    &:hover {
      color: #1a202c;
      background-color: #fc8181;
    }
  }
`;

const Greeting = styled.div`
  color: #a0aec0;
  margin-right: 1rem;
  font-style: italic;
  display: flex;
  align-items: center;
  font-size: 1rem;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  transition: all 0.2s;
  border: 0;
  background-color: transparent;
  min-width: 2.5rem;
  height: 2.5rem;
  justify-content: center;
  cursor: pointer;

  & > svg {
    cursor: pointer;
    color: #a0aec0;
    transition: color 0.2s;

    &:hover {
      color: white;
    }
  }

  @media (min-width: 48em) {
    & > svg {
      display: none;
    }
  }
`;

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <Nav>
      <Container>
        <NavLink to="/" className="logo" onClick={() => setOpen(false)}>
          <img src={logo} alt="Murph" />
        </NavLink>

        <Menu onClick={() => setOpen(!open)}>
          {isAuthenticated && user && <Greeting>Welcome {user.fname}</Greeting>}
          <FontAwesomeIcon icon={open ? faTimes : faBars} size="2x" />
        </Menu>

        <LinksList className={open ? "open" : ""}>
          <NavLink to="/" exact onClick={() => setOpen(false)}>
            <FontAwesomeIcon icon={faHome} /> Home
          </NavLink>
          <NavLink to="/leaderboard" onClick={() => setOpen(false)}>
            <FontAwesomeIcon icon={faTrophy} /> Leaderboard
          </NavLink>

          {!isAuthenticated && (
            <>
              <NavLink to="/signin" onClick={() => setOpen(false)}>
                <FontAwesomeIcon icon={faSignInAlt} /> Sign In
              </NavLink>
              <NavLink
                to="/signup"
                className="primaryButton"
                onClick={() => setOpen(false)}
              >
                <FontAwesomeIcon icon={faUserPlus} /> Sign Up
              </NavLink>
            </>
          )}

          {isAuthenticated && (
            <>
              <NavLink to="/profile" onClick={() => setOpen(false)}>
                <FontAwesomeIcon icon={faChartPie} /> Profile
              </NavLink>
              <button
                className="secondaryButton"
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                Sign Out
              </button>
            </>
          )}
        </LinksList>
      </Container>
    </Nav>
  );
};
