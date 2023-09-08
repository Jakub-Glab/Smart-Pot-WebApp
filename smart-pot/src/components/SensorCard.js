import React, { useState, useEffect } from "react";

const getSensorImage = (sensor, value) => {
  if (sensor === "temp") {
    if (value < 15) return "assets/img/temp_down.png";
    if (value > 45) return "assets/img/temp_up.png";
    return "assets/img/temp_ok.png";
  } else if (sensor === "hum") {
    if (value < 25) return "assets/img/rain_down.png";
    if (value > 70) return "assets/img/rain_up.png";
    return "assets/img/rain_ok.png";
  } else if (sensor === "lux") {
    if (value < 200) return "assets/img/sun_down.png";
    if (value > 10000) return "assets/img/sun_up.png";
    return "assets/img/sun_ok.png";
  }
};

const isSensorValueNotOk = (sensor, value) => {
  if (sensor === "temp" && (value < 15 || value > 45)) return true;
  if (sensor === "hum" && (value < 25 || value > 70)) return true;
  if (sensor === "lux" && (value < 200 || value > 10000)) return true;
  return false;
};

const SensorCard = ({ sensor, value, unit }) => {
  const [isNotOk, setIsNotOk] = useState(false);

  useEffect(() => {
    setIsNotOk(isSensorValueNotOk(sensor, value));
  }, [sensor, value]);

  return (
    <div
      className={`card ${isNotOk ? "jigglele" : ""}`}
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {console.log(isNotOk)}
      <img
        className={`${sensor}Img`}
        src={getSensorImage(sensor, value)}
        style={{ width: "32px", height: "32px" }}
        alt=""
      />
      <span className={sensor} style={{ marginLeft: "auto" }}>
        {value}
        {unit}
      </span>
    </div>
  );
};

export default SensorCard;
