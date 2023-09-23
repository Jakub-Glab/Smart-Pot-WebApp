import React from "react";

const DeviceCard = ({
  device,
  inDeleteMode,
  onDelete,
  onCopy,
  setShowDeviceFormModal,
}) => {
  const deviceSrc = (e) => {
    if (e.type === "ESP") {
      return "../../assets/img/device_esp.png";
    }
    if (e.type === "NODEMCU") {
      return "../../assets/img/device_pi.png";
    }
  };
  return (
    <div
      className={`info__card ${inDeleteMode ? "jiggle-card" : ""}`}
      onClick={(e) => {
        if (inDeleteMode) {
          onDelete(e, device.id);
        } else {
          onCopy(device.id);
        }
      }}
    >
      <div className="info__data">
        <img src={deviceSrc(device)} alt="device" className="info__img" />
        <div>
          <p className="info__name">{device.name}</p>
          <p className="info__id">{device.id}</p>
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;
