import React from "react";

const MainPlant = ({ plantCurrent }) => {
  return (
    <div className="drop__background">
      <img
        src={plantCurrent}
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
      <br />
      <br />
      <div className="card">
        <img
          src="assets/img/temp.png"
          style={{ width: "32px", height: "32px" }}
          alt=""
        />
      </div>
      <br />
      <div className="card">
        <img
          src="assets/img/sun.png"
          style={{ width: "32px", height: "32px" }}
          alt=""
        />
      </div>
      <br />
      <div className="card">
        <img
          src="assets/img/rain.png"
          style={{ width: "32px", height: "32px" }}
          alt=""
        />
      </div>
      <br />
    </div>
  );
};

export default MainPlant;
