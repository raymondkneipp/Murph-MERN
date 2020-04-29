import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import "./assets/main.css";
import * as serviceWorker from "./serviceWorker";
import { Store } from "./Store";

ReactDOM.render(
  <Store>
    <App />
  </Store>,
  document.getElementById("root")
);

serviceWorker.register();
