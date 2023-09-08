import React, { useEffect, useRef, useState } from "react";
import Sortable from "sortablejs";
import DropCard from "./DropCard";

const DropContainer = ({ onCardClick, plants, setPlants, isLoading }) => {
  const dropItems = useRef(null);
  const [rotationDegrees, setRotationDegrees] = useState(0);

  useEffect(() => {
    new Sortable(dropItems.current, {
      animation: 350,
      chosenClass: "sortable-chosen",
      dragClass: "sortable-drag",
      filter: ".refresh-sign",
      preventOnFilter: true,
    });
  }, []);

  const getNewPlants = () => {
    // Refresh logic should go here. Depending on how you want to refresh, you could:
    // 1. Make an API call to get new plants and setPlants(newPlants)
    // 2. Or simply refresh the entire page as in your original code:
    // window.location.reload();
  };

  return (
    <div id="drop-items" className="drop__container" ref={dropItems}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        plants.map((plant) => (
          <DropCard
            key={plant.id}
            id={plant.id}
            imgSrc={plant.imgsrc}
            name={plant.name}
            onClick={() => onCardClick(plant.id)}
          />
        ))
      )}
      <div
        className="refresh-sign"
        style={{ position: "absolute", top: "10%", right: "10%" }}
        onClick={() => {
          getNewPlants();
          setRotationDegrees(rotationDegrees - 360);
        }}
      >
        <img
          className="refresh-sign"
          src="assets/img/refresh.png"
          style={{
            width: "32px",
            height: "32px",
            backgroundColor: "transparent",
            transform: `rotate(${rotationDegrees}deg)`,
            transition: "transform 0.4s ease-in-out",
          }}
          alt=""
        />
      </div>
    </div>
  );
};

export default DropContainer;
