import React, { useState } from "react";
import restart from "../assets/redo.svg";
import "./Restart.css";

function Restart(props) {
  const [isActive, setActive] = useState("false");

  function handleClick() {
    props.resetScore()
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 400);
  }
  return (
    <div className="restart-icon__box">
      <button onClick={handleClick} className="restart-icon__container">
        <img
          className={`restart-icon ${
            isActive ? "restart-icon--animate" : ""
          }`}
          src={restart}
          alt="restart-button"
        />
      </button>
    </div>
  );
}

export default Restart;
