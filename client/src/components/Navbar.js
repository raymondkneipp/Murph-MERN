import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Store";

export const Navbar = () => {
  const { state } = useContext(AuthContext);
  const { isAuthenticated } = state;

  return (
    <nav className="flex flex-col items-center justify-between bg-gray-900 shadow p-2">
      <Link to="/" className="text-6xl font-black text-blue-400 p-2 brand">
        Murph
      </Link>
      <div className="pb-3">
        <Link className="p-2 m-2 hover:underline text-gray-500" to="/">
          Home
        </Link>
        <Link
          className="p-2 m-2 hover:underline text-gray-500"
          to="/leaderboards"
        >
          Leaderboards
        </Link>
      </div>

      {!isAuthenticated && (
        <div className="pb-2">
          <Link
            className="p-2 m-2 hover:underline text-gray-500 whitespace-no-wrap"
            to="/signin"
          >
            Sign In
          </Link>
          <Link
            className="p-2 m-2 hover:underline text-blue-400 border border-blue-400 rounded-full whitespace-no-wrap"
            to="/signup"
          >
            Sign Up
          </Link>
        </div>
      )}

      {isAuthenticated && (
        <div className="pb-2">
          <Link className="p-2 m-2 hover:underline text-gray-500" to="/profile">
            Profile
          </Link>
          <Link
            className="p-2 m-2 hover:underline text-red-400 border border-red-400 rounded-full whitespace-no-wrap"
            to="/signout"
          >
            Sign Out
          </Link>
        </div>
      )}
    </nav>
  );
};
