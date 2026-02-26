import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showHint, setShowHint] = useState("");

  const API = "http://localhost:3000/api";

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    console.log("JSON.parse: ", storedUser);

    const storedToken = localStorage.getItem("token");

    if (storedToken && storedUser) {
      setUser(storedUser);
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await fetch(`${API}/users/login`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    setUser(data.data);

    setToken(data.data.token);

    localStorage.setItem("user", JSON.stringify(data.data));

    localStorage.setItem("token", data.data.token);
  };

  const signup = async (name, email, password) => {
    const res = await fetch(`${API}/users/signup`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const handleshowHint = (question) => {
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
  };
console.log("Hint",showHint)
  token ? console.log("Token available") : console.log("No token");

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        API,
        login,
        signup,
        logout,
        handleshowHint,
        showHint,
        loading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
