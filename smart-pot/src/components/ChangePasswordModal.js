import React, { useState } from "react";
import { changePassword } from "./hooks/api";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const ChangePasswordModal = ({ show, onClose }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [actionType, setActionType] = useState(null);
  const [isReset, setIsReset] = useState(false);

  const handlePasswordChange = async (e) => {
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
      }
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
    }
    onClose();
  };

  if (!show) return null;

  return (
    <div className={`form${show ? " block-interaction" : ""}`}>
      <Modal show={showModal} onClose={closeModal}>
        {modalMessage} {/* Display the modal message */}
      </Modal>
      {/* Reset form */}
      <header>Change Password</header>
      <form onSubmit={handlePasswordChange}>
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
      <input type="button" className="button" onClick={onClose} value="Close" />
    </div>
  );
};

export default ChangePasswordModal;
