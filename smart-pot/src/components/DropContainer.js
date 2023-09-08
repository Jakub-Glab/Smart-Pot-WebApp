import React, { useEffect, useRef, useState } from "react";
import Sortable from "sortablejs";
import DropCard from "./DropCard";

import { getPlants } from "./hooks/api"; // Make sure the import is correct

const DropContainer = ({ onCardClick, onAddPlant }) => {
  const [plants, setPlants] = useState([]); // Manage plants locally
  const dropItems = useRef(null);
  const [rotationDegrees, setRotationDegrees] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const plantsResponse = await getPlants();
      setPlants(plantsResponse.data);
    };
    fetchData();

    new Sortable(dropItems.current, {
      animation: 350,
      chosenClass: "sortable-chosen",
      dragClass: "sortable-drag",
      filter: ".refresh-sign",
      preventOnFilter: true,
    });
  }, []);

  const getNewPlants = async () => {
    window.location.reload();
    const plantsResponse = await getPlants();
    setPlants(plantsResponse.data);
  };

  return (
    <div id="drop-items" className="drop__container" ref={dropItems}>
      {plants.map((plant) => (
        <DropCard
          key={plant.id}
          id={plant.id}
          imgSrc={plant.imgsrc}
          name={plant.name}
          onClick={() => onCardClick(plant.id)}
        />
      ))}
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
