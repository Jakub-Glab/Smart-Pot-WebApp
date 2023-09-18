import React, { useState } from "react";
import "../assets/css/Login.css";
import Modal from "./Modal";
import { changePassword } from "./hooks/api";
import { useNavigate } from "react-router-dom"; // Import useHistory

const ConfirmResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [actionType, setActionType] = useState(null);
  const [isReset, setIsReset] = useState(false);

  const navigate = useNavigate(); // Use the hook

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setModalMessage("Passwords do not match!");
      setActionType("failed_reset");
      setShowModal(true);
      return;
    }

    try {
      console.log("Password: ", password);
      const response = await changePassword(password);
      if (response.status === 200) {
        setModalMessage("Password change Successful!");
        setActionType("change_password");
        setShowModal(true);
        localStorage.removeItem("accessToken");
      }
      setModalMessage("Password change Successful!");
      setActionType("change_password");
      setShowModal(true);
      localStorage.removeItem("accessToken");
    } catch (err) {
      setModalMessage("Failed to change Password!");
      setActionType("failed_change_password");
      setShowModal(true);
      console.error(err);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (actionType === "failed_change_password") {
      setActionType(null);
    } else if (actionType === "change_password") {
      setIsReset(false);
      setActionType(null);
      setTimeout(() => {
        navigate("/login");
      }, 600);
    }
  };

  return (
    <div>
      <div className="container">
        <Modal show={showModal} onClose={closeModal}>
          {modalMessage} {/* Display the modal message */}
        </Modal>
        <div className="form">
          {/* Reset form */}
          <header>Password Reset</header>
          <form onSubmit={handleReset}>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input type="submit" className="button" value="Reset Password" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmResetPassword;
