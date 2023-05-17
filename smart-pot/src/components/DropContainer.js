import React, { useEffect, useRef, useState } from "react";
import Sortable from "sortablejs";
import PlantFormModal from "./PlantFormModal";
import DropCard from "./DropCard";

const DropContainer = ({ onCardClick, plants, onAddPlant, getData }) => {
  const dropItems = useRef(null);
  const [showPlusSign, setShowPlusSign] = useState(false);
  const [showCollapseSign, setShowCollapseSign] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rotationDegrees, setRotationDegrees] = useState(0);

  useEffect(() => {
    new Sortable(dropItems.current, {
      animation: 350,
      chosenClass: "sortable-chosen",
      dragClass: "sortable-drag",
      filter: ".refresh-sign, .plus-sign, .collapse-sign",
      preventOnFilter: true,
    });
  }, []);

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nearTopEdge = e.clientY < rect.top + 50;
    const nearBottomEdge = e.clientY > rect.bottom - 50;

    // Check if the target element is the DropContainer
    const isTargetValid = e.currentTarget === dropItems.current;

    // Set the showCollapseSign state based on the mouse position and target element
    setShowCollapseSign(nearTopEdge && isTargetValid);
    setShowPlusSign(nearBottomEdge && isTargetValid);
  };

  const handleMouseLeave = () => {
    setShowPlusSign(false);
    setShowCollapseSign(false);
  };

  const handlePlusClick = () => {
    setShowModal(true);
  };

  const handleCollapseClick = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div
      id="drop-items"
      className={`drop__container${
        showPlusSign && !isCollapsed ? " with-shade" : ""
      }${isCollapsed ? " collapsed" : ""}`}
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
      {showCollapseSign && (
        <>
          <div
            className="collapse-sign"
            style={{ position: "absolute", top: "10px", right: "50%" }}
            onClick={handleCollapseClick}
          >
            V
          </div>
        </>
      )}
      {!isCollapsed &&
        plants.map((plant) => (
          <DropCard
            key={plant.id}
            id={plant.id}
            imgSrc={plant.imgSrc}
            name={plant.name}
            onClick={() => onCardClick(plant.id)}
          />
        ))}
      <div
        className="refresh-sign"
        style={{ position: "absolute", top: "10%", right: "10%" }}
        onClick={() => {
          getData();
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
      <PlantFormModal
        show={showModal}
        onClose={handleModalClose}
        onSubmit={onAddPlant}
      />
    </div>
  );
};

export default DropContainer;
