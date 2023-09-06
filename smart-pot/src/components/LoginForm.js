import React, { useEffect, useState } from "react";
import "../assets/css/Login.css";
import { useAuth } from "./AuthContext";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { setAuthToken, login, register } from "./hooks/api";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [navigateToApp, setNavigateToApp] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [actionType, setActionType] = useState(null); // New state for modal message

  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFullName("");
  }, [isLogin]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response.access_token) {
        localStorage.setItem("accessToken", response.access_token);
        setAuthToken(response.access_token);
        setUser({ token: response.access_token, email });
        setModalMessage("Successfully Logged In!");
        setActionType("login");
        setShowModal(true);
      }
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
      const response_register = await register(fullName, email, password); // Modify this line as per your register API method
      setModalMessage(response_register.message);
      setActionType("register");
      setShowModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (actionType === "login") {
      setNavigateToApp(true);
    } else if (actionType === "register") {
      setIsLogin(true);
      setActionType(null);
    }
  };

  useEffect(() => {
    if (navigateToApp) {
      navigate("/");
    }
  }, [navigateToApp]);

  return (
    <div className="container">
      <Modal show={showModal} onClose={closeModal}>
        {modalMessage} {/* Render the modal message */}
      </Modal>
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
