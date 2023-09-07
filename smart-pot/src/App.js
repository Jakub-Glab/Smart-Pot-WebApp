import React, { useState } from "react";
import DropContainer from "./components/DropContainer";
import MainPlant from "./components/MainPlant";
import usePlantData from "./components/hooks/usePlantData";
import NoAnimations from "./components/NoAnimations";
import "./assets/css/App.css";
import { getPlants } from "./components/hooks/api";

import plantCurrentDefault from "./assets/img/plant4round.png";

const App = () => {
  const [plantCurrent, setPlantCurrent] = useState(plantCurrentDefault);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const { plants, setPlants, getData } = usePlantData([]);

  const handleCardClick = async (id) => {
    const plantsResponse = await getPlants();
    setPlants(plantsResponse.data);
    const clickedPlant = plants.find((plant) => plant.id === id);
    if (clickedPlant) {
      //setPlantCurrent(clickedPlant.imgSrc.replace(".png", "round.png"));
      setSelectedPlant(clickedPlant);
    }
  };

  const handleAddPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  };

  return (
    <div className="drop">
      <MainPlant
        plantCurrent={plantCurrent}
        temp={selectedPlant?.temp}
        hum={selectedPlant?.hum}
        lux={selectedPlant?.lux}
      />
      <DropContainer
        onCardClick={handleCardClick}
        onAddPlant={handleAddPlant}
        getData={getData}
      />
      <NoAnimations />
    </div>
  );
};

export default App;
