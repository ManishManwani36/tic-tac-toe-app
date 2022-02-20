import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import Cell from "./Cell";
import "./GameArea.css";

const defaultCells = () => new Array(9).fill(null);

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const GameArea = forwardRef((props, ref) => {
  const [cells, setCells] = useState(defaultCells());

  useImperativeHandle(ref, () => ({
    reset() {
      setCells(defaultCells());
    },
  }));

  useEffect(() => {
    const emptyIndexes = cells
      .map((cell, index) => (cell === null ? index : null))
      .filter((val) => val !== null);

    if (emptyIndexes.length === 0) {
      props.setWinner("TIE")
      props.setTieScore((prevScore) => prevScore + 1);
      props.setGameOver((prevState) => !prevState);
      return;
    }

    const linesThatAre = (a, b, c) => {
      return lines.filter((cellIndexes) => {
        const cellValues = cellIndexes.map((index) => cells[index]);
        return (
          JSON.stringify([a, b, c].sort()) === JSON.stringify(cellValues.sort())
        );
      });
    };

    const playerWon = linesThatAre("x", "x", "x").length > 0;
    const computerWon = linesThatAre("o", "o", "o").length > 0;
    if (playerWon) {
      props.setWinner("CROSS")
      props.setCrossScore((prevScore) => prevScore + 1);
      props.setGameOver((prevState) => !prevState);
      return;
    }
    if (computerWon) {
      props.setWinner("KNOTS")
      props.setKnotsScore((prevScore) => prevScore + 1);
      props.setGameOver((prevState) => !prevState);
      return;
    }
    const isComputerTurn =
      cells.filter((cell) => cell !== null).length % 2 === 1;

    function putComputerAt(index) {
      let newCells = cells;
      newCells[index] = "o";
      setCells([...newCells]);
    }

    if (isComputerTurn) {
      const winingLines = linesThatAre("o", "o", null);
      if (winingLines.length > 0) {
        const winIndex = winingLines[0].filter(
          (index) => cells[index] === null
        )[0];
        putComputerAt(winIndex);
        return;
      }

      const linesToBlock = linesThatAre("x", "x", null);
      if (linesToBlock.length > 0) {
        const blockIndex = linesToBlock[0].filter(
          (index) => cells[index] === null
        )[0];
        putComputerAt(blockIndex);
        return;
      }

      const linesToContinue = linesThatAre("o", null, null);
      if (linesToContinue.length > 0) {
        putComputerAt(
          linesToContinue[0].filter((index) => cells[index] === null)[0]
        );
        return;
      }

      const randomIndex =
        emptyIndexes[Math.ceil(Math.random() * emptyIndexes.length)];
      putComputerAt(randomIndex);
    }
  }, [cells]);

  function handleCellCilck(index) {
    const isPlayerTurn = cells.filter((cell) => cell !== null).length % 2 === 0;

    if (isPlayerTurn) {
      let newCells = cells;
      if (newCells[index] === null) {
        newCells[index] = "x";
        setCells([...newCells]);
      }
    }
  }

  return (
    <>
      <div className="game-area__container">
        {cells.map((cell, index) => (
          <Cell
            key={index}
            x={cell === "x" ? 1 : 0}
            o={cell === "o" ? 1 : 0}
            onClick={() => handleCellCilck(index)}
          />
        ))}
      </div>
    </>
  );
});

export default GameArea;
