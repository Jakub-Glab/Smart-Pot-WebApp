import React, { useState, useEffect } from "react";
import DropContainer from "./components/DropContainer";
import MainPlant from "./components/MainPlant";
import usePlantData from "./components/hooks/usePlantData";
import NoAnimations from "./components/NoAnimations";
import "./assets/css/App.css";

const App = () => {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const { plants } = usePlantData(); // Using the custom hook

  useEffect(() => {
    // Retrieve sorted plant IDs from localStorage
    const sortedPlantIds =
      JSON.parse(localStorage.getItem("sortedPlants")) || [];

    // Convert IDs to actual plant objects
    const sortedPlants = sortedPlantIds
      .map((id) => plants.find((plant) => plant.id === id))
      .filter(Boolean);

    // If there are sorted plants in localStorage, use the first one as selected plant
    if (sortedPlants.length > 0) {
      setSelectedPlant(sortedPlants[0]);
    } else if (plants.length > 0) {
      // Otherwise, use the first plant from the list
      setSelectedPlant(plants[0]);
    }

    // If selectedPlant is already set, keep it updated
    if (selectedPlant) {
      const updatedSelectedPlant = plants.find(
        (plant) => plant.id === selectedPlant.id
      );
      if (updatedSelectedPlant) {
        setSelectedPlant(updatedSelectedPlant);
      }
    }
  }, [plants]);

  const handleCardClick = (id) => {
    const clickedPlant = plants.find((plant) => plant.id === id);
    if (clickedPlant) {
      setSelectedPlant(clickedPlant);
    }
  };

  return (
    <div className="drop">
      <MainPlant
        plantCurrent={selectedPlant?.imgsrc}
        temperature={selectedPlant?.temperature}
        humidity={selectedPlant?.humidity}
        lux={selectedPlant?.lux}
      />

      <DropContainer
        onCardClick={handleCardClick}
        plants={plants}
        setSelectedPlant={setSelectedPlant}
      />
      <NoAnimations />
    </div>
  );
};

export default App;
