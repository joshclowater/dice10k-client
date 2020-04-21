import React from 'react';
import { useSelector } from 'react-redux';
import { socket } from '../../app/socket';
import {
  selectStatus,
  selectIsYourTurn,
  selectJoiningPlayers,
} from './gameSlice';
import RollDice from './RollDice';

export default function Actions() {
  const status = useSelector(selectStatus);
  const players = useSelector(selectJoiningPlayers);
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
    <div>
      {content}
    </div>
  );
}
