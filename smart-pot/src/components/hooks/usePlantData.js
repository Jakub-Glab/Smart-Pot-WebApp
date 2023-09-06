import { useState, useEffect } from "react";
import { getPlantData } from "./api";

const usePlantData = (initialPlants) => {
  const [plants, setPlants] = useState(initialPlants);

  const getData = async () => {
    try {
      for (let plant of plants) {
        const response = await getPlantData(plant.id);
        const data = response.data;

        plant.temp = data.temperature;
        plant.hum = data.humidity;
        plant.lux = data.lux;
        plant.name = data.name;
      }
      setPlants([...plants]); // Clone to trigger a re-render
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, 1000);

    return () => clearInterval(interval); // Cleanup function to clear the interval when the component unmounts
  }, [plants]);

  return { plants, setPlants, getData };
};

export default usePlantData;
