import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { Workout } from "./pages/Workout";

function App() {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/workout" component={Workout} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
