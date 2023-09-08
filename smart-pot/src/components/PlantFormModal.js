import React, { useState } from "react";
import "../assets/css/Login.css";

const PlantFormModal = ({ show, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [imgSrc, setImgSrc] = useState("assets/img/plant1.png");

  const plantImages = [
    "assets/img/plant1.png",
    "assets/img/plant2.png",
    "assets/img/plant3.png",
    "assets/img/plant4.png",
    "assets/img/plant5.png",
    "assets/img/device.png",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, id, imgSrc });
    setName("");
    setId("");
    setImgSrc("assets/img/plant1.png");
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div className={`modal-overlay${show ? " block-interaction" : ""}`}>
      <div className="modal_big">
        <div className="form">
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
            <input
              type="text"
              placeholder="Device ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
            <div>
              <p>Choose Plant Image:</p>
              <div className="image-gallery">
                {plantImages.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className={`gallery-image${
                      imgSrc === src ? " selected" : ""
                    }`}
                    onClick={() => setImgSrc(src)}
                  />
                ))}
              </div>
            </div>
            <input type="submit" className="button" value="Add plant" />
          </form>
          <input
            type="button"
            className="button"
            onClick={onClose}
            value="Close"
          />
        </div>
      </div>
    </div>
  );
};

export default PlantFormModal;
