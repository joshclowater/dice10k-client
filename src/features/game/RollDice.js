import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../app/socket';
import {
  rollingDice,
  pickDie,
  selectRollingDice,
  selectRollDiceError,
  selectDicePicks,
  selectDicePickValues
} from './gameSlice';
import styles from './Game.module.css';

export default function Actions() {
  const isRollingDice = useSelector(selectRollingDice);
  const rollDiceError = useSelector(selectRollDiceError);
  const dicePicks = useSelector(selectDicePicks);
  const dicePickValues = useSelector(selectDicePickValues);
  const dispatch = useDispatch();

  return (
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
        disabled={isRollingDice}
        onClick={() => {
          dispatch(rollingDice());
          socket.send(JSON.stringify({
            message: 'rolldice',
            diceKept: dicePickValues
          }));
        }}
      >
        {isRollingDice ? 'Rolling...' : 'Roll dice' }
      </button>
      <div>
        {rollDiceError}
      </div>
    </Fragment>
  );
}
