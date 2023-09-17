import React, { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import DeleteAccountModal from "./DeleteAccountModal";

const Settings = () => {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  return (
    <div className="manageContainer">
      {!showChangePasswordModal && !showDeleteAccountModal && (
        <div className="form">
          <header>Settings</header>
          <h2>Account</h2>
          <input
            type="button"
            value="Change Password"
            onClick={() => setShowChangePasswordModal(true)} // Toggle the modal on
          />
          <input
            type="button"
            value="Delete Account"
            onClick={() => setShowDeleteAccountModal(true)} // Toggle the modal on
          />
          <h2>Application</h2>
          <input type="button" value="Test 1" />
          <input type="button" value="Test 2" />
        </div>
      )}
      {showChangePasswordModal && (
        <ChangePasswordModal
          show={showChangePasswordModal}
          onClose={() => setShowChangePasswordModal(false)} // Toggle the modal off
        />
      )}
      {showDeleteAccountModal && (
        <DeleteAccountModal
          show={showDeleteAccountModal}
          onClose={() => setShowDeleteAccountModal(false)} // Toggle the modal off
        />
      )}
    </div>
  );
};

export default Settings;
