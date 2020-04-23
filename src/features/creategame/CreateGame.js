import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { socket } from '../../app/socket';
import { cancel } from '../app/appSlice';
import {
  selectCreating,
  selectError,
  creatingGame,
} from './createGameSlice';

export default function CreateGame() {
  const creating = useSelector(selectCreating);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const [name, setName] = useState('');

  return (
    <div>
      <h1>Create Game</h1>
      <input
        placeholder="Your name"
        value={name}
        disabled={creating}
        onChange={e => setName(e.target.value)}
      />
      <br/><br/>
      <button
        disabled={!name || creating}
        onClick={() => {
          dispatch(creatingGame());
          socket.send(JSON.stringify({
            message: 'creategame',
            name
          }));
        }}
      >
        {creating ? 'Creating...' : 'Create'}
      </button>
      <div>
        {error}
      </div>
      <br />
      <button
        disabled={creating}
        onClick={() => {
          dispatch(cancel());
        }}
      >
        Cancel
      </button>
    </div>
  );
}
