import React from "react";
import "./CurrentTurn.css";
import cross from "../assets/crossGrey.svg";
import knots from "../assets/knotsGrey.svg";

function CurrentTurn(props) {
  let currentTurnImg = cross;
  let altText;
  if (props.currentPlayer === "knots") {
    currentTurnImg = knots;
    altText = "knots";
  } else {
    currentTurnImg = cross;
    altText = "cross";
  }

  return (
    <div className="current-turn__container">
      <div className="current-player__icon__container">
        <img
          className="current-player__icon"
          src={currentTurnImg}
          alt={altText}
        />
      </div>
      <p>TURN</p>
    </div>
  );
}

export default CurrentTurn;
