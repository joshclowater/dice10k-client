import { configureStore } from '@reduxjs/toolkit';
import app from '../features/app/appSlice';
import counter from '../features/counter/counterSlice';
import game from '../features/game/gameSlice'; 

export default configureStore({
  reducer: {
    app,
    counter,
    game
  },
});
