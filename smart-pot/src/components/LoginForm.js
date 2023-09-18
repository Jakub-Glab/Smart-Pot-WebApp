import React, { useEffect, useState } from "react";
import "../assets/css/Login.css";
import { useAuth } from "./AuthContext";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import {
  setAuthToken,
  login,
  register,
  requestPasswordReset,
} from "./hooks/api";

const LoginForm = ({ initialIsReset = false }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [navigateToApp, setNavigateToApp] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
        setShowModal(true);
      }
    } catch (err) {
      setModalMessage("Failed to Logg In!");
      setActionType("failed_login");
      setShowModal(true);
      console.error(err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setActionType("register");
    if (!fullName || !email || !password || !confirmPassword) {
      setActionType("failed_register");
      setModalMessage("Please fill in all the fields!");
      setShowModal(true);
      return;
    }
    if (password !== confirmPassword) {
      setActionType("failed_register");
      setModalMessage("Passwords do not match!");
      setShowModal(true);
      return;
    }
    try {
      const response_register = await register(fullName, email, password); // Modify this line as per your register API method
      setModalMessage(response_register.data.message);

      setShowModal(true);
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
        localStorage.setItem("accessToken", response);
        setShowModal(true);
      }
    } catch (err) {
      setModalMessage("Failed to Reset Password!");
      setActionType("failed_reset");
      setShowModal(true);
      console.error(err);
    }
  };

  const closeModal = () => {
    setShowModal(false);
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
        <Modal show={showModal} onClose={closeModal}>
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
                Forget password?
                <label htmlFor="check-reset"> Reset password</label>
              </span>
            </div>
            <div className="signup">
              <span className="signup">
                Dont have an account?
                <label htmlFor="check"> Signup</label>
              </span>
            </div>
          </div>
        ) : isReset ? (
          <div className="form">
            {/* Reset form */}
            <header>Password Reset</header>
            <form onSubmit={handleReset}>
              <input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="submit"
                className="button"
                value="Request reset Password"
              />
            </form>
            <div className="signup">
              <span className="signup">
                Back to login?
                <span
                  className="link"
                  onClick={() => {
                    setIsLogin(true);
                    setIsReset(false);
                  }}
                >
                  {" "}
                  Login
                </span>
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
    </div>
  );
};

export default LoginForm;
