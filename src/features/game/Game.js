import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import rollADie from 'roll-a-die';
import { socket } from '../../app/socket';
import {
  selectGameId,
  selectPlayers,
  selectDiceRolls
} from './gameSlice';
import styles from './Game.module.css';

export default function Game() {
  const gameId = useSelector(selectGameId);
  const players = useSelector(selectPlayers);
  const diceRolls = useSelector(selectDiceRolls);

  useEffect(() => {
    if (diceRolls) {
      rollADie({
        element: document.getElementById('dice-box'),
        numberOfDice: diceRolls.length,
        delay: 9999999999,
        values: diceRolls,
        callback: () => { } // callback is required, but not used
      });
    }
  }, [diceRolls]);

  return (
    <div>
      <h1>Game ID: <i>{gameId}</i></h1>
      <h2>Players</h2>
      {players.map(player => (<div key={player.name}>{player.name}</div>))}
      <br/><br/>
      <div id="dice-box" className={styles.DiceBox} />
      <button
        onClick={() => {
          socket.send(JSON.stringify({
            message: 'rolldice',
          }));
        }}
      >
        Roll dice
      </button>
    </div>
  );
}
