import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import App from "./App";
import { AuthState } from "./context/auth/AuthState";
import * as serviceWorker from "./serviceWorker";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
        'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
        'Noto Color Emoji';
      background-color: #1a202c;
      touch-action: manipulation;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #4a5568;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #a0aec0;
  }
`;

ReactDOM.render(
  <AuthState>
    <GlobalStyle />
    <App />
  </AuthState>,
  document.getElementById("root")
);

serviceWorker.register();
