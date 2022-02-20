import React from 'react'
import "./ScoreCard.css";

function ScoreCard(props) {

  let currentTurn = "TIES";
  let currentTurnColor = "#ABBECA";
  if (props.currentPlayer === "knots") {
    currentTurn = "O (CPU)";
    currentTurnColor = "#EAB326";
  } else if (props.currentPlayer === "cross") {
    currentTurn = "X (YOU)";
    currentTurnColor = "#5BC5BE";
  }

  return (
    <div className="score-crad__container" style={{backgroundColor: currentTurnColor}}>
      <p>{currentTurn}</p>
      <p className="score-card__number">{props.playerScore}</p>
    </div>
  )
}

export default ScoreCard