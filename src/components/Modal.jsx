import React from "react";
import "./Modal.css";
import cross from "../assets/cross.svg"
import knots from "../assets/knots.svg"
import tie from "../assets/tie.svg"

function Modal(props) {
    let winnerText = "TIE"
    let roundTaker = "TRY AGAIN!"
    let winnerTeam = tie;
    let winnerColor = "#ABBECA";
  if (props.winner === "CROSS") {
    winnerText = "YOU WIN!"
    roundTaker = "TAKES THIS ROUND"
    winnerTeam = cross
    winnerColor = "#5BC5BE"
  }
  if (props.winner === "KNOTS") {
    winnerText = "COMPUTER WON, BETTER LUCK NEXT TIME"
    roundTaker = "TAKES THIS ROUND"
    winnerTeam = knots
    winnerColor = "#EAB326"
  }
  return (
    <div className={`modal__box ${props.gameOver && "modal--visible"}`}>
      <div className="modal__container">
        <p className="modal__title">{winnerText}</p>
        <div className="modal__round-info" style={{color: winnerColor}}>
            <img className="winner__image" src={winnerTeam} alt="winner" />{roundTaker}</div>
        <div className="modal__buttons">
          <button onClick={() => props.resetScore()} className="modal__restart">RESET SCORE</button>
          <button onClick={() => props.nextRound()} className="modal__next-round">NEXT ROUND</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
