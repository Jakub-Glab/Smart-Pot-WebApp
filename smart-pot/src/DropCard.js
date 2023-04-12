import React from "react";

const DropCard = React.memo(({ id, imgSrc, name, profession, onClick }) => {
  return (
    <div className="drop__card" id={id} onClick={() => onClick(imgSrc)}>
      <div className="drop__data">
        <img src={imgSrc} alt="" className="drop__img" />
        <div>
          <h1 className="drop__name">{name}</h1>
          <span className="drop__profession">{profession}</span>
        </div>
        <div style={{ float: "right" }}>
          <img
            src="assets/img/temp_down.png"
            alt=""
            style={{ width: 32 + "px", height: 32 + "px", float: "right" }}
          ></img>
          <img
            src="assets/img/sun_ok.png"
            alt=""
            style={{ width: 32 + "px", height: 32 + "px", float: "right" }}
          ></img>
          <img
            src="assets/img/rain_ok.png"
            alt=""
            style={{ width: 32 + "px", height: 32 + "px", float: "right" }}
          ></img>
        </div>
      </div>
    </div>
  );
});

export default DropCard;
