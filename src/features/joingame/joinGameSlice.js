import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'joingame',
  initialState: {
    joining: false,
    error: undefined
  },
  reducers: {
    joiningGame: state => {
      state.joining = true;
      state.error = undefined;
    },
  },
  extraReducers: {
    'joingame/failedtojoin': (state, { payload: { errorMessage }}) => {
      state.joining = false;
      state.error = errorMessage;
    }
  }
});

export const {
  joiningGame
} = slice.actions;

export const selectJoining = state => state.joingame.joining;
export const selectError = state => state.joingame.error;

export default slice.reducer;
