import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import {
  selectGameId,
  selectJoiningPlayers,
} from './gameSlice';

export default function Game() {
  const gameId = useSelector(selectGameId);
  const players = useSelector(selectJoiningPlayers);

  return (
    <Fragment>
      <h1>Game ID: <i>{gameId}</i></h1>
      <h2>Players</h2>
      {players.map(player => (<div key={player}>{player}</div>))}
      <br/><br/>
    </Fragment>
  );
}
