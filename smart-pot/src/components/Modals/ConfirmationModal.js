import React, { useEffect } from "react";
import "../../assets/css/Modal.css";

const ConfirmationModal = ({ show, children, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={onClose}>
        {children}
      </div>
    </div>
  );
};

export default ConfirmationModal;
