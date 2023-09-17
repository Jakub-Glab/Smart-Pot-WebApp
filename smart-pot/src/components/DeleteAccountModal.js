import React, { useState } from "react";
import Modal from "./Modal";

const DeleteAccountModal = ({ show, onClose }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [actionType, setActionType] = useState(null);
  const [sure, setSure] = useState(false);

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setModalMessage("Passwords do not match!");
      setActionType("failed_reset");
      setShowModal(true);
      return;
    }

    try {
      setModalMessage("Not implemented yet!");
      setActionType("delete_account");
      setShowModal(true);
    } catch (err) {
      setModalMessage("Failed to delete account!");
      setActionType("failed_delete_account");
      setShowModal(true);
      console.error(err);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (actionType === "delete_account") {
      setSure(false);
    }
    onClose();
  };

  if (!show) return null;

  return (
    <div className={`form${show ? " block-interaction" : ""}`}>
      <Modal show={showModal} onClose={closeModal}>
        {modalMessage}
      </Modal>

      {/* Conditionally render the header based on the 'sure' state */}
      <header>
        {sure
          ? "Confirm your password to delete your account"
          : "Are you sure you want to delete your account?"}
      </header>

      {!sure && (
        <form onSubmit={handleDeleteAccount}>
          <input type="button" value={"Yes"} onClick={() => setSure(true)} />
          <input type="button" value={"No"} onClick={onClose} />
        </form>
      )}
      {sure && (
        <form onSubmit={handleDeleteAccount}>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <input type="submit" className="button" value="Delete Account" />
          <input
            type="button"
            className="button"
            onClick={onClose}
            value="Close"
          />
        </form>
      )}
    </div>
  );
};

export default DeleteAccountModal;
