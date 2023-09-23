import React, { useState } from "react";
import DeviceSelectComponent from "./DeviceSelectComponent";

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

  const types = [
    { name: "ESP", type: "ESP" },
    { name: "NODEMCU", type: "NODEMCU" },
  ];

  const onChange = (e) => {
    setType(e.type);
  };

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
        <br></br>
        <DeviceSelectComponent
          options={types}
          onChange={onChange}
          isSearchable={false}
        />
        <br></br>
        <div></div>
        <input type="submit" className="button" value="Add device" />
      </form>
      <input type="button" className="button" onClick={onClose} value="Close" />
    </div>
  );
};

export default DeviceFormModal;
