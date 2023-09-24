import React from "react";
import TimezoneSelect, { allTimezones } from "react-timezone-select";
import timezoneStyles from "./timezoneStyles";

const TimezoneSelectComponent = ({
  value,
  onChange,
  onMenuOpen,
  onMenuClose,
}) => {
  return (
    <TimezoneSelect
      value={value}
      onChange={onChange}
      labelStyle="oryginal"
      styles={timezoneStyles}
      timezones={{ ...allTimezones }}
      onMenuOpen={onMenuOpen}
      onMenuClose={onMenuClose}
      isSearchable={false}
      placeholder="Select timezone"
      components={{
        IndicatorSeparator: () => null,
      }}
    />
  );
};

export default TimezoneSelectComponent;
