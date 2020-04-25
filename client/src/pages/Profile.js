import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Store";

export const Profile = ({ history }) => {
  const { state } = useContext(AuthContext);
  const { isAuthenticated } = state;
  const [usersMurphs, setUsersMurphs] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/signin");
    }

    async function getUsersMurphs() {
      try {
        if (state.user) {
          let res = await fetch(`/api/murphs/${state.user._id}`, {
            method: "get",
            headers: {
              "Content-Type": "application/json",
            },
          });

          let data = await res.json();

          if (res.ok) {
            setUsersMurphs(data);
          } else {
            throw data;
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUsersMurphs();
  }, [isAuthenticated, history]);

  return (
    <div className="flex flex-col items-center justify-center flex-1 mx-2">
      <div className="bg-gray-800 py-4 px-8 mb-6 shadow rounded-lg flex flex-col items-center box-border">
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

        <table className="table-auto">
          <thead>
            <tr>
              <th>1st Mile Time</th>
              <th>Calisthenics Time</th>
              <th>2nd Time</th>
              <th>Total Time</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {usersMurphs.map((murph) => {
              return (
                <tr key={murph._id}>
                  <td>{murph.mileOneTime}</td>
                  <td>{murph.calisthenicsTime}</td>
                  <td>{murph.mileTwoTime}</td>
                  <td>{murph.totalTime}</td>
                  <td>
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    }).format(new Date(murph.date))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
