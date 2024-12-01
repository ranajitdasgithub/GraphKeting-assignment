import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault(); // Prevent the default form submission
    let payload = {
      name,
      email,
      password,
    };
    axios
      .post("http://localhost:4000/user/signup", payload)
      .then((response) => {
        console.log(response);
        alert("Signup successful");
        navigate("/login");
      })
      .catch((error) => {
        // Handle error (e.g., show an error message)
        console.error("Signup failed:", error);
      });
  }

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter Name"
          required
        />
        <label>Email:</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter email"
          required
        />
        <label>Password:</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter password"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
