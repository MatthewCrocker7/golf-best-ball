import {
  UPDATE_NAV,
  UPDATE_SELECTED,
  DRAFT_GOLFER
} from '../constants/action-types';

const initState = {
  nav: 0,
  selectedGolfer: '',
  players: [
    { name: 'Matthew', golfers: [] },
    { name: 'Dentyn', golfers: [] },
    { name: 'Jonathan', golfers: [] },
    { name: 'Drew', golfers: [] },
  ],
};

const rootReducer = (state = initState, action) => {
  if (action.type === UPDATE_NAV) {
    return Object.assign({}, state, {
      nav: action.payload.value
    });
  }
  if (action.type === UPDATE_SELECTED) {
    return Object.assign({}, state, {
      selectedGolfer: action.payload.value
    });
  }
  if (action.type === DRAFT_GOLFER) {
    const oldPlayers = state.players.filter(x => x.name !== action.payload.name);
    const newPlayer = state.players.filter(x => x.name === action.payload.name)[0];
    newPlayer.golfers.push(action.payload.golfer);
    const testObj = Object.assign({}, state, {
      players: [
        ...oldPlayers,
        newPlayer
      ]
    });
    //...selectingPlayer, golfers: [...selectingPlayer.golfers, selectedGolfer]
    console.log(testObj);

    return Object.assign({}, state);
  }

  return state;
};

export default rootReducer;
