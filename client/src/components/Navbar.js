import {
  faBars,
  faChartPie,
  faHome,
  faSignInAlt,
  faSignOutAlt,
  faTrophy,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/img/logo.svg";
import { AuthContext } from "../Store";
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
      width: 100%;
      height: auto;
      max-width: 4rem;
    }
  }
`;

const LinksList = styled.div`
  align-items: flex-start;
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

    & svg {
      margin-right: 0.2rem;
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

    &.secondaryButton {
      border: 0.1rem solid #fc8181;
      color: #fc8181;
      border-radius: 5rem;
      padding: 0.4rem 0.6rem;

      &:hover {
        color: #1a202c;
        background-color: #fc8181;
      }
    }
  }
`;

const Greeting = styled.div`
  color: #4a5568;
  margin-right: 1rem;
  font-style: italic;
  display: flex;
  align-items: center;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;

  & > svg {
    cursor: pointer;
    color: #a0aec0;
  }

  @media (min-width: 48em) {
    & > svg {
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
        <NavLink to="/" className="logo" onClick={() => setOpen(false)}>
          <img src={logo} alt="Murph" />
        </NavLink>

        <Menu>
          {isAuthenticated && user && <Greeting>Welcome {user.fname}</Greeting>}
          <FontAwesomeIcon
            icon={faBars}
            onClick={() => setOpen(!open)}
            size="lg"
          />
        </Menu>

        <LinksList className={open ? "open" : ""}>
          <NavLink to="/" exact onClick={() => setOpen(false)}>
            <FontAwesomeIcon icon={faHome} /> Home
          </NavLink>
          <NavLink to="/leaderboards" onClick={() => setOpen(false)}>
            <FontAwesomeIcon icon={faTrophy} /> Leaderboards
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
              <NavLink
                className="secondaryButton"
                to="/signout"
                onClick={() => setOpen(false)}
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                Sign Out
              </NavLink>
            </>
          )}
        </LinksList>
      </Container>
    </Nav>
  );
};
