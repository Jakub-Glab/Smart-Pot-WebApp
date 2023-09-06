import React, { useState } from "react";
import DropContainer from "./components/DropContainer";
import MainPlant from "./components/MainPlant";
import usePlantData from "./components/hooks/usePlantData";
import NoAnimations from "./components/NoAnimations";
import BurgerMenu from "./BurgerMenu";
import "./assets/css/App.css";

import plantCurrentDefault from "./assets/img/plant4round.png";

const initialPlants = [
  {
    id: "3",
    imgSrc: "assets/img/plant1.png",
    name: "PlantTest",
    hum: "",
    lux: "",
    temp: "",
  },
];

const App = () => {
  const [plantCurrent, setPlantCurrent] = useState(plantCurrentDefault);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const { plants, setPlants, getData } = usePlantData(initialPlants);

  const handleCardClick = (id) => {
    const clickedPlant = plants.find((plant) => plant.id === id);
    if (clickedPlant) {
      setPlantCurrent(clickedPlant.imgSrc.replace(".png", "round.png"));
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
        plantCurrent={plantCurrent}
        plants={plants}
        onAddPlant={handleAddPlant}
        getData={getData} // Pass the getData function as a prop
      />
      <NoAnimations />
    </div>
  );
};

export default App;
