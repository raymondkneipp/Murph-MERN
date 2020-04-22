import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { Workout } from "./pages/Workout";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { Profile } from "./pages/Profile";

import { AuthContext } from "./Store";
import { SignOut } from "./pages/SignOut";
import { Leaderboards } from "./pages/Leaderboards";

function App() {
  const { dispatch } = useContext(AuthContext);

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
  }, [dispatch, localStorage.getItem("token")]);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/workout" component={Workout} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/signout" component={SignOut} />
          <Route exact path="/leaderboards" component={Leaderboards} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
