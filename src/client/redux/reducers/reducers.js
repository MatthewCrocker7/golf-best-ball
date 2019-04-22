import {
  UPDATE_NAV
} from '../constants/action-types';

const initState = {
  nav: 0
};

const rootReducer = (state = initState, action) => {
  if (action.type === UPDATE_NAV) {
    return Object.assign({}, state, {
      nav: action.payload.value
    });
  }
  return state;
};

export default rootReducer;
