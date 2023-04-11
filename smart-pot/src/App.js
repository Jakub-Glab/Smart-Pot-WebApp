import React, { useEffect, useRef, useState } from "react";
import Sortable from "sortablejs";
import PlantFormModal from "./PlantFormModal";
import "./App.css";

import plantCurrentDefault from "./assets/img/plant4round.png";

const plantRoundMapping = {
  "assets/img/plant1.png": "assets/img/plant1round.png",
  "assets/img/plant2.png": "assets/img/plant2round.png",
  "assets/img/plant3.png": "assets/img/plant3round.png",
  "assets/img/plant4.png": "assets/img/plant4round.png",
};

const DropCard = React.memo(({ id, imgSrc, name, profession, onClick }) => {
  return (
    <div className="drop__card" id={id} onClick={() => onClick(imgSrc)}>
      <div className="drop__data">
        <img src={imgSrc} alt="" className="drop__img" />
        <div>
          <h1 className="drop__name">{name}</h1>
          <span className="drop__profession">{profession}</span>
        </div>
        <div style={{ float: "left" }}>
          <img
            src="assets/img/temp_down.png"
            alt=""
            style={{ width: 32 + "px", height: 32 + "px" }}
          ></img>
          <img
            src="assets/img/sun_ok.png"
            alt=""
            style={{ width: 32 + "px", height: 32 + "px" }}
          ></img>
          <img
            src="assets/img/rain_ok.png"
            alt=""
            style={{ width: 32 + "px", height: 32 + "px" }}
          ></img>
        </div>
      </div>
    </div>
  );
});

const initialPlants = [
  {
    id: "plant1",
    imgSrc: "assets/img/plant1.png",
    name: "Plant #1",
    profession: "Temp: Hum: Lux:",
  },
];

const DropContainer = ({ onCardClick, plantCurrent, plants, onAddPlant }) => {
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

const NoAnimations = () => {
  useEffect(() => {
    const handleMouseDown = () => {
      document.body.classList.add("no-animations");
    };

    const handleMouseUp = () => {
      document.body.classList.remove("no-animations");
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return null;
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
      <div className="drop__background">
        <img
          src={plantCurrent}
          alt=""
          className="drop__img"
          style={{
            position: "absolute",
            width: "330px",
            height: "330px",
            borderRadius: "50%",
            right: "12rem",
            top: "-0.25rem",
            boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.15)",
          }}
        />
        <br />
        <br />
        <div className="card">
          <img
            src="assets/img/temp.png"
            style={{ width: "32px", height: "32px" }}
            alt=""
          />
        </div>
        <br />
        <div className="card">
          <img
            src="assets/img/sun.png"
            style={{ width: "32px", height: "32px" }}
            alt=""
          />
        </div>
        <br />
        <div className="card">
          <img
            src="assets/img/rain.png"
            style={{ width: "32px", height: "32px" }}
            alt=""
          />
        </div>
        <br />
      </div>
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
