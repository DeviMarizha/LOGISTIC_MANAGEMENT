import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../login/Login.css';


function Signup({ setValues, values, error }) {
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleUsernameChange = (event) => {
    const username = event.target.value;
    setValues({ ...values, username });
    if (!username) {
      setUsernameError("*Username is required*");
    } else {
      setUsernameError("");
    }
  };

  const handleEmailChange = (event) => {
    const email = event.target.value;
    setValues({ ...values, email });
    if (!validateEmail(email)) {
      setEmailError("*Invalid email format*");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    setValues({ ...values, password });
    if (password.length < 6) {
      setPasswordError("*Password must be at least 6 characters long*");
    } else {
      setPasswordError("");
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let isValid = true;

    if (!values.username) {
      setUsernameError("*Username is required*");
      isValid = false;
    }

    if (!values.email) {
      setEmailError("*Email is required*");
      isValid = false;
    } else if (!validateEmail(values.email)) {
      setEmailError("*Invalid email format*");
      isValid = false;
    }

    if (!values.password) {
      setPasswordError("*Password is required*");
      isValid = false;
    } else if (values.password.length < 6) {
      setPasswordError("*Password must be at least 6 characters long*");
      isValid = false;
    }

    if (isValid) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/register",
          values
        );
        alert(response.data);
        navigate("/login");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div id="login-box">
      <form onSubmit={handleFormSubmit}>
        <h2 id="loginTitle">SignUp</h2>
        {error && (
          <div id="error" className="bg-red-100 border mb-4 border-red-400 text-red-700 px-4 py-3 rounded">
            <strong id="errorTitle">Error: </strong>
            <span>{error}</span>
          </div>
        )}
        <div id="user-box" className="user-box">
          <input
            type="text"
            id="username"
            onChange={handleUsernameChange}
            value={values.username}
          />
          <label>Username</label>
          {usernameError && <div className="error">{usernameError}</div>}
        </div>
        <div id="user-box" className="user-box">
          <input
            type="text"
            id="email"
            onChange={handleEmailChange}
            value={values.email}
          />
          <label>Email</label>
          {emailError && <div className="error">{emailError}</div>}
        </div>
        <div id="user-box" className="user-box">
          <input
            type="password"
            id="password"
            onChange={handlePasswordChange}
            value={values.password}
          />
          <label>Password</label>
          {passwordError && <div className="error">{passwordError}</div>}
        </div>
        <button type="submit" id="loginBtn">SignUp</button>
        <p>Already have an account?</p>
        <a href="/login">Log in here</a>
      </form>
    </div>
  );
}

export default Signup;
