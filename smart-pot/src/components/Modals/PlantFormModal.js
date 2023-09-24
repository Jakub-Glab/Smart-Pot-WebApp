// PlantFormModal.js
import React, { useState } from "react";
import DeviceSelectComponent from "./DeviceSelectComponent";

const PlantFormModal = ({ show, onClose, onSubmit, devices }) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [hum, setHum] = useState("");
  const [temp, setTemp] = useState("");
  const [lux, setLux] = useState("");
  const [imgSrc, setImgSrc] = useState("assets/img/plant1.png");
  const [selectedOption, setSelectedOption] = useState("none");
  const plantImages = [
    "assets/img/plant1.png",
    "assets/img/plant2.png",
    "assets/img/plant3.png",
    "assets/img/plant4.png",
    "assets/img/plant5.png",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, id, imgSrc });
    setName("");
    setId("");
    setHum("");
    setTemp("");
    setLux("");
    setImgSrc("assets/img/plant1.png");
    onClose();
  };

  if (!show) {
    return null;
  }

  const onChange = (e) => {
    console.log("Selected timezone", e);
    setId(e.id);
  };

  return (
    <div className={`form${show ? " block-interaction" : ""}`}>
      <header>Add new plant</header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter plant name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <div
          style={{
            marginBottom: "1.3rem",
          }}
        >
          <DeviceSelectComponent
            options={devices}
            onChange={onChange}
            placeholder="Select device"
            isSearchable={false}
          />
        </div>
        <div>
          <p>Choose Plant Image:</p>
          <div className="image-gallery">
            {plantImages.map((src) => (
              <img
                key={src}
                src={src}
                alt=""
                className={`gallery-image${imgSrc === src ? " selected" : ""}`}
                onClick={() => setImgSrc(src)}
              />
            ))}
          </div>
        </div>
        <input type="submit" className="button" value="Add plant" />
      </form>
      <input type="button" className="button" onClick={onClose} value="Close" />
    </div>
  );
};

export default PlantFormModal;
