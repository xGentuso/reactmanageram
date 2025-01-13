// src/pages/RegisterPage.jsx
import React from "react";
import Register from "../components/auth/Register";

const RegisterPage = () => {
  return (
    <div style={styles.pageContainer}>
      <Register />
    </div>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
};

export default RegisterPage;
