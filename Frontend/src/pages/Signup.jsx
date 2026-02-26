import React, {useContext, useState} from "react";
import "../styles/login.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(form.name, form.email, form.password);
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Signup</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="Name"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="Password"
            onChange={handleChange}
          />

          {error && <p>{error}</p>}

          <button>Signup</button>
        </form>
        <p className="txt">
          Already have a account?{" "}
          <span>
            <Link to={"/login"} className="no-underline-link">
              login
            </Link>
          </span>{" "}
        </p>
      </div>
    </div>
  );
}
