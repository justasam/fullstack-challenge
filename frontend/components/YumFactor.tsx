import React from "react";

const YumFactor = ({ yumFactor, increaseYum, decreaseYum }) => (
  <div className="yum_factor">
    <button onClick={decreaseYum}>-</button>
    <div
      style={{
        borderWidth: yumFactor
      }}
    >
      {yumFactor}
    </div>
    <button onClick={increaseYum}>+</button>
  </div>
);

export default YumFactor;
