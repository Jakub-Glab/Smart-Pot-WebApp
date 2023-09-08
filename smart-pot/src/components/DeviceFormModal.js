import React, { useState } from "react";
import "../assets/css/Login.css";

const DeviceFormModal = ({ show, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, type });
    setName("");
    setType("");
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div className={`form${show ? " block-interaction" : ""}`}>
      <header>Add new device</header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter device name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Device ID"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
        <div></div>
        <input type="submit" className="button" value="Add device" />
      </form>
      <input type="button" className="button" onClick={onClose} value="Close" />
    </div>
  );
};

export default DeviceFormModal;
