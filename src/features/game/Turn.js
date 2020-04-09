import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectStatus,
  selectRound,
  selectPlayersTurn
} from './gameSlice';

export default function Turn() {
  const status = useSelector(selectStatus);
  const round = useSelector(selectRound);
  const playersTurn = useSelector(selectPlayersTurn)

  if (status === 'in-progress') {
    return (
      <div>
        <h2>Round: {round}</h2>
        <h2>Turn: {playersTurn}</h2>
      </div>
    );
  } else {
    return null;
  }
}
