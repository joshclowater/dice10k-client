import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../app/socket';
import {
  rollingDice,
  endTurn,
  pickDie,
  selectRollingDice,
  selectEndingTurn,
  selectRollDiceError,
  selectDicePicks,
  selectDicePickValues
} from './gameSlice';
import styles from './Game.module.css';

export default function Actions() {
  const isRollingDice = useSelector(selectRollingDice);
  const endingTurn = useSelector(selectEndingTurn);
  const rollDiceError = useSelector(selectRollDiceError);
  const dicePicks = useSelector(selectDicePicks);
  const dicePickValues = useSelector(selectDicePickValues);
  const dispatch = useDispatch();

  return (
    <Fragment>
      {dicePicks && (
        <div>
          {dicePicks.map((picked, index) => (
            <span
              key={index + 'dicepick'}
              className={styles.DicePick}
              onClick={() => {dispatch(pickDie(index))}}
             >
              <input
                className={styles.DicePickInput}
                type="checkbox"
                checked={picked}
                readOnly
              />
            </span>
          ))}
        </div>
      )}
      <button
        disabled={isRollingDice || endingTurn}
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
      {dicePicks &&
        <button
          className={styles.EndTurn}
          disabled={isRollingDice || endingTurn}
          onClick={() => {
            dispatch(endTurn());
            socket.send(JSON.stringify({
              message: 'rolldice',
              diceKept: dicePickValues,
              endTurn: true
            }));
          }}
        >
          {endingTurn ? 'Ending...' : 'End turn' }
        </button>}
      <div>
        {rollDiceError}
      </div>
    </Fragment>
  );
}
