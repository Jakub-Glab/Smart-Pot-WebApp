import React from "react";

const Tooltip = ({ message, position }) => {
  return (
    <div
      className="tooltip"
      style={{
        position: "absolute",
        top: `${position.y}px`,
        left: `${position.x + 15}px`,
        zIndex: 1000,
      }}
    >
      {message}
    </div>
  );
};

export default Tooltip;
