import React, { useState } from 'react';
import { socket } from '../../app/socket';

export default function JoinGame() {
  const [gameId, setGameId] = useState('');
  const [name, setName] = useState('');
  const [joiningGame, setJoiningGame] = useState(false);

  return (
    <div>
      <h1>Join Game</h1>
      <input
        placeholder="Game ID"
        value={gameId}
        disabled={joiningGame}
        onChange={e => setGameId(e.target.value)}
      />
      <br/><br/>
      <input
        placeholder="Your name"
        value={name}
        disabled={joiningGame}
        onChange={e => setName(e.target.value)}
      />
      <br/><br/>
      <button
        disabled={!name || !gameId || joiningGame}
        onClick={() => {
          setJoiningGame(true);
          socket.send(JSON.stringify({
            message: 'joingame',
            gameId,
            name
          }));
        }}
      >
        {joiningGame ? 'Joining...' : 'Join'}
      </button>
    </div>
  );
}
