import React from 'react';
import { useSelector } from 'react-redux';
import { selectStatus } from './gameSlice';
import Actions from './Actions';
import DiceRolls from './DiceRolls';
import Logs from './Logs';
import Players from './Players';
import Turn from './Turn';
import styles from './Game.module.css';

export default function Game() {
  const status = useSelector(selectStatus);

  return (
    <div className={styles.Game}>
      {status === 'waiting-for-players'
        ? <Players />
        : <Turn />}
      {status === 'in-progress' &&
        <DiceRolls />}
      <Actions />
      <Logs />
    </div>
  );
}
