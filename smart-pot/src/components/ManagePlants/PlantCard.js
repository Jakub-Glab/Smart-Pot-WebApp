import React from "react";

const PlantCard = ({ plant, inDeleteMode, onDelete }) => {
  return (
    <div
      className={`info__card ${inDeleteMode ? "jiggle-card" : ""}`}
      onClick={() => inDeleteMode && onDelete(plant.id)}
    >
      <div className="info__data">
        <img src={plant.imgsrc} alt="plant" className="info__img" />
        <div>
          <p className="info__name">{plant.name}</p>
          <p className="info__id">{plant.id}</p>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
