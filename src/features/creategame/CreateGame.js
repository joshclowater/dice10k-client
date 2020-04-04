import React, { useState } from 'react';
import { socket } from '../../app/socket';

export default function CreateGame() {
  const [name, setName] = useState('');
  const [creatingGame, setCreatingGame] = useState(false);

  return (
    <div>
      <h1>Create Game</h1>
      <input
        placeholder="Your name"
        value={name}
        disabled={creatingGame}
        onChange={e => setName(e.target.value)}
      />
      <br/><br/>
      <button
        disabled={!name || creatingGame}
        onClick={() => {
          setCreatingGame(true);
          socket.send(JSON.stringify({
            message: 'creategame',
            name
          }));
        }}
      >
        {creatingGame ? 'Creating...' : 'Create'}
      </button>
    </div>
  );
}
