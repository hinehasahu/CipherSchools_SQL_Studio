import React, { useContext } from "react";
import "../styles/navbar.scss";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">SQL Editor</div>
      </div>

      <div className="navbar-right">
        <button onClick={logout} className={token? "logout-btn" : "login-btn"}>
          {token ? "Logout" : <Link to={"/login"}>Login</Link>}
        </button>
      </div>
    </nav>
  );
}
