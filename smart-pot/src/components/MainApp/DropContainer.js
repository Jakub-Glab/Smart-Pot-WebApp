import React, { useEffect, useRef, useState } from "react";
import Sortable from "sortablejs";
import DropCard from "./DropCard";

const DropContainer = ({
  onCardClick,
  plants,
  setSelectedPlant,
  isLoading,
}) => {
  const dropItems = useRef(null);
  const [rotationDegrees, setRotationDegrees] = useState(0);

  useEffect(() => {
    new Sortable(dropItems.current, {
      animation: 350,
      chosenClass: "sortable-chosen",
      dragClass: "sortable-drag",
      filter: ".refresh-sign",
      preventOnFilter: true,
      onEnd: () => {
        const newSortedPlants = Array.from(dropItems.current.children)
          .filter((child) => !child.classList.contains("refresh-sign"))
          .map((child) =>
            plants.find((plant) => plant.id === Number(child.id))
          );
        localStorage.setItem(
          "sortedPlants",
          JSON.stringify(newSortedPlants.map((p) => p.id))
        );

        setSelectedPlant(newSortedPlants[0]);
      },
    });
  }, [plants]);

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
    </div>
  );
};

export default DropContainer;
