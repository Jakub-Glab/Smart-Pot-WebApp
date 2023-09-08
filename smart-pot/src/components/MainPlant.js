import React from "react";
import SensorCard from "./SensorCard";
import CurrentPlantImage from "./CurrentPlantImg";

const MainPlant = React.memo(({ plantCurrent, temperature, humidity, lux }) => {
  return (
    <div className="drop__background">
      <CurrentPlantImage src={plantCurrent} />
      <br />
      <br />
      <SensorCard sensor="temp" value={temperature} unit="°C" />
      <br />
      <SensorCard sensor="lux" value={lux} unit="lx" />
      <br />
      <SensorCard sensor="hum" value={humidity} unit="%" />
      <br />
    </div>
  );
});

export default MainPlant;
