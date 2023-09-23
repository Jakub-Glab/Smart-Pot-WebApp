import React from "react";
import Select from "react-select";
import plantStyles from "./plantStyles";

const DeviceSelectComponent = ({ options }) => {
  return (
    <Select
      options={options}
      isSearchable={false}
      styles={plantStyles}
      getOptionLabel={(e) => (
        <div className="info__data">
          <img src={e.imgsrc} alt="plant" className="info__img_small" />
          <div>
            <p className="info__name">{e.name}</p>
          </div>
        </div>
      )}
    />
  );
};

export default DeviceSelectComponent;
