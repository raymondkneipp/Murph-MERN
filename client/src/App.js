import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import styled from "styled-components";
import { Navbar } from "./components/Navbar";
import AuthContext from "./context/auth/authContext";
import { Home } from "./pages/Home";
import { Leaderboard } from "./pages/Leaderboard";
import { Murph } from "./pages/Murph";
import { Profile } from "./pages/Profile";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Workout } from "./pages/Workout";
import { Errors } from "./components/Errors";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  const { loadUser } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <Router>
        <Navbar />
        <Errors />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/workout" component={Workout} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/leaderboard" component={Leaderboard} />
          <Route exact path="/murph/:id" component={Murph} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    </Wrapper>
  );
}

export default App;
