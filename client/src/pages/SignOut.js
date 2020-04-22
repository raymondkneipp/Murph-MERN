import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Store";

export const SignOut = ({ history }) => {
  const { dispatch, state } = useContext(AuthContext);
  const { isAuthenticated } = state;

  useEffect(() => {
    console.log("yo");
    if (!isAuthenticated) {
      history.push("/signin");
    } else {
      dispatch({
        type: "LOGOUT",
      });
      history.push("/");
    }
  }, [isAuthenticated, history]);

  return <h1>Bye</h1>;
};
