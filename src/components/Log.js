export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turnObj) => (
        <li key={`${turnObj.square.row} ${turnObj.square.col}`}>
          {turnObj.player} selected {turnObj.square.row},{turnObj.square.col}
        </li>
      ))}
    </ol>
  );
}
