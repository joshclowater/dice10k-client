import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  selectRound,
  selectPlayers,
  selectPlayersTurn,
  selectScoredThisTurnSoFar
} from './gameSlice';
import styles from './Game.module.css';

export default function Turn() {
  const round = useSelector(selectRound);
  const players = useSelector(selectPlayers);
  const playersTurn = useSelector(selectPlayersTurn);
  const scoredThisTurnSoFar = useSelector(selectScoredThisTurnSoFar);

  const tableContainer = useRef(null);
  const scrollToEnd = () => {
    tableContainer.current.scrollLeft = tableContainer.current.scrollWidth;
  };
  useEffect(scrollToEnd, [round]);

  return (
    <div className={styles.TableContainer} ref={tableContainer}>
      <table className={styles.Table}>
        <thead>
          <tr>
            <td className={styles.LeftFloat}></td>
            {[...Array(round)].map((x, i) => <td key={'round' + i}>{i + 1}</td>)}
            <td className={styles.RightFloat}>Total</td>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr key={'player' + player.name}>
              <td className={styles.LeftFloat}>
                {player.name === playersTurn
                  ? <b>{player.name}</b>
                  : player.name}
              </td>
              {[...Array(round)].map((x, i) => {
                let roundScore;
                if (player.scores.length >= i + 1) {
                  roundScore = player.scores[i];
                } else if (round === i + 1 && player.name === playersTurn) {
                  roundScore = <i>{scoredThisTurnSoFar}</i>
                }
                return (
                  <td key={'player' + player.name + 'round' + i}>
                    {roundScore}
                  </td>
                );
              })}
              <td className={styles.RightFloat}>
                {player.totalScore}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
