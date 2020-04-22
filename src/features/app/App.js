import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CreateGame from '../creategame/CreateGame';
import Game from '../game/Game';
import JoinGame from '../joingame/JoinGame';
import {
  setupCreateGame,
  setupJoinGame,
  selectStatus,
} from './appSlice';
import styles from './App.module.css';

function App() {
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();

  if (status === 'init') {
    return (
      <div className={styles.App}>
        <h1>Dice 10000</h1>
        <button onClick={() => dispatch(setupCreateGame())}>
          Create game
        </button>
        <br/><br/>
        <button onClick={() => dispatch(setupJoinGame())}>
          Join game
        </button>
        <br/><br/>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.wikihow.com/Play-10000"
        >
          Rules
        </a>
      </div>
    );
  } else if (status === 'setup-create-game') {
    return <CreateGame />;
  } else if (status === 'setup-join-game') {
    return <JoinGame />;
  } else if (status === 'in-game') {
    return <Game />;
  } else {
    throw new Error(`Unexpected app status ${status}`);
  }
}

export default App;
