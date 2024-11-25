import { useState } from "react";

export default function Player({ name, symbol, isActive, changeNames }) {
  const [currName, changeName] = useState(name);
  const [editing, setEditing] = useState(false);

  function handleInput(newName) {
    changeName(newName.target.value);
  }
  function handleEditClick() {
    setEditing(() => {
      if (editing) {
        changeNames(symbol, currName);
      }
      return !editing;
    });
  }

  return (
    <>
      <li className={isActive ? "active" : undefined}>
        <span className="player">
          {!editing ? (
            <span className="player-name">{currName}</span>
          ) : (
            <input
              type="text"
              required
              value={currName}
              onChange={handleInput}
            ></input>
          )}
          <span className="player-symbol">{symbol}</span>
        </span>

        <button onClick={handleEditClick}>{editing ? "save" : "edit"}</button>
      </li>
    </>
  );
}
