import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'init',
    socketConnected: false
  },
  reducers: {
    setupCreateGame: state => {
      state.status = 'setup-create-game';
    },
    setupJoinGame: state => {
      state.status = 'setup-join-game';
    },
    socketConnected: state => {
      state.socketConnected = true;
    }
  },
  extraReducers: {
    'game/youjoinedgame': state => {
      state.status = 'in-game';
    }
  }
});

export const {
  setupCreateGame,
  setupJoinGame,
  socketConnected
} = slice.actions;

export const selectStatus = state => state.app.status;

export default slice.reducer;
