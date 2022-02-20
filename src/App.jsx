import { useState, useRef } from "react";
import "./App.css";
import CurrentTurn from "./components/CurrentTurn";
import GameArea from "./components/GameArea";
import Icons from "./components/Icons";
import Modal from "./components/Modal";
import Restart from "./components/Restart";
import ScoreCard from "./components/ScoreCard";

function App() {
  const [crossScore, setCrossScore] = useState(0);
  const [tieScore, setTieScore] = useState(0);
  const [knotsScore, setKnotsScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const ChildRef = useRef();

  function resetScore() {
    ChildRef.current.reset();
    setCrossScore(0);
    setTieScore(0);
    setKnotsScore(0);
    setGameOver(false);
  }

  function nextRound() {
    ChildRef.current.reset();
    setGameOver(false);
  }

  return (
    <>
      <main>
        <div className="game__container">
          <div className="instuctions__container">
            <h1>Welcome to my TIC TAC TOE React.js App!</h1>
            <p>
              Rules are pretty self explanitory, you'll be playing against a bot
              and you are "X". On the top right of the game area is a reset
              button to reset the scoreboard. The game area itself is a 9x9 grid
              of buttons. You can click a cell to select your input.
            </p>
            <p className="tips">The bot is pretty smart, so you'll have fun ;)</p>
            <p className="website__text">
              Visit my website{" "}
              <a href="https://www.manishmanwani.com/" target="_blank">
                www.manishmanwani.com
              </a>
              to check out my work and get in touch with me!
            </p>
          </div>
          <div className="game__header">
            <Icons />
            <CurrentTurn currentPlayer={"cross"} />
            <Restart resetScore={resetScore} />
          </div>
          <div className="game__area">
            <GameArea
              setWinner={setWinner}
              ref={ChildRef}
              setGameOver={setGameOver}
              setCrossScore={setCrossScore}
              setTieScore={setTieScore}
              setKnotsScore={setKnotsScore}
            />
          </div>
          <div className="game__score-board">
            <ScoreCard playerScore={crossScore} currentPlayer={"cross"} />
            <ScoreCard playerScore={tieScore} />
            <ScoreCard playerScore={knotsScore} currentPlayer={"knots"} />
          </div>
        </div>
        <Modal
          winner={winner}
          nextRound={nextRound}
          resetScore={resetScore}
          gameOver={gameOver}
        />
      </main>
    </>
  );
}

export default App;
