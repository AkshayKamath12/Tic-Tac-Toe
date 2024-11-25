import { useState } from "react";
import Player from "./components/Player.js";
import GameBoard from "./components/GameBoard.js";
import Log from "./components/Log.js";
import GameOver from "./components/GameOver.js";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

function deriveActivePlayer(gameTurns) {
  return gameTurns.length > 0 && gameTurns[0].player === "X" ? "O" : "X";
}

const initBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  let currPlayer = deriveActivePlayer(gameTurns);
  let currBoard = initBoard;
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    currBoard[row][col] = player;
  }
  let winner = null;
  let draw = false;
  
  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol = currBoard[combination[0].row][combination[0].column];
    const secondSymbol = currBoard[combination[1].row][combination[1].column];
    const thirdSymbol = currBoard[combination[2].row][combination[2].column];
    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      winner = firstSymbol;
      break;
    }
  }

  if(!winner && gameTurns.length == 9){
    draw = true;
  }

  function handleCurrPlayer(rowInd, colInd) {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowInd, col: colInd }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player 1"
            symbol="X"
            isActive={currPlayer === "X"}
          ></Player>
          <Player
            name="player 2"
            symbol="O"
            isActive={currPlayer === "O"}
          ></Player>
        </ol>
        {winner && <GameOver winner={winner}></GameOver>}
        <GameBoard
          onSelectSquare={handleCurrPlayer}
          turns={gameTurns}
          board={currBoard}
        ></GameBoard>
      </div>
      <Log turns={gameTurns}></Log>
    </main>
  );
}

export default App;
