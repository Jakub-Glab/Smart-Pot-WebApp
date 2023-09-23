import { useState, useEffect } from "react";
import {
  getDevices,
  getPlants,
  createNewPlant,
  createNewDevice,
  deletePlant,
  deleteDevice,
} from "../../hooks/api";

const useApi = () => {
  const [devices, setDevices] = useState([]);
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const devicesResponse = await getDevices();
      setDevices(devicesResponse.data);

      const plantsResponse = await getPlants();
      setPlants(plantsResponse.data);
    };

    fetchData();
  }, []);

  const handleDeletePlant = async (plantId) => {
    let response = await deletePlant(plantId);
    if (response.status === 200) {
      const newPlants = plants.filter((plant) => plant.id !== plantId);
      setPlants(newPlants);
    }
  };

  const handleDeleteDevice = async (deviceId) => {
    let response = await deleteDevice(deviceId);
    if (response.status === 200) {
      const newDevices = devices.filter((device) => device.id !== deviceId);
      setDevices(newDevices);
    }
  };

  const handleCreatePlant = async (plantData) => {
    const payload = {
      name: plantData.name,
      device_id: plantData.id,
      last_updated: new Date().toISOString(),
      imgsrc: plantData.imgSrc,
      sensors: {
        humidity: 0,
        lux: 0,
        temperature: 0,
      },
    };

    const response = await createNewPlant(payload);
    if (response.status === 201) {
      setPlants([...plants, response.data]);
    }
  };

  const handleCreateDevice = async (deviceData) => {
    const payload = {
      name: deviceData.name,
      type: deviceData.type,
    };

    const response = await createNewDevice(payload);
    if (response.status === 200) {
      setDevices([...devices, response.data]);
    }
  };

  return {
    devices,
    plants,
    handleDeletePlant,
    handleDeleteDevice,
    handleCreatePlant,
    handleCreateDevice,
  };
};

export default useApi;
