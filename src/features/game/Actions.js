import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../app/socket';
import {
  pickDie,
  selectStatus,
  selectPlayers,
  selectIsYourTurn,
  selectDicePicks,
  selectDicePickValues
} from './gameSlice';
import styles from './Game.module.css';

export default function Actions() {
  const status = useSelector(selectStatus);
  const players = useSelector(selectPlayers);
  const isYourTurn = useSelector(selectIsYourTurn);
  const dicePicks = useSelector(selectDicePicks);
  const dicePickValues = useSelector(selectDicePickValues);
  const dispatch = useDispatch();

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
    content = (
      <Fragment>
        {dicePicks && (
          <div className={styles.DicePickContainer}>
            {dicePicks.map((picked, index) =>
              <input
                className={styles.DicePick}
                key={index}
                type="checkbox"
                checked={picked}
                onChange={() => {dispatch(pickDie(index))}}
              />
            )}
          </div>
        )}
        <button
          onClick={() => {
            socket.send(JSON.stringify({
              message: 'rolldice',
              diceKept: dicePickValues
            }));
          }}
        >
          Roll dice
        </button>
      </Fragment>
    );
  }
  return (
    <div className={styles.Actions}>
      {content}
    </div>
  );
}
