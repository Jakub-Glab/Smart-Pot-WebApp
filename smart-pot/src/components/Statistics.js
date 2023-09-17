import React, { useState } from "react";
import SensorCalendar from "./SensorCalendar";
import PlantHistoryLimit from "./PlantHistoryLimit";

const Statistics = () => {
  const [plantId, setPlantId] = useState(1);
  const [show, setShow] = useState(""); // Values can be 'calendar', 'history', or ''

  return (
    <div className="manageContainer">
      <div className="form">
        <h1>Statistics</h1>
      </div>
    </div>
  );
};

export default Statistics;
