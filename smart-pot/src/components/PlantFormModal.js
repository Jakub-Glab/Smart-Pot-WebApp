// PlantFormModal.js
import React, { useState } from "react";

const PlantFormModal = ({ show, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [hum, setHum] = useState("");
  const [temp, setTemp] = useState("");
  const [lux, setLux] = useState("");
  const [imgSrc, setImgSrc] = useState("assets/img/plant1.png");

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

  return (
    <div className={`modal-overlay${show ? " block-interaction" : ""}`}>
      <div className="modal">
        <div className="modal-content">
          <h2>Add a New Plant</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Plant Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              id:
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
            </label>
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
            <button type="submit">Add Plant</button>
          </form>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default PlantFormModal;
