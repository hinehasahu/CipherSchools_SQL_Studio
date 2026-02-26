import React, { useContext, useEffect, useState } from "react";
import "../styles/assignmentDetails.scss";
import Editor from "@monaco-editor/react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ShowHint from "../components/ShowHint";

export default function AssignmentDetails() {
  const { id } = useParams();
  const { API, token, handleshowHint, showHint, loading } =
    useContext(AuthContext);

  const [attemptAssignment, setAttemptAssignment] = useState([]);
  const [result, setResult] = useState([]);
  const [inputQuery, setInputQuery] = useState("");

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
      body: JSON.stringify({ query: inputQuery }),
    })
      .then((res) => res.json())
      .then((data) => setResult(data.result));
  };

  console.log("Attempt Assignment: ", attemptAssignment);
  console.log("result: ", result);
  console.log("Input Query: ", inputQuery);

  return (
    <div className="assignment-details">
      <Link to={"/"}>
        <h6>Go back to assignment list</h6>
      </Link>

      <div className="details-layout">
        <div className="details-left">
          <h4>{attemptAssignment.title}</h4>

          <p>{attemptAssignment.description}</p>

          <p>Tables: {attemptAssignment.tables?.join(", ")}</p>

          <p>Sample data:</p>

          {attemptAssignment.sampleData &&
            attemptAssignment.sampleData.map((table, index) => (
              <div key={index}>
                <h5>{table.tableName}</h5>

                <table>
                  <thead>
                    <tr>
                      {table.columns.map((col, i) => (
                        <th key={i}>{col.name}</th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {table.rows.map((row, i) => (
                      <tr key={i}>
                        {table.columns.map((col, j) => (
                          <td key={j}>{row[col.name]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}

          <button
            className="hint-btn"
            onClick={() => handleshowHint(attemptAssignment.description)}>
            Show Hint
          </button>

          <div className="hint-box">
            Hint content here.
            {showHint}
          </div>
        </div>

        <div className="details-right">
          <Editor
            height="60vh"
            defaultLanguage="SQL"
            defaultValue="// Write your SQL query here..."
            onChange={(value) => setInputQuery(value)}
          />

          <button className="execute-btn" onClick={getResult}>
            Execute
          </button>

          <div className="result-box">
            {/* No result */}
            {!result || result.length === 0 ? (
              <p>No result</p>
            ) : typeof result === "object" ? (
              <table border="1">
                <thead>
                  <tr>
                    {Object.keys(result[0]).map((column) => (
                      <th key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {result.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, i) => (
                        <td key={i}>
                          {value !== null ? value.toString() : "NULL"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>{result}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
