import { configureStore } from '@reduxjs/toolkit';
import app from '../features/app/appSlice';
import game from '../features/game/gameSlice'; 
import joingame from '../features/joingame/joinGameSlice';

export default configureStore({
  reducer: {
    app,
    game,
    joingame
  },
});
