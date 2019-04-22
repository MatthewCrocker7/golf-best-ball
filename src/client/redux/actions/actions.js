import {
  UPDATE_NAV
} from '../constants/action-types';

const updateNav = value => ({
  type: UPDATE_NAV,
  payload: value
});

export default updateNav;
