import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'game',
  initialState: {
    status: 'init',
    rollingDice: false,
    endingTurn: false
  },
  reducers: {
    pickDie: (state, { payload: index }) => {
      state.dicePicks[index] = !state.dicePicks[index];
    },
    rollingDice: state => {
      state.rollingDice = true;
    },
    endTurn: state => {
      state.endingTurn = true;
    },
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
      state.log.push(`It is ${playersTurn}'s turn.`);
    },
    'game/rolleddice': (state, { payload: { playerName, playerDiceKept, diceRolls }}) => {
      state.diceRolls = diceRolls;
      if (playerName === state.playerName) {
        state.rollingDice = false;
        delete state.rollDiceError;
        state.dicePicks = [];
        for (let i = 0; i < diceRolls.length; i++) {
          state.dicePicks.push(false);
        }
      }
      if (playerDiceKept && playerDiceKept.length) {
        state.log.push(`${playerName} kept ${playerDiceKept.join(', ')}.`)
      }
      state.log.push(`${playerName} rolled ${diceRolls.join(', ')}.`);
    },
    'game/failedtorolldice': (state, { payload: { errorMessage } }) => {
      state.rollingDice = false;
      state.endingTurn = false;
      state.rollDiceError = errorMessage;
    },
    'game/endturn': (state, { payload: { playerName, playerDiceKept, diceRolls, round, nextPlayerTurn, crapout }}) => {
      state.diceRolls = diceRolls;
      state.round = round;
      state.playersTurn = nextPlayerTurn;
      if (playerName === state.playerName) {
        state.rollingDice = false;
        state.endingTurn = false;
        delete state.rollDiceError;
        delete state.dicePicks;
      }
      state.log.push(`${playerName} kept ${playerDiceKept.join(', ')}.`);
      if (crapout) {
        state.log.push(`${playerName} rolled ${diceRolls.join(', ')}.`);
        state.log.push(`${playerName} crapped out.`);
      } else {
        state.log.push(`${playerName} ended their turn.`);
      }
      state.log.push(`It is ${nextPlayerTurn}'s turn.`);
    }
  }
});

export const {
  pickDie,
  rollingDice,
  endTurn
} = slice.actions;

export const selectStatus = state => state.game.status;
export const selectGameId = state => state.game.gameId;
export const selectPlayers = state => state.game.players;
export const selectRollingDice = state => state.game.rollingDice;
export const selectEndingTurn = state => state.game.endingTurn;
export const selectRollDiceError = state => state.game.rollDiceError;
export const selectDiceRolls = state => state.game.diceRolls;
export const selectDicePicks = state => state.game.dicePicks;
export const selectDicePickValues = state => {
  return selectDicePicks(state) && selectDicePicks(state).reduce((pickValues, indexPicked, index) => {
    if (indexPicked) {
      pickValues.push(selectDiceRolls(state)[index]);
    }
    return pickValues;
  }, []);
}
export const selectRound = state => state.game.round;
export const selectPlayersTurn = state => state.game.playersTurn;
export const selectIsYourTurn = state => state.game.playersTurn === state.game.playerName;
export const selectLogs = state => state.game.log;

export default slice.reducer;
