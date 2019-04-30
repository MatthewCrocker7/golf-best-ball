import {
  UPDATE_NAV,
  UPDATE_SELECTED,
  UPDATE_DRAFT,
  DRAFT_GOLFER,
  SET_DRAFT_BOARD
} from '../constants/action-types';

const initState = {
  nav: 0,
  selectedGolfer: {
    name: '',
    rank: -1
  },
  players: [
    { name: 'Matthew', golfers: [] },
    { name: 'Dentyn', golfers: [] },
    { name: 'Jonathan', golfers: [] },
    { name: 'Drew', golfers: [] },
  ],
  draft: {
    index: 0,
    snakeUp: true
  },
  draftBoard: []
};

const rootReducer = (state = initState, action) => {
  if (action.type === UPDATE_NAV) {
    return Object.assign({}, state, {
      nav: action.payload.value
    });
  }
  if (action.type === UPDATE_SELECTED) {
    return Object.assign({}, state, {
      selectedGolfer: {
        name: action.payload.name,
        rank: action.payload.rank
      }
    });
  }
  if (action.type === UPDATE_DRAFT) {
    return {
      ...state,
      draft: {
        index: action.payload.index,
        snakeUp: action.payload.snakeUp
      }
    };
  }
  if (action.type === DRAFT_GOLFER) {
    const updatedPlayers = state.players.map((player) => {
      if (player.name === action.payload.name) {
        return {
          ...player,
          golfers: [
            ...player.golfers,
            action.payload.golfer
          ]
        };
      }
      return player;
    });

    const newBoard = state.draftBoard.filter(golfer => golfer.rank !== state.selectedGolfer.rank);

    return {
      ...state,
      players: [
        ...updatedPlayers
      ],
      draftBoard: [
        ...newBoard
      ],
      selectedGolfer: {
        name: '',
        rank: -1
      }
    };
    // ...selectingPlayer, golfers: [...selectingPlayer.golfers, selectedGolfer]
    // console.log(testObj);

    // return Object.assign({}, state);
  }
  if (action.type === SET_DRAFT_BOARD) {
    return {
      ...state,
      draftBoard: action.payload.value
    };
  }

  return state;
};

export default rootReducer;
