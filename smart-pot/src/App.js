import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchInitialData = async () => {
      const plantsResponse = await getPlants();
      setPlants(plantsResponse.data);
      if (plantsResponse.data.length > 0) {
        const firstPlant = plantsResponse.data[0];
        setPlantCurrent(firstPlant.imgsrc.replace(".png", "round.png"));
        setSelectedPlant(firstPlant);
      }
    };
    fetchInitialData();
  }, []);

  const handleCardClick = async (id) => {
    const plantsResponse = await getPlants();
    setPlants(plantsResponse.data);
    const clickedPlant = plants.find((plant) => plant.id === id);
    if (clickedPlant) {
      setPlantCurrent(clickedPlant.imgsrc.replace(".png", "round.png"));
      setSelectedPlant(clickedPlant);
    }
  };

  const handleAddPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  };

  return (
    <div className="drop">
      <MainPlant
        plantCurrent={selectedPlant?.imgsrc}
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
