import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ShowHint({ question }) {
  const { API, token } = useContext(AuthContext);
  const [showHint, setShowHint] = useState("");

  useEffect(() => {
    fetch(`${API}/gethint/hint`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ question }),
    })
      .then((data) => data.json())
      .then((res) => setShowHint(res.hint));
  }, [question]);

  return (
    <>
      <p>{showHint}</p>
    </>
  );
}
