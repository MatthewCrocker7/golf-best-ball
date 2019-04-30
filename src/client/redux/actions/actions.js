import {
  UPDATE_NAV,
  UPDATE_SELECTED,
  UPDATE_DRAFT,
  DRAFT_GOLFER,
  SET_DRAFT_BOARD
} from '../constants/action-types';

const updateNav = value => ({
  type: UPDATE_NAV,
  payload: value
});

const updateSelected = value => ({
  type: UPDATE_SELECTED,
  payload: value
});

const updateDraft = value => ({
  type: UPDATE_DRAFT,
  payload: value
});

const draftGolfer = value => ({
  type: DRAFT_GOLFER,
  payload: value
});

const setDraftBoard = value => ({
  type: SET_DRAFT_BOARD,
  payload: value
});

export default {
  updateNav,
  updateSelected,
  updateDraft,
  draftGolfer,
  setDraftBoard
};
