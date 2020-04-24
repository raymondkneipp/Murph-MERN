import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Store";
import { Errors } from "../components/Errors";

export const SignIn = ({ history }) => {
  const [email, setEmail] = useState("ray@kay.com");
  const [password, setPassword] = useState("123456");
  const [errors, setErrors] = useState([]);

  const { dispatch, state } = useContext(AuthContext);
  const { isAuthenticated } = state;

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/profile");
    }
  }, [isAuthenticated, history]);

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
      <Errors errors={errors} />
      <h3 className="text-xl font-medium text-gray-100 text-center mb-2">
        Sign In
      </h3>
      <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="email" className="text-sm text-gray-500 mt-3">
          Email
        </label>
        <input
          required
          type="email"
          id="email"
          name="email"
          className="bg-white, focus:outline-none focus:shadow-outline border border-gray-500 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className="text-sm text-gray-500 mt-3">
          Password
        </label>
        <input
          required
          type="password"
          id="password"
          name="password"
          className="bg-white, focus:outline-none focus:shadow-outline border border-gray-500 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-400 shadow rounded-full py-4 px-6 text-lg hover:underline text-gray-900 self-center mt-6"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};
