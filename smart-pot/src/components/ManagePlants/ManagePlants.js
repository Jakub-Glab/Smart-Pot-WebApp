import React, { useEffect, useState } from "react";
import {
  getDevices,
  getPlants,
  createNewPlant,
  createNewDevice,
  deletePlant,
  deleteDevice,
} from "../hooks/api";
import PlantFormModal from "../Modals/PlantFormModal"; // Make sure the path is correct
import DeviceFormModal from "../Modals/DeviceFormModal";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
import DeviceCard from "./DeviceCard";
import PlantCard from "./PlantCard";
import Tooltip from "./Tooltip";
import "../../assets/css/ManagePlants.css";

const ManagePlants = () => {
  const [devices, setDevices] = useState([]);
  const [plants, setPlants] = useState([]);
  const [showPlantFormModal, setShowPlantFormModal] = useState(false);
  const [showDeviceFormModal, setShowDeviceFormModal] = useState(false);
  const [rotationDegrees, setRotationDegrees] = useState(0);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [plantToDelete, setPlantToDelete] = useState(null);
  const [deviceToDelete, setDeviceToDelete] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [deletingEntityType, setDeletingEntityType] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handlePlantClick = (plantId) => {
    console.log("Plant ID: ", plantId);
    if (buttonClicked) {
      setModalMessage("Are you sure you want to delete this plant?");
      setPlantToDelete(plantId);
      setDeletingEntityType("plant");
      setShowModal(true);
      setButtonClicked(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Text successfully copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text to clipboard", err);
    }
  };

  const handleDeviceClick = async (e, deviceId) => {
    console.log("Device ID: ", deviceId);
    if (buttonClicked) {
      setModalMessage("Are you sure you want to delete this device?");
      setDeviceToDelete(deviceId);
      setDeletingEntityType("device");
      setShowModal(true);
      setButtonClicked(false);
    } else {
      const rect = e.currentTarget
        .closest(".manageContainer")
        .getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the container
      const y = e.clientY - rect.top;
      setTooltipPosition({ x: x, y: y });
      setTooltipMessage("ID Copied to Clipboard!");
      setShowTooltip(true);

      setTimeout(() => setShowTooltip(false), 2000); // Hides tooltip after 2 seconds
      await copyToClipboard(deviceId);
    }
  };

  const handleDeleteEntity = async () => {
    console.log("Deleting entity: ", deletingEntityType);
    if (deletingEntityType === "plant") {
      let response = await deletePlant(plantToDelete);
      if (response.status === 200) {
        const newPlants = plants.filter((plant) => plant.id !== plantToDelete);
        setPlants(newPlants);
      } else {
      }
    } else if (deletingEntityType === "device") {
      let response = await deleteDevice(deviceToDelete);
      if (response.status === 200) {
        const newDevices = devices.filter(
          (device) => device.id !== deviceToDelete
        );
        setDevices(newDevices);
      } else {
      }
    }
    setShowModal(false);
    setDeletingEntityType(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const devicesResponse = await getDevices();
      setDevices(devicesResponse.data);

      const plantsResponse = await getPlants();
      setPlants(plantsResponse.data);
    };

    fetchData();
  }, []);

  const handleCreatePlant = async (plantData) => {
    // Create the payload
    console.log("Plant data: ", plantData);
    let payload = {
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

    try {
      const response = await createNewPlant(payload);
      if (response.status === 201) {
        setPlants([...plants, response.data]);
      }
    } catch (err) {
      if (err.response.status === 409) {
        alert(
          `Device with id: ${plantData.id} is already assigned to a plant!`
        );
      }
    }
  };

  const handleCreateDevice = async (deviceData) => {
    let payload = {
      name: deviceData.name,
      type: deviceData.type,
    };

    const response = await createNewDevice(payload);
    if (response.status === 200) {
      setDevices([...devices, response.data]);
    }
  };

  return (
    <div className="manageContainer">
      {showPlantFormModal || showDeviceFormModal ? null : (
        <div className="form">
          <header>
            Manage Plants
            <div
              className="refresh-sign"
              style={{ float: "right" }}
              onClick={() => {
                setRotationDegrees(rotationDegrees - 360);
                setTimeout(() => {
                  window.location.reload();
                }, 400);
              }}
            >
              <img
                className="refresh-sign"
                src="assets/img/refresh.png"
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "transparent",
                  transform: `rotate(${rotationDegrees}deg)`,
                  transition: "transform 0.4s ease-in-out",
                }}
                alt=""
              />
            </div>
          </header>
          <div className="info__container">
            {/* Devices Listing */}
            <h2>
              Devices
              <div
                className="addDevice-sign"
                style={{ float: "right" }}
                onClick={() => {
                  setTimeout(() => {
                    setShowDeviceFormModal(true);
                  }, 200);
                }}
              >
                <img
                  className="addDevice-sign"
                  src="assets/img/plus.png"
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: "transparent",
                  }}
                  alt=""
                />
              </div>
            </h2>
            {devices.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                inDeleteMode={buttonClicked}
                onDelete={handleDeviceClick}
                onCopy={copyToClipboard}
              />
            ))}

            {/* Plants Listing */}
            <h2>
              Plants
              <div
                className="addPlant-sign"
                style={{ float: "right" }}
                onClick={() => {
                  setTimeout(() => {
                    setShowPlantFormModal(true);
                  }, 200);
                }}
              >
                <img
                  className="addPlant-sign"
                  src="assets/img/plus.png"
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: "transparent",
                  }}
                  alt=""
                />
              </div>
            </h2>
            {plants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                inDeleteMode={buttonClicked}
                onDelete={handlePlantClick}
              />
            ))}
          </div>
          <br></br>
          <input
            type="button"
            className={`buttonDel ${buttonClicked ? "active" : ""}`}
            value="Delete"
            onClick={() => {
              setButtonClicked(!buttonClicked);
            }}
          />
        </div>
      )}

      {/* Modals */}
      <PlantFormModal
        show={showPlantFormModal}
        onClose={() => setShowPlantFormModal(false)}
        onSubmit={handleCreatePlant}
        devices={devices}
      />
      <DeviceFormModal
        show={showDeviceFormModal}
        onClose={() => setShowDeviceFormModal(false)}
        onSubmit={handleCreateDevice}
      />
      <DeleteConfirmationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeleteEntity}
        entityType={deletingEntityType}
      />
      {/* Tooltip */}
      {showTooltip && (
        <Tooltip message={tooltipMessage} position={tooltipPosition} />
      )}
    </div>
  );
};

export default ManagePlants;
