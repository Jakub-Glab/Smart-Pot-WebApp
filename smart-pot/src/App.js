import React, { useEffect, useRef, useState } from "react";
import Sortable from "sortablejs";
import PlantFormModal from "./components/PlantFormModal";
import DropCard from "./components/DropCard";
import NoAnimations from "./components/NoAnimations";
import MainPlant from "./components/MainPlant";
import "./assets/css/App.css";

import plantCurrentDefault from "./assets/img/plant4round.png";

const initialPlants = [
  {
    id: "plant1",
    imgSrc: "assets/img/plant1.png",
    name: "Plant #1",
    profession: "Temp: Hum: Lux:",
  },
];

const DropContainer = ({ onCardClick, plants, onAddPlant }) => {
  const dropItems = useRef(null);
  const [showPlusSign, setShowPlusSign] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    new Sortable(dropItems.current, {
      animation: 350,
      chosenClass: "sortable-chosen",
      dragClass: "sortable-drag",
    });
  }, []);

  const handleMouseEnter = (e) => {
    const rect = e.target.getBoundingClientRect();
    const nearEdge = e.clientY > rect.bottom - 50; // Adjust the value to change the sensitivity
    setShowPlusSign(nearEdge);
  };

  const handleMouseLeave = () => {
    setShowPlusSign(false);
  };

  const handlePlusClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div
      id="drop-items"
      className={`drop__container${showPlusSign ? " with-shade" : ""}`}
      ref={dropItems}
      onMouseMove={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showPlusSign && (
        <>
          <div
            className="plus-sign"
            style={{ position: "absolute", bottom: "10px", right: "50%" }}
            onClick={handlePlusClick}
          >
            +
          </div>
        </>
      )}
      {plants.map((plant) => (
        <DropCard
          key={plant.id}
          id={plant.id}
          imgSrc={plant.imgSrc}
          name={plant.name}
          profession="Temp: Hum: Lux:"
          onClick={() => onCardClick(plant.id)}
        />
      ))}
      <PlantFormModal
        show={showModal}
        onClose={handleModalClose}
        onSubmit={onAddPlant}
      />
    </div>
  );
};

const App = () => {
  const [plantCurrent, setPlantCurrent] = useState(plantCurrentDefault);
  const [plants, setPlants] = useState(initialPlants);

  const handleCardClick = (id) => {
    const clickedPlant = plants.find((plant) => plant.id === id);
    if (clickedPlant) {
      setPlantCurrent(clickedPlant.imgSrc.replace(".png", "round.png"));
    }
  };

  const handleAddPlant = (newPlant) => {
    const newId = `plant${plants.length + 1}`;
    setPlants([...plants, { ...newPlant, id: newId }]);
  };

  return (
    <div className="drop">
      <MainPlant plantCurrent={plantCurrent} />
      <DropContainer
        onCardClick={handleCardClick}
        plantCurrent={plantCurrent}
        plants={plants}
        onAddPlant={handleAddPlant}
      />
      <NoAnimations />
    </div>
  );
};

export default App;
