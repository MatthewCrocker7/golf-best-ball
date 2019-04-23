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
    const otherPlayers = state.players.filter(x => (x.name !== action.payload.value.name));

    /*
    return Object.assign({}, state, {
      players: [...otherPlayers, {}]
    })
    */
  }
  return state;
};

export default rootReducer;
