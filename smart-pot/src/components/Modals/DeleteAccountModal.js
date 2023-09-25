import React, { useState } from "react";
import Modal from "../Modals/Modal";
import { deleteAccount } from "../hooks/api";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n";

const DeleteAccountModal = ({ show, onClose }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [actionType, setActionType] = useState(null);
  const [sure, setSure] = useState(false);
  const { t, i18n } = useTranslation();

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setModalMessage("Passwords do not match!");
      setActionType("failed_reset");
      setShowModal(true);
      return;
    }

    try {
      const response = await deleteAccount(password);
      if (response.status === 200) {
        setModalMessage("Password change Successful!");
        setActionType("change_password");
        setShowModal(true);
      }
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

      <header>
        {sure
          ? t("Settings.DeleteAccountModal.confirmPassword")
          : t("Settings.DeleteAccountModal.question")}
      </header>

      {!sure && (
        <form onSubmit={handleDeleteAccount}>
          <input type="button" value={t("yes")} onClick={() => setSure(true)} />
          <input type="button" value={t("no")} onClick={onClose} />
        </form>
      )}
      {sure && (
        <form onSubmit={handleDeleteAccount}>
          <input
            type="password"
            placeholder={t("Settings.DeleteAccountModal.enterPassword")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder={t("Settings.DeleteAccountModal.confirmEnterPassword")}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <input
            type="submit"
            className="button"
            value={t("Settings.DeleteAccountModal.delete")}
          />
          <input
            type="button"
            className="button"
            onClick={onClose}
            value={t("Settings.DeleteAccountModal.close")}
          />
        </form>
      )}
    </div>
  );
};

export default DeleteAccountModal;
