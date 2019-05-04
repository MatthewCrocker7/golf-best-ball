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
    rank: -1,
    id: ''
  },
  players: [
    { name: 'Matthew', id: '11111111-1111-1111-1111-111111111111', golfers: [] },
    { name: 'Dentyn', id: '21111111-1111-1111-1111-111111111111', golfers: [] },
    { name: 'Jonathan', id: '31111111-1111-1111-1111-111111111111', golfers: [] },
    { name: 'Drew', id: '41111111-1111-1111-1111-111111111111', golfers: [] },
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
        rank: action.payload.rank,
        id: action.payload.id
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
            {
              name: action.payload.golfer,
              id: action.payload.id
            }
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
        rank: -1,
        id: ''
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
