import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="flex flex-col items-center justify-between bg-gray-900 shadow p-2">
      <Link to="/" className="text-6xl font-black text-blue-400 p-2 brand">
        Murph
      </Link>
      {/* <div className="pb-2">
        <Link className="p-2 m-2 hover:underline text-gray-500" to="/">
          Leaderboards
        </Link>
        <Link className="p-2 m-2 hover:underline text-gray-500" to="/">
          Sign In
        </Link>
        <Link
          className="p-2 m-2 hover:underline text-blue-400 border border-blue-400 rounded-full"
          to="/"
        >
          Sign Up
        </Link>
      </div> */}
    </nav>
  );
};
