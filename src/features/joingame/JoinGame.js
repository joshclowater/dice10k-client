import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { socket } from '../../app/socket';
import {
  selectJoining,
  selectError,
  joiningGame,
} from './joinGameSlice';

export default function JoinGame() {
  const joining = useSelector(selectJoining);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const [gameId, setGameId] = useState('');
  const [name, setName] = useState('');

  return (
    <div>
      <h1>Join Game</h1>
      <input
        placeholder="Game ID"
        value={gameId}
        disabled={joining}
        onChange={e => setGameId(e.target.value)}
      />
      <br/><br/>
      <input
        placeholder="Your name"
        value={name}
        disabled={joining}
        onChange={e => setName(e.target.value)}
      />
      <br/><br/>
      <button
        disabled={!name || !gameId || joining}
        onClick={() => {
          dispatch(joiningGame());
          socket.send(JSON.stringify({
            message: 'joingame',
            gameId,
            name
          }));
        }}
      >
        {joining ? 'Joining...' : 'Join'}
      </button>
      <div>
        {error}
      </div>
    </div>
  );
}
