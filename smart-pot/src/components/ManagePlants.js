import React, { useEffect, useState } from "react";
import {
  getDevices,
  getPlants,
  createNewPlant,
  createNewDevice,
  deletePlant,
  deleteDevice,
} from "./hooks/api";
import PlantFormModal from "./PlantFormModal"; // Make sure the path is correct
import DeviceFormModal from "./DeviceFormModal";
import Modal from "./Modal";
import "../assets/css/ManagePlants.css";

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

  const deviceImg = "../assets/img/device.png";

  const handlePlantClick = (plantId) => {
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
    console.log(deviceId);
    if (buttonClicked) {
      setModalMessage("Are you sure you want to delete this device?");
      setDeviceToDelete(deviceId);
      setDeletingEntityType("device");
      setShowModal(true);
      setButtonClicked(false);
    } else {
      const rect = e.currentTarget
        .closest(".container")
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
        console.log(response.data);
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
    <div className="container">
      {showPlantFormModal || showDeviceFormModal ? null : (
        <div className="form">
          <header>
            Manage Plants
            <div
              className="refresh-sign"
              style={{ float: "right", marginRight: "10%" }}
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
            <h2>
              Devices
              <div
                className="addDevice-sign"
                style={{ float: "right", marginRight: "10%" }}
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
            <ul>
              {devices.map((device, index) => (
                <li
                  key={index}
                  className={`info__card ${buttonClicked ? "jigglele" : ""}`}
                  onClick={(e) => handleDeviceClick(e, device.id)}
                >
                  <div className="info__data">
                    <img src={deviceImg} alt="device" className="info__img" />
                    <div>
                      <p className="info__name">{device.name}</p>
                      <p className="info__id">{device.id}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <h2>
              Plants
              <div
                className="addPlant-sign"
                style={{ float: "right", marginRight: "10%" }}
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
            <ul>
              {plants.map((plant, index) => (
                <li
                  key={index}
                  className={`info__card ${buttonClicked ? "jigglele" : ""}`}
                  onClick={() => handlePlantClick(plant.id)}
                >
                  <div className="info__data">
                    <img src={plant.imgsrc} alt="plant" className="info__img" />
                    <div>
                      <p className="info__name">{plant.name}</p>
                      <p className="info__id">{plant.id}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <input
              type="button"
              className={`buttonDel ${buttonClicked ? "active" : ""}`}
              value="Delete"
              onClick={() => {
                setButtonClicked(!buttonClicked);
              }}
            />
          </div>

          {showTooltip && (
            <div
              className="tooltip"
              style={{
                position: "absolute",
                top: `${tooltipPosition.y}px`,
                left: `${tooltipPosition.x + 15}px`,
                zIndex: 1000,
              }}
            >
              {tooltipMessage}
            </div>
          )}
        </div>
      )}

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
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        {modalMessage}
        <button onClick={() => setShowModal(false)}>No</button>
        <button onClick={handleDeleteEntity}>Yes</button>
      </Modal>
    </div>
  );
};

export default ManagePlants;
