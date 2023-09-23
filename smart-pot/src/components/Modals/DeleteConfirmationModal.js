import React from "react";
import ConfirmationModal from "./ConfirmationModal";

const DeleteConfirmationModal = ({ show, onClose, onConfirm, entityType }) => {
  return (
    <ConfirmationModal show={show} onClose={onClose}>
      {`Are you sure you want to delete this ${entityType}?`}
      <button onClick={onClose}>No</button>
      <button onClick={onConfirm}>Yes</button>
    </ConfirmationModal>
  );
};

export default DeleteConfirmationModal;
