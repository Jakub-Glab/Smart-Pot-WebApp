import React from "react";

const CurrentPlantImage = ({ src }) => {
  return (
    <img
      src={src}
      alt=""
      className="drop__img"
      style={{
        position: "absolute",
        width: "330px",
        height: "330px",
        borderRadius: "50%",
        right: "12rem",
        top: "-0.25rem",
        boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.15)",
      }}
    />
  );
};

export default CurrentPlantImage;
