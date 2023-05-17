import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/Login.css";
import urlData from "../assets/url.json";

const querystring = require("querystring");

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");

  const URL = urlData.url;

  // Clear input fields when switching between forms
  useEffect(() => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFullName("");
  }, [isLogin]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        URL + "/api/v1/token",
        querystring.stringify({
          username: email,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "WWW-Authenticate": "Bearer",
          },
        }
      );
      console.log(response.data.access_token);
      localStorage.setItem("accessToken", response.data.access_token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const response_register = await axios.post(URL + "/api/v1/registration", {
        full_name: fullName,
        email: email,
        password: password,
        is_active: true,
      });

      // redirect to login page
      console.log(response_register.data.message);
    } catch (err) {
      console.error(err);
      // display error message
    }
  };

  return (
    <div className="container">
      <input
        type="checkbox"
        id="check"
        checked={!isLogin}
        onChange={() => setIsLogin(!isLogin)}
      />
      {isLogin ? (
        <div className="form">
          {/* Login form */}
          <header>Login</header>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" className="button" value="Login" />
          </form>
          <div className="signup">
            <span className="signup">
              Don't have an account?
              <label htmlFor="check"> Signup</label>
            </span>
          </div>
        </div>
      ) : (
        <div className="form">
          {/* Register form */}
          <header>Signup</header>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input type="submit" className="button" value="Signup" />
          </form>
          <div className="signup">
            <span className="signup">
              Already have an account?
              <label htmlFor="check"> Login</label>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
