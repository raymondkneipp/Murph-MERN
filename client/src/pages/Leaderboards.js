import React, { useEffect, useState } from "react";

export const Leaderboards = () => {
  const [murphs, setMurphs] = useState([]);

  useEffect(() => {
    async function fetchMurphs() {
      try {
        let res = await fetch("/api/murphs", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });

        let data = await res.json();
        setMurphs(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMurphs();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center flex-1 mx-2">
      <div className="bg-gray-800 py-4 px-8 mb-6 shadow rounded-lg flex flex-col items-center box-border">
        <h3 className="text-xl font-medium text-gray-100 max-w-xs text-center mb-2">
          Leaderboards
        </h3>
        <table className="table-auto">
          <thead>
            <tr>
              <th>User</th>
              <th>Total Time</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {murphs.map((murph) => {
              return (
                <tr key={murph._id}>
                  <td>
                    {murph.user.fname} {murph.user.lname}
                  </td>
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
