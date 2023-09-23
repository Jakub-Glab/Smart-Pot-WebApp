import React from "react";
import Select from "react-select";
import deviceStyles from "./deviceStyles";

const DeviceSelectComponent = ({ options, onChange }) => {
  const deviceSrc = (e) => {
    if (e.type === "ESP") {
      return "../../assets/img/device_esp.png";
    }
    if (e.type === "NODEMCU") {
      return "../../assets/img/device_pi.png";
    }
  };

  return (
    <Select
      options={options}
      styles={deviceStyles}
      onChange={onChange}
      isSearchable={false}
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

export default DeviceSelectComponent;
