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
    errors: [],
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
        payload: error.response.data.errors[0],
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
      dispatch({
        type: "AUTH_ERROR",
        payload: error.response.data.errors[0],
      });
    }
  };

  const logout = async () => dispatch({ type: "LOGOUT" });

  const deleteErrorAlert = (index) => {
    dispatch({
      type: "DELETE_ERROR",
      payload: index,
    });
  };

  const setError = (errObj) => {
    dispatch({
      type: "SET_ERROR",
      payload: errObj,
    });
  };

  const clearErrors = () => {
    dispatch({
      type: "CLEAR_ERRORS",
    });
  };

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
        deleteErrorAlert,
        setError,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
