import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Store";
import { Errors } from "../components/Errors";

export const Leaderboards = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const { dispatch, state } = useContext(AuthContext);
  const { isAuthenticated } = state;

  useEffect(() => {}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await fetch("/api/auth", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      let data = await res.json();

      if (res.ok) {
        setErrors([]);
        dispatch({
          type: "LOGIN",
          payload: data,
        });

        history.push("/profile");
      } else {
        throw data;
      }
    } catch (error) {
      setErrors(error["errors"]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 mx-2">
      <div className="bg-gray-800 py-4 px-8 mb-6 shadow rounded-lg flex flex-col items-center max-w-xs w-full box-border">
        <h3 className="text-xl font-medium text-gray-100 max-w-xs text-center mb-2">
          Leaderboards
        </h3>
        <h6>No Scores</h6>
      </div>
    </div>
  );
};
