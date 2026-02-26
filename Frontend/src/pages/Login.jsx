import React, {useContext, useState} from "react";
import "../styles/login.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.log(error)
    }
  };
  console.log(form);
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
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

          <button>Login</button>
        </form>
        <p className="txt">
          Create a new account{" "}
          <span>
            <Link to={"/signup"} className="no-underline-link">
              signup
            </Link>
          </span>{" "}
        </p>
      </div>
    </div>
  );
}
