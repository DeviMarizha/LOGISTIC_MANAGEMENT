import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/authActions";
import axios from "axios";
import './Login.css';

function Login({ setValues, values, error }) {
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    const username = event.target.value;
    setValues({ ...values, username });
    if (!username) {
      setUsernameError("*Username is required*");
    } else {
      setUsernameError("");
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
          "http://localhost:8080/api/auth/login",
          values
        );
        alert(response.data);
        dispatch(loginSuccess(values));
        navigate("/order");
      } catch (error) {
        console.error(error);
        setLoginError("Invalid username or password");
      }
    }
  };

  return (
    <div id="login-box">
      <form onSubmit={handleFormSubmit}>
        <h2 id="loginTitle">Login</h2>
        {error || loginError ? (
          <div id="error" className="bg-red-100 border mb-4 border-red-400 text-red-700 px-4 py-3 rounded">
            <strong id="errorTitle">Error: </strong>
            <span>{error || loginError}</span>
          </div>
        ) : null}
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
            type="password"
            id="password"
            onChange={handlePasswordChange}
            value={values.password}
          />
          <label>Password</label>
          {passwordError && <div className="error">{passwordError}</div>}
        </div>
        <button type="submit" id="loginBtn">Login</button>
        <p>Don't have an account?</p>
        <a href="/signup">Sign up here</a>
      </form>
    </div>
  );
}

export default Login;
