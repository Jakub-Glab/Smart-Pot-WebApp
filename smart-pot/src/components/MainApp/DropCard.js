import React from "react";

const DropCard = React.memo(({ id, imgSrc, name, onClick }) => {
  return (
    <div className="drop__card" id={id} onClick={() => onClick(imgSrc)}>
      <div className="drop__data">
        <img src={imgSrc} alt="" className="drop__img" />
        <div>
          <h1 className="drop__name">{name}</h1>
        </div>
        <div className="sensors__card">
          <img
            className="temp"
            src="assets/img/temp.png"
            alt=""
            style={{ width: 32 + "px", height: 32 + "px", float: "right" }}
          ></img>
          <img
            className="sun"
            src="assets/img/sun.png"
            alt=""
            style={{ width: 32 + "px", height: 32 + "px", float: "right" }}
          ></img>
          <img
            className="rain"
            src="assets/img/rain.png"
            alt=""
            style={{ width: 32 + "px", height: 32 + "px", float: "right" }}
          ></img>
        </div>
      </div>
    </div>
  );
});

export default DropCard;
