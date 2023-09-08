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
    const updatedSelectedPlant = plants.find(
      (plant) => plant.id === selectedPlant?.id
    );
    if (updatedSelectedPlant) {
      setSelectedPlant(updatedSelectedPlant);
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

      <DropContainer onCardClick={handleCardClick} plants={plants} />
      <NoAnimations />
    </div>
  );
};

export default App;
