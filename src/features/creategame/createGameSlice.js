import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'creategame',
  initialState: {
    creating: false,
    error: undefined
  },
  reducers: {
    creatingGame: state => {
      state.creating = true;
      state.error = undefined;
    },
  },
  extraReducers: {
    'creategame/failedtocreate': (state, { payload: { errorMessage }}) => {
      state.creating = false;
      state.error = errorMessage;
    }
  }
});

export const {
  creatingGame
} = slice.actions;

export const selectCreating = state => state.creategame.creating;
export const selectError = state => state.creategame.error;

export default slice.reducer;
