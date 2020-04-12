import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import rollADie from 'roll-a-die';
import { selectDiceRolls } from './gameSlice';
import styles from './Game.module.css';

export default function DiceRolls() {
  const diceRolls = useSelector(selectDiceRolls);

  useEffect(() => {
    if (diceRolls && diceRolls.length) {
      rollADie({
        element: document.getElementById('dice-box'),
        numberOfDice: diceRolls.length,
        delay: 9999999999,
        values: diceRolls,
        callback: () => { } // callback is required, but not used
      });
    }
  }, [diceRolls]);

  return <div id="dice-box" className={styles.DiceBox} />;
}
