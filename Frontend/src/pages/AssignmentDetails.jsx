import React, { useContext, useEffect, useState } from "react";
import "../styles/assignmentDetails.scss";
import Editor from "@monaco-editor/react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ShowHint from "../components/ShowHint";

export default function AssignmentDetails() {
  const { id } = useParams();
  const { API, token } = useContext(AuthContext);

  const [attemptAssignment, setAttemptAssignment] = useState([]);
  const [result, setResult] = useState([]);
  const [inputQuery, setInputQuery] = useState("")

  console.log("IdInside:", id);

  useEffect(() => {
    fetch(`${API}/assignments/get/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((res) => setAttemptAssignment(res.assignment));
  }, []);

  const getResult = () => {
    if (!inputQuery) {
    alert("Write query first");
    return;
  }
    fetch(`${API}/question/execute/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({query: inputQuery})
    })
      .then((res) => res.json())
      .then((data) => setResult(data.result));
  };

  console.log("Attempt Assignment: ", attemptAssignment);
  console.log("result: ", result);
  console.log("Input Query: ", inputQuery)

  return (
    <div className="assignment-details">
      <Link to={"/"}>
        <h6>Go back to assignment list</h6>
      </Link>
      <div className="details-layout">
        <div className="details-left">
          <h4>{attemptAssignment.title}</h4>

          <p>{attemptAssignment.description}</p>

          <p>Tables: {attemptAssignment.tables}</p>

          <p>Sample data:</p>
          <table>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Salary</th>
            </tr>
            {attemptAssignment.sampleData &&
              attemptAssignment.sampleData.map((i) => (
                <tr>
                  <td>{i.name}</td>
                  <td>{i.department}</td>
                  <td>{i.salary}</td>
                </tr>
              ))}
          </table>

          <button className="hint-btn">Show Hint</button>

          <div className="hint-box">
            Hint content here
            <ShowHint question={attemptAssignment.description} />
          </div>
        </div>

        <div className="details-right">
          <Editor
            height="60vh"
            defaultLanguage="SQL"
            defaultValue="// Write your SQL query here..."
            onChange={(value)=> setInputQuery(value)}
          />

          <button className="execute-btn" onClick={getResult}>
            Execute
          </button>

          <div className="result-box">Result here </div>
        </div>
      </div>
    </div>
  );
}
