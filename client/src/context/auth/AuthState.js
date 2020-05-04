import axios from "axios";
import React, { useReducer } from "react";
import setAuthToken from "../../util/setAuthToken";
import AuthContext from "./authContext";
import authReducer from "./authReducer";

export const AuthState = ({ children }) => {
  const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const loadUser = async () => {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get("/api/auth");

      dispatch({
        type: "USER_LOADED",
        payload: res.data,
      });
    } catch (error) {
      dispatch({ type: "AUTH_ERROR" });
    }
  };

  const login = async (user) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/auth", user, config);

      dispatch({
        type: "LOGIN",
        payload: res.data,
      });

      loadUser();
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
        payload: error.response.data.errors[0].msg,
      });
    }
  };

  const register = async (newUser) => {
    try {
      const res = await axios.post("/api/users", newUser);

      dispatch({
        type: "LOGIN",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
      // Dispatch error
    }
  };

  const logout = async () => dispatch({ type: "LOGOUT" });

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
        errors: state.errors,
        loadUser,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
