import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ShowHint({ question }) {
  const { showHint } = useContext(AuthContext);

  return (
    <>
      <p>{showHint}</p>
    </>
  );
}
