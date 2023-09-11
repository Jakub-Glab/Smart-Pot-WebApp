import { useState, useEffect } from "react";
import { getPlants, getPlantData } from "./api";

const usePlantData = () => {
  // State to store the plant data
  const [plants, setPlants] = useState([]);

  // Fetch initial plant data when the component mounts
  useEffect(() => {
    const init = async () => {
      try {
        const response = await getPlants();
        setPlants(response.data);
      } catch (error) {
        console.error("Error fetching initial plants:", error);
      }
    };

    init();
  }, []);

  // Function to update individual plant data
  const updatePlants = async () => {
    try {
      const updatedPlants = await Promise.all(
        plants.map(async (plant) => {
          const data = await getPlantData(plant.id);
          return { ...data.data };
        })
      );
      setPlants(updatedPlants);
    } catch (error) {
      console.error("Error updating plants:", error);
    }
  };

  // Set up a timer to update plant data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      updatePlants();
    }, 2000);

    return () => clearInterval(interval);
  }, [plants]);

  return { plants, setPlants, updatePlants };
};

export default usePlantData;
