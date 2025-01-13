// src/components/auth/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Retrieve existing users from local storage or an empty array if none exist
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    
    // Check if the username is already taken
    const userExists = existingUsers.some((user) => user.username === username);
    if (userExists) {
      alert("Username is already taken. Please choose another.");
      return;
    }
    
    // Add new user to local storage
    existingUsers.push({ username, password });
    localStorage.setItem("users", JSON.stringify(existingUsers));
    alert("Registration successful!");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <form onSubmit={handleRegister} style={styles.form}>
      <h2>Register</h2>
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
      <button type="submit" style={styles.button}>Register</button>
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
    backgroundColor: "blue",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default Register;
