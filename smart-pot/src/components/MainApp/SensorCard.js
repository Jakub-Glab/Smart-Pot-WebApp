import React, { useState, useEffect, useContext } from "react";
import spacetime from "spacetime";
import TimezoneContext from "../Context/TimezoneContext";

const getSensorImage = (sensor, value, tz) => {
  const currentDatetime = spacetime.now(tz); // Using the timezone from your Settings component
  const currentHour = currentDatetime.hour();
  const moonImg = currentHour >= 22 || currentHour < 5;
  if (sensor === "temp") {
    if (value < 15) return "assets/img/temp_down.png";
    if (value > 45) return "assets/img/temp_up.png";
    return "assets/img/temp_ok.png";
  } else if (sensor === "hum") {
    if (value < 25) return "assets/img/rain_down.png";
    if (value > 70) return "assets/img/rain_up.png";
    return "assets/img/rain_ok.png";
  } else if (sensor === "lux") {
    if (value < 200 && !moonImg) return "assets/img/sun_down.png";
    if (value > 10000) return "assets/img/sun_up.png";
    if (moonImg) return "assets/img/moon.png";
    return "assets/img/sun_ok.png";
  }
};

const isSensorValueNotOk = (sensor, value, tz) => {
  const currentDatetime = spacetime.now(tz); // Using the timezone from your Settings component
  const currentHour = currentDatetime.hour();
  const showSunlightTooltip = !(currentHour >= 18 || currentHour < 7);
  if (sensor === "temp" && (value < 15 || value > 45)) return true;
  if (sensor === "hum" && (value < 25 || value > 70)) return true;
  if (sensor === "lux" && showSunlightTooltip && (value < 200 || value > 10000))
    return true;
  return false;
};

const getTooltipMessage = (sensor, value) => {
  let message = "";
  if (sensor === "temp") {
    if (value < 15) message = "Temperature is too low for your plant";
    if (value > 45) message = "Temperature is too high for your plant";
  } else if (sensor === "hum") {
    if (value < 25) message = "You need to water your plant";
    if (value > 70) message = "Too much moisture, consider draining the soil";
  } else if (sensor === "lux") {
    if (value < 200) message = "Your plant needs more sunlight";
    if (value > 10000) message = "Your plant is getting too much sunlight";
  }
  return message;
};

const SensorCard = ({ sensor, value, unit }) => {
  const [isNotOk, setIsNotOk] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { tz, setTz } = useContext(TimezoneContext);

  useEffect(() => {
    const savedTz = localStorage.getItem("timezone");
    console.log("Saved tz: ", savedTz);
    if (savedTz) {
      setTz(savedTz);
    }
    setIsNotOk(isSensorValueNotOk(sensor, value, tz));
  }, [sensor, value, tz]);

  return (
    <div
      className={`card ${isNotOk ? "jiggle-sensord-card" : ""}`}
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        position: "relative", // To position tooltip
      }}
      onMouseEnter={() => {
        if (isNotOk) {
          setShowTooltip(true);
        }
      }}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && (
        <div
          className="tooltip"
          style={{
            position: "absolute",
            padding: "5px",
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            borderRadius: "3px",
            zIndex: 1,
          }}
        >
          {getTooltipMessage(sensor, value)}
        </div>
      )}
      <img
        className={`${sensor}Img`}
        src={getSensorImage(sensor, value, tz)}
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
