import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import {
  selectGameId,
  selectPlayers,
} from './gameSlice';

export default function Game() {
  const gameId = useSelector(selectGameId);
  const players = useSelector(selectPlayers);

  return (
    <Fragment>
      <h1>Game ID: <i>{gameId}</i></h1>
      <h2>Players</h2>
      {players.map(player => (<div key={player.name}>{player.name}</div>))}
      <br/><br/>
    </Fragment>
  );
}
