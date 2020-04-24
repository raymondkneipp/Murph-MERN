import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Store";

export const Profile = ({ history }) => {
  const { state } = useContext(AuthContext);
  const { isAuthenticated } = state;

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/signin");
    }
  }, [isAuthenticated, history]);

  return (
    <div className="flex flex-col items-center justify-center flex-1 mx-2">
      <div className="bg-gray-800 py-4 px-8 mb-6 shadow rounded-lg flex flex-col items-center max-w-xs w-full box-border">
        <h3 className="text-2xl font-medium text-gray-100 max-w-xs text-center mb-2">
          {state.user && state.user.fname}{" "}
          <span className="text-base text-gray-500">
            {state.user && state.user.lname}
          </span>
        </h3>
        <h4 className="text-gray-100 text-center mb-2">
          Joined:{" "}
          <span className="text-gray-500">
            {state.user && new Date(state.user.date).toDateString()}
          </span>
        </h4>
      </div>
    </div>
  );
};
