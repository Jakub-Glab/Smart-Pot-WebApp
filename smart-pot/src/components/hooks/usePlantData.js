import { useState } from "react";

const usePlantData = (initialPlants) => {
  const [plants, setPlants] = useState(initialPlants);

  const getData = async () => {
    try {
      const response = await fetch(
        "https://smart-pot-api-default-rtdb.firebaseio.com/Plants.json"
      );
      const data = await response.json();
      const fetchedPlants = Object.values(data);

      const updatedPlants = plants.map((plant) => {
        const fetchedPlant = fetchedPlants.find((p) => p.id === plant.id);
        if (fetchedPlant) {
          return {
            ...plant,
            temp: fetchedPlant.sensors.temp,
            hum: fetchedPlant.sensors.hum,
            lux: fetchedPlant.sensors.lux,
          };
        }
        return plant;
      });

      setPlants(updatedPlants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return { plants, setPlants, getData };
};

export default usePlantData;
