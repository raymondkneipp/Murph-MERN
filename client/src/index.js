import React from "react";
import ReactDOM from "react-dom";
import "./assets/main.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Store } from "./Store";

ReactDOM.render(
  <Store>
    <App />
  </Store>,
  document.getElementById("root")
);

serviceWorker.register();
