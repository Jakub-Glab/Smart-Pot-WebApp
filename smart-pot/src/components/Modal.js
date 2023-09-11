import React, { useEffect } from "react";
import "../assets/css/Modal.css";

const Modal = ({ show, children, onClose }) => {
  useEffect(() => {
    let timer;
    if (show) {
      timer = setTimeout(() => {
        onClose();
      }, 600); // Close after 1 second
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={onClose}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
