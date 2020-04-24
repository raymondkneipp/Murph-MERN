import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Store";

export const SignOut = ({ history }) => {
  const { dispatch, state } = useContext(AuthContext);
  const { isAuthenticated } = state;

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/signin");
    } else {
      dispatch({
        type: "LOGOUT",
      });
      history.push("/");
    }
  }, [isAuthenticated, history, dispatch]);

  return <h1>Bye</h1>;
};
