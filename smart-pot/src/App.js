import React, { useState, useEffect } from "react";
import DropContainer from "./components/MainApp/DropContainer";
import MainPlant from "./components/MainApp/MainPlant";
import usePlantData from "./components/hooks/usePlantData";
import NoAnimations from "./components/Wrappers/NoAnimations";
import spacetime from "spacetime";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "./assets/css/App.css";
import "react-notifications/dist/react-notifications.css";

const App = () => {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const { plants } = usePlantData(); // Using the custom hook

  const checkSensorValues = (plant) => {
    if (!plant) return;

    const notify = (sensor, value, name, tz) => {
      const currentDatetime = spacetime.now(tz);
      const currentHour = currentDatetime.hour();
      const showSunlightTooltip = !(currentHour >= 18 || currentHour < 7);
      let message = "";

      const storageKey = `${sensor}_${name}`;
      const isNotified = sessionStorage.getItem(storageKey);

      if (isNotified) return;

      if (sensor === "temp") {
        if (value < 15)
          message = `Temperature is too low for your plant ${name}`;
        if (value > 45)
          message = `Temperature is too high for your plant ${name}`;
      } else if (sensor === "hum") {
        if (value < 25) message = `You need to water your plant ${name}`;
        if (value > 70)
          message = `Too much moisture, consider draining the soil of your plant ${name}`;
      } else if (sensor === "lux" && showSunlightTooltip) {
        if (value < 200) message = `Your plant ${name} needs more sunlight`;
        if (value > 10000)
          message = `Your plant ${name} is getting too much sunlight`;
      }

      if (message) {
        NotificationManager.warning(message, "", 5000);
        sessionStorage.setItem(storageKey, "true");
      }
    };

    notify("temp", plant.temperature, plant.name, plant.tz);
    notify("hum", plant.humidity, plant.name, plant.tz);
    notify("lux", plant.lux, plant.name, plant.tz);
  };

  useEffect(() => {
    if (selectedPlant) {
      const updatedSelectedPlant = plants.find(
        (plant) => plant.id === selectedPlant.id
      );
      if (updatedSelectedPlant) {
        setSelectedPlant(updatedSelectedPlant);
      }
    }
  }, [plants]);

  useEffect(() => {
    if (!selectedPlant && plants.length > 0) {
      setSelectedPlant(plants[0]);
    }
  });

  useEffect(() => {
    checkSensorValues(selectedPlant);
  }, [selectedPlant]);

  const handleCardClick = (id) => {
    const clickedPlant = plants.find((plant) => plant.id === id);
    if (clickedPlant) {
      setSelectedPlant(clickedPlant);
    }
  };

  return (
    <div className="drop">
      <div
        className="parent-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
        }}
      >
        <MainPlant
          plantCurrent={selectedPlant?.imgsrc}
          temperature={selectedPlant?.temperature}
          humidity={selectedPlant?.humidity}
          lux={selectedPlant?.lux}
        />

        <DropContainer
          onCardClick={handleCardClick}
          plants={plants}
          setSelectedPlant={setSelectedPlant}
        />
        <NoAnimations />
        <NotificationContainer />
      </div>
    </div>
  );
};

export default App;
