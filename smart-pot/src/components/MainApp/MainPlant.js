import React from "react";
import SensorCard from "./SensorCard";
import CurrentPlantImage from "./CurrentPlantImg";

const MainPlant = React.memo(({ plantCurrent, temperature, humidity, lux }) => {
  return (
    <div className="drop__background">
      <CurrentPlantImage src={plantCurrent} />
      <br />
      <br />
      <div className="card__container">
        <SensorCard sensor="temp" value={temperature} unit="°C" />
        <SensorCard sensor="lux" value={lux} unit="lx" />
        <SensorCard sensor="hum" value={humidity} unit="%" />
      </div>
    </div>
  );
});

export default MainPlant;
