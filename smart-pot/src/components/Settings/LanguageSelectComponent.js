import React from "react";
import Select from "react-select";
import languageStyles from "./languageStyles";

const LanguageSelectComponent = ({
  defaultValue,
  options,
  onMenuClose,
  onMenuOpen,
}) => {
  return (
    <Select
      options={options}
      defaultValue={defaultValue}
      styles={languageStyles}
      onMenuOpen={onMenuOpen}
      isSearchable={false}
      onMenuClose={onMenuClose}
      components={{
        IndicatorSeparator: () => null,
      }}
      getOptionLabel={(e) => (
        <div style={{ alignItems: "center" }}>
          {e.flagPath && (
            <img
              src={e.flagPath}
              alt={e.label}
              style={{ width: 20, marginRight: 5 }}
            />
          )}
          <span style={{ marginLeft: 5 }}>{e.label}</span>
        </div>
      )}
    />
  );
};

export default LanguageSelectComponent;
