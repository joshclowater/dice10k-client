import { configureStore } from '@reduxjs/toolkit';
import app from '../features/app/appSlice';
import game from '../features/game/gameSlice'; 

export default configureStore({
  reducer: {
    app,
    game
  },
});
