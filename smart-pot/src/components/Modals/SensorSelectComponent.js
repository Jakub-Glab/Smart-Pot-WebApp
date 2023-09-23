import React from "react";
import Select from "react-select";
import componentStyles from "./componentStyles";

const SensorSelectComponent = ({ options, onChange }) => {
  const deviceSrc = (e) => {
    if (e.value === "lux") {
      return "../../assets/img/sun.png";
    }
    if (e.value === "hum") {
      return "../../assets/img/rain.png";
    }
    if (e.value === "temp") {
      return "../../assets/img/temp.png";
    }
  };

  return (
    <Select
      options={options}
      styles={componentStyles}
      onChange={onChange}
      placeholder="Select device"
      components={{
        IndicatorSeparator: () => null,
      }}
      getOptionLabel={(e) => (
        <div className="info__data">
          <img src={deviceSrc(e)} alt="img" className="info__img_small" />
          <div>
            <p className="info__name">{e.name}</p>
          </div>
        </div>
      )}
    />
  );
};

export default SensorSelectComponent;
