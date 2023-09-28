import React from "react";
import Select from "react-select";
import deviceStyles from "./deviceStyles";

const PlantSelectComponent = ({ options, onChange, placeholder, value }) => {
  return (
    <Select
      options={options}
      styles={deviceStyles}
      onChange={onChange}
      isSearchable={false}
      placeholder={placeholder}
      value={value}
      components={{
        IndicatorSeparator: () => null,
      }}
      getOptionLabel={(e) => (
        <div className="info__data">
          <img src={e.imgsrc} alt="img" className="info__img_small" />
          <div>
            <p className="info__name">{e.name}</p>
          </div>
        </div>
      )}
    />
  );
};

export default PlantSelectComponent;
