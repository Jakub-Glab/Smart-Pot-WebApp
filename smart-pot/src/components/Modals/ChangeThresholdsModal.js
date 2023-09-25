import React, { useState } from "react";
import SensorSelectComponent from "./SensorSelectComponent";
import { useTranslation } from "react-i18next";
import "../../i18n/i18n";

import "../../assets/css/Test.css";

const ChangeThresholdsModal = ({ show, onClose, onSubmit }) => {
  const [sensor, setSensor] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const { t, i18n } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      sensor,
      min_value: minValue,
      max_value: maxValue,
    });
  };

  const handleSensorChange = (e) => {
    setSensor(e.value);
  };

  const handleMinValueChange = (e) => {
    const value = e.value;
    if (sensor === "lux" && value < 0) return;
    if (sensor === "hum" && (value < 0 || value > 100)) return;
    setMinValue(value);
  };

  const handleMaxValueChange = (e) => {
    const value = e.value;
    if (sensor === "hum" && value > 100) return;
    setMaxValue(value);
  };

  const getUnit = () => {
    switch (sensor) {
      case "lux":
        return "lx";
      case "hum":
        return "%";
      case "temp":
        return "°C";
      default:
        return "";
    }
  };

  if (!show) {
    return null;
  }

  const types = [
    { value: "lux", name: "Light sensor" },
    { value: "hum", name: "Soil humidity sensor" },
    { value: "temp", name: "Temperature sensor" },
  ];

  return (
    <div className={`form${show ? " block-interaction" : ""}`}>
      <header>{t("Settings.ThresholdForm.title")}</header>
      <form onSubmit={handleSubmit}>
        <br />
        <SensorSelectComponent
          options={types}
          onChange={handleSensorChange}
          isSearchable={false}
          placeholder={t("Settings.ThresholdForm.selectSensor")}
        />
        <div className="input-wrapper">
          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder={t("Settings.ThresholdForm.enterMax")}
            value={maxValue}
            onChange={handleMaxValueChange}
            required
          />
          <span className="input-unit">{getUnit()}</span>
        </div>
        <div className="input-wrapper">
          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder={t("Settings.ThresholdForm.enterMin")}
            value={minValue}
            onChange={handleMinValueChange}
            required
          />
          <span className="input-unit">{getUnit()}</span>
        </div>
        <div></div>
        <input
          type="submit"
          className="button"
          value={t("Settings.ThresholdForm.save")}
        />
      </form>
      <input
        type="button"
        className="button"
        onClick={onClose}
        value={t("Settings.ThresholdForm.close")}
      />
    </div>
  );
};

export default ChangeThresholdsModal;
