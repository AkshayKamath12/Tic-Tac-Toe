import { useState, useEffect } from "react";
import Player from "./components/Player.js";
import GameBoard from "./components/GameBoard.js";
import Log from "./components/Log.js";
import GameOver from "./components/GameOver.js";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { db } from "./firebase.js";
import { addDoc, collection } from "firebase/firestore";

function deriveActivePlayer(gameTurns) {
  return gameTurns.length > 0 && gameTurns[0].player === "X" ? "O" : "X";
}

const initBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const players = {
  X: "Player 1",
  O: "Player 2",
};

function App() {
  const [username, setUsername] = useState("")
  const [currNames, changeNames] = useState(players);
  const [gameTurns, setGameTurns] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.email);
        setUsername(user.email);
      } else {
        console.log("logged out");
        setUsername(null);
      }
    });

    return () => unsubscribe();
  }, []);
  

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

  function deriveGameBoard(gameTurns) {
    let currBoard = [...initBoard.map((array) => [...array])];
    for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;
      currBoard[row][col] = player;
    }
    return currBoard;
  }

  

  let currPlayer = deriveActivePlayer(gameTurns);
  let currBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(currBoard, currNames);

  const draw = !winner && gameTurns.length === 9;
  

  

  function handleReset() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    changeNames((state) => {
      return {
        ...state,
        [symbol]: newName,
      };
    });
  }

  function deriveWinner(currBoard, currNames) {
    let winner = null;
    for (const combination of WINNING_COMBINATIONS) {
      const firstSymbol = currBoard[combination[0].row][combination[0].column];
      const secondSymbol = currBoard[combination[1].row][combination[1].column];
      const thirdSymbol = currBoard[combination[2].row][combination[2].column];
      if (
        firstSymbol &&
        firstSymbol === secondSymbol &&
        firstSymbol === thirdSymbol
      ) {
        winner = currNames[firstSymbol];
        break;
      }
    }
    if(winner != null){
      const outcomesRef = collection(db, 'outcomes');
      addDoc(outcomesRef, {email: username, winner: winner}).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
      const gameTurnsStrArr = gameTurns.map((gameTurn)=>{
        return gameTurn.player + " moved to (" + gameTurn.square.row.toString() + ", " + gameTurn.square.col.toString() + ")"; 
      })

      const logRef = collection(db, 'gameLogs')
      addDoc(logRef, {email: username, gameLog: gameTurnsStrArr}).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    }
    return winner;
  }

  function handleSignOut(){
    const auth = getAuth();
    signOut(auth).then(()=>{
      console.log("signed out")
    }).catch((err)=>{
      console.log(err);
    })
  }

  return (
    <>
    <header>
      <div className="sign-out">
        <button className="button-77" role="button" onClick={handleSignOut}>Sign Out</button>
      </div>
      <img src="game-logo.png"></img>
      <h1>Tic-Tac-Toe</h1>
    </header>
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={players["X"]}
            symbol="X"
            isActive={currPlayer === "X"}
            changeNames={handlePlayerNameChange}
          ></Player>
          <Player
            name={players["O"]}
            symbol="O"
            isActive={currPlayer === "O"}
            changeNames={handlePlayerNameChange}
          ></Player>
        </ol>
        {(winner || draw) && (
          <GameOver winner={winner} onReset={handleReset}></GameOver>
        )}
        <GameBoard
          onSelectSquare={handleCurrPlayer}
          board={currBoard}
        ></GameBoard>
      </div>
      <Log turns={gameTurns}></Log>
    </main>
    </>
    
  );
}

export default App;
