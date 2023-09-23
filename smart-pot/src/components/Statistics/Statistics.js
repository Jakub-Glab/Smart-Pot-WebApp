import React, { useState, useEffect } from "react";
import SensorCalendar from "./SensorCalendar";
import PlantHistoryLimit from "./PlantHistoryLimit";
import PlantSelectComponent from "./PlantSelectComponent";
import { getDevices, getPlants } from "../hooks/api";

const Statistics = () => {
  const [plantId, setPlantId] = useState(1);
  const [show, setShow] = useState(""); // Values can be 'calendar', 'history', or ''
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const plantsResponse = await getPlants();
      setPlants(plantsResponse.data);
      console.log(plantsResponse.data);
    };

    fetchData();
  }, []);

  return (
    <div className="statisticsContainer">
      <div className="form">
        <h1>Statistics</h1>
        <h2>Select plant:</h2>
        <PlantSelectComponent options={plants} isSearchable={false} />
      </div>
    </div>
  );
};

export default Statistics;
