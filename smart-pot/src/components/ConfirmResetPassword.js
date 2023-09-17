import React, { useState } from "react";
import "../assets/css/Login.css";
import Modal from "./Modal";

const ConfirmResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setModalMessage("Not implemented yet!");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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
