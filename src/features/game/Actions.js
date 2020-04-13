import React from 'react';
import { useSelector } from 'react-redux';
import { socket } from '../../app/socket';
import {
  selectStatus,
  selectPlayers,
  selectIsYourTurn,
} from './gameSlice';
import RollDice from './RollDice';
import styles from './Game.module.css';

export default function Actions() {
  const status = useSelector(selectStatus);
  const players = useSelector(selectPlayers);
  const isYourTurn = useSelector(selectIsYourTurn);

  let content;
  if (status === 'waiting-for-players' && players.length >= 2) {
    content = (
      <button
        onClick={() => {
          socket.send(JSON.stringify({
            message: 'startgame',
          }));
        }}
      >
        Start Game
      </button>
    );
  } else if (status === 'in-progress' && isYourTurn) {
    content = <RollDice />;
  }
  return (
    <div className={styles.Actions}>
      {content}
    </div>
  );
}
