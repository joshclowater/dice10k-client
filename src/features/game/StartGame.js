import React, { useState } from 'react';
import { socket } from '../../app/socket';

export default function StartGame() {
  const [starting, setStarting] = useState(false);

  return (
    <button
      disabled={starting}
      onClick={() => {
        setStarting(true);
        socket.send(JSON.stringify({
          message: 'startgame',
        }));
      }}
    >
      {starting ? 'Starting..' : 'Start Game'}
    </button>
  );
}
