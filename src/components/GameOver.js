export default function GameOver({ winner, onReset }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner ? <p>{winner} won!</p> : <p>Draw!</p>}

      <p>
        <button onClick={onReset}>Restart</button>
      </p>
    </div>
  );
}
