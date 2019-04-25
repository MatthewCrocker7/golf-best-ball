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
  draftBoard: [
    { name: 'Dustin Johnson', rank: 1 },
    { name: 'Justin Rose', rank: 2 },
    { name: 'Brooks Koepka', rank: 3 },
    { name: 'Rory Mcllroy', rank: 4 },
    { name: 'Justin Thomas', rank: 5 },
    { name: 'Tiger Woods', rank: 6 },
    { name: 'Francesco Molinari', rank: 7 },
    { name: 'Bryson DeChambeau', rank: 8 },
    { name: 'Xander Schauffele', rank: 9 },
    { name: 'Rickie Fowler', rank: 10 },
    { name: 'Jon Rahm', rank: 11 },
    { name: 'Matt Kuchar', rank: 12 },
    { name: 'Paul Casey', rank: 13 },
    { name: 'Jason Day', rank: 14 },
    { name: 'Tony Finau', rank: 15 },
    { name: 'Tommy Fleetwood', rank: 16 },
    { name: 'Bubba Watson', rank: 17 },
    { name: 'Patrick Cantlay', rank: 18 },
    { name: 'Patrick Reed', rank: 19 },
    { name: 'Webb Simpson', rank: 20 },
    { name: 'Louis Oosthuizen', rank: 21 },
    { name: 'Marc Leishman', rank: 22 },
    { name: 'Phil Mickelson', rank: 23 },
    { name: 'Gary Woodland', rank: 24 },
    { name: 'Kevin Kisner', rank: 25 },
    { name: 'Ian Poulter', rank: 26 },
    { name: 'Hideki Matsuyama', rank: 27 },
    { name: 'Adam Scott', rank: 28 },
    { name: 'Sergio Garcia', rank: 29 },
  ]
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

    const newBoard = state.draftBoard.filter(golfer => golfer.name !== state.selectedGolfer);

    return {
      ...state,
      players: [
        ...updatedPlayers
      ],
      draftBoard: [
        ...newBoard
      ],
      selectedGolfer: ''
    };
    // ...selectingPlayer, golfers: [...selectingPlayer.golfers, selectedGolfer]
    // console.log(testObj);

    // return Object.assign({}, state);
  }

  return state;
};

export default rootReducer;
