// src/components/auth/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user exists with matching credentials
    const validUser = existingUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (validUser) {
      // Save "logged in" state
      localStorage.setItem("loggedInUser", JSON.stringify({ username }));
      navigate("/main");
    } else {
      alert("Invalid username or password!");
    }
  };

  return (
    <form onSubmit={handleLogin} style={styles.form}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Login</button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    width: "300px",
  },
  input: {
    padding: "0.5rem",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "green",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default Login;
