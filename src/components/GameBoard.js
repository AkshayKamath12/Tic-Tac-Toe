export default function GameBoard({ onSelectSquare, board }) {
  return (
    <ol id="game-board">
      {board.map((row, rowInd) => (
        <li key={rowInd}>
          <ol>
            {row.map((playerSymbol, colInd) => (
              <button
                onClick={() => onSelectSquare(rowInd, colInd)}
                disabled={playerSymbol != null}
              >
                {playerSymbol}
              </button>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
