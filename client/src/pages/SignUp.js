import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Store";
import { Errors } from "../components/Errors";

export const SignUp = ({ history }) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (password !== confirmPassword) {
      setErrors([...errors, { msg: "Passwords do not match" }]);
    } else {
      try {
        let res = await fetch("/api/users", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fname,
            lname,
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
        } else {
          throw data;
        }
      } catch (error) {
        setErrors(error["errors"]);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 mx-2">
      <Errors errors={errors} />
      <h3 className="text-xl font-medium text-gray-100 text-center mb-2">
        Sign Up
      </h3>
      <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="fname" className="text-sm text-gray-500 mt-3">
          First Name
        </label>
        <input
          required
          type="text"
          id="fname"
          name="fname"
          className="bg-gray-100, focus:outline-none focus:shadow-outline border border-gray-500 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
        <label htmlFor="lname" className="text-sm text-gray-500 mt-3">
          Last Name
        </label>
        <input
          required
          type="text"
          id="lname"
          name="lname"
          className="bg-white, focus:outline-none focus:shadow-outline border border-gray-500 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        />
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
        <label htmlFor="confirmPassword" className="text-sm text-gray-500 mt-3">
          Confirm Password
        </label>
        <input
          required
          type="password"
          id="confirmPassword"
          className="bg-white, focus:outline-none focus:shadow-outline border border-gray-500 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-400 shadow rounded-full py-4 px-6 text-lg hover:underline text-gray-900 self-center mt-6"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};
