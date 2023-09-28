import React from "react";
import ConfirmationModal from "./ConfirmationModal";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n";

const DeleteConfirmationModal = ({ show, onClose, onConfirm, entityType }) => {
  const { t, i18n } = useTranslation();

  return (
    <ConfirmationModal show={show} onClose={onClose}>
      {`Are you sure you want to delete this ${entityType}?`}
      <input type="button" value={t("yes")} onClick={onConfirm} />
      <input type="button" value={t("no")} onClick={onClose} />
    </ConfirmationModal>
  );
};

export default DeleteConfirmationModal;
