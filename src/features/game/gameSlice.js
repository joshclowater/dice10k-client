import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'game',
  initialState: {
    status: 'init',
  },
  reducers: {
    // setupCreateGame: state => {
    //   state.status = 'setup-create-game';
    // },
  },
  extraReducers: {
    'game/youjoinedgame': (state, { payload: { gameId, playerName, players } }) => {
      state.status = 'waiting-for-players';
      state.gameId = gameId;
      state.playerName = playerName;
      state.players = players;
      state.log = ['You joined the game.'];
    },
    'game/joinedgame': (state, { payload: { playerName } }) => {
      state.players.push({ name: playerName });
      state.log.push(`${playerName} joined the game`);
    },
    'game/rolleddice': (state, { payload: { playerName, diceRolls }}) => {
      state.diceRolls = diceRolls;
      state.log.push(`${playerName} rolled ${diceRolls.join(', ')}`)
    }
  }
});

export const selectStatus = state => state.game.status;
export const selectGameId = state => state.game.gameId;
export const selectPlayers = state => state.game.players;
export const selectDiceRolls = state => state.game.diceRolls;

export default slice.reducer;
