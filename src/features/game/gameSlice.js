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
    'game/gamestarted': (state, { payload: { round, playersTurn } }) => {
      state.status = 'in-progress';
      state.round = round;
      state.playersTurn = playersTurn;
      state.log.push('Game started.');
      state.log.push(`It is ${playersTurn} turn.`);
    },
    'game/rolleddice': (state, { payload: { playerName, diceRolls, round, nextPlayerTurn }}) => {
      state.diceRolls = diceRolls;
      state.round = round;
      state.playersTurn = nextPlayerTurn;
      state.log.push(`${playerName} rolled ${diceRolls.join(', ')}.`);
      state.log.push(`Is ${nextPlayerTurn} turn.`);
    }
  }
});

export const selectStatus = state => state.game.status;
export const selectGameId = state => state.game.gameId;
export const selectPlayers = state => state.game.players;
export const selectDiceRolls = state => state.game.diceRolls;
export const selectRound = state => state.game.round;
export const selectPlayersTurn = state => state.game.playersTurn;
export const selectIsYourTurn = state => state.game.playersTurn === state.game.playerName;
export const selectLogs = state => state.game.log;

export default slice.reducer;
