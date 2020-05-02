import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import styled from "styled-components";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Leaderboard } from "./pages/Leaderboard";
import { Murph } from "./pages/Murph";
import { Profile } from "./pages/Profile";
import { SignIn } from "./pages/SignIn";
import { SignOut } from "./pages/SignOut";
import { SignUp } from "./pages/SignUp";
import { Workout } from "./pages/Workout";
import { AuthContext } from "./Store";

const Wrapper = styled.div`
  background-image: linear-gradient(to right, #1a202c, #11151d);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  const { dispatch } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.token) {
        try {
          let res = await fetch("/api/auth", {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": localStorage.getItem("token"),
            },
          });

          let data = await res.json();

          if (res.ok) {
            dispatch({
              type: "LOAD_USER",
              payload: data,
            });
          } else {
            throw data;
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [dispatch, token]);

  return (
    <Wrapper>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/workout" component={Workout} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/signout" component={SignOut} />
          <Route exact path="/leaderboard" component={Leaderboard} />
          <Route exact path="/murph/:id" component={Murph} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    </Wrapper>
  );
}

export default App;
