import React, { useContext, useEffect, useState } from "react";
import "../styles/dashboard.scss";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { API } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  const [filterData, setFilterData] = useState("");

  const data = [...assignments];

  const filteredData = data.filter(
    (item) => filterData === "" || item.difficulty === filterData,
  );

  const handleAttempt = (id) => {
    navigate(`/assignmentDetails/${id}`);
  };

  useEffect(() => {
    fetch(`${API}/assignments/get`)
      .then((data) => data.json())
      .then((res) => setAssignments(res.allAssignments));
  }, []);

  console.log(assignments);
  return (
    <>
      <Navbar />
      <section className="assignments-container">
        <div className="assignment-header">
          <input type="text" placeholder="search..." />

          <select
            value={filterData}
            onChange={(e) => setFilterData(e.target.value)}>
            <option value="">All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="assignment-list">
          {assignments &&
            filteredData.map((a) => (
              <div className="assignment-card" key={a._id}>
                <h3 className="assignment-title">{a.title}</h3>

                <p
                  className={
                    a.difficulty === "easy"
                      ? "tag easy"
                      : a.difficulty === "medium"
                        ? "tag medium"
                        : "tag hard"
                  }>
                  {a.difficulty}
                </p>

                <button
                  className="attempt-btn"
                  onClick={() => handleAttempt(a._id)}>
                  Attempt
                </button>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
