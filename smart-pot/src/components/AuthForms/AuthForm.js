import React, { useEffect, useState } from "react";
import "../../assets/css/Login.css";
import { useAuth } from "../Context/AuthContext";
import Modal from "../Modals/Modal";
import Login from "./Login";
import Register from "./Register";
import ResetPassword from "./ResetPassword";
import { useNavigate } from "react-router-dom";
import {
  setAuthToken,
  login,
  register,
  requestPasswordReset,
} from "../hooks/api";

const AuthForm = ({ initialIsReset = false }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [navigateToApp, setNavigateToApp] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [actionType, setActionType] = useState(null);
  const { user, setUserContext } = useAuth();
  const [isReset, setIsReset] = useState(initialIsReset);

  const navigate = useNavigate();

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
      if (response.status === 200) {
        sessionStorage.setItem("accessToken", response.data.refresh_token);
        sessionStorage.setItem("refreshToken", response.data.refresh_token);
        setAuthToken(response.data.access_token);
        setModalMessage("Successfully Logged In!");
        setActionType("login");
        setShowLoginModal(true);
      }
    } catch (err) {
      setModalMessage("Failed to Logg In!");
      setActionType("failed_login");
      setShowLoginModal(true);
      console.error(err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setActionType("register");
    if (!fullName || !email || !password || !confirmPassword) {
      setActionType("failed_register");
      setModalMessage("Please fill in all the fields!");
      setShowLoginModal(true);
      return;
    }
    if (password !== confirmPassword) {
      setActionType("failed_register");
      setModalMessage("Passwords do not match!");
      setShowLoginModal(true);
      return;
    }
    try {
      const response_register = await register(fullName, email, password); // Modify this line as per your register API method
      setModalMessage(response_register.data.message);

      setShowLoginModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const response = await requestPasswordReset(email);
      if (response.status === 200) {
        setModalMessage("Password Reset Successful!");
        setActionType("reset");
        localStorage.setItem("accessToken", response.data.reset_password_token);
        setShowLoginModal(true);
      }
    } catch (err) {
      setModalMessage("Failed to Reset Password!");
      setActionType("failed_reset");
      setShowLoginModal(true);
      console.error(err);
    }
  };

  const closeModal = () => {
    setShowLoginModal(false);
    if (actionType === "login") {
      setUserContext();
      navigate("/");
    } else if (
      ["failed_login", "failed_reset", "failed_register"].includes(actionType)
    ) {
      setActionType(null);
    } else if (actionType === "register" || actionType === "reset") {
      setIsLogin(true);
      setIsReset(false);
      setActionType(null);
    }
  };

  useEffect(() => {
    if (navigateToApp) {
      navigate("/");
    }
  }, [navigateToApp]);

  return (
    <div>
      <div className="container">
        <Modal show={showLoginModal} onClose={closeModal}>
          {modalMessage} {/* Display the modal message */}
        </Modal>
        <input
          type="checkbox"
          id="check"
          checked={!isLogin}
          onChange={(e) => {
            setIsLogin(!e.target.checked);
            setIsReset(false);
          }}
        />
        <input
          type="checkbox"
          id="check-reset"
          checked={isReset}
          onChange={(e) => {
            setIsReset(e.target.checked);
            setIsLogin(true); // If you want to go to login when going to reset, you can control it here
          }}
        />
        {isLogin && !isReset ? (
          <Login
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        ) : isReset ? (
          <ResetPassword
            email={email}
            setEmail={setEmail}
            handleReset={handleReset}
            setIsLogin={setIsLogin}
            setIsReset={setIsReset}
          />
        ) : (
          <Register
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            fullName={fullName}
            setFullName={setFullName}
            handleRegister={handleRegister}
          />
        )}
      </div>
    </div>
  );
};

export default AuthForm;
