/*
 *
 * ToggleFilter reducer
 *
 */

import { fromJS } from "immutable";
import { TOGGLE_FILTER } from "./actions";

export const initialState = fromJS({
  pictograms: {
    catalog: true,
    license: true,
    size: true,
  },
  materials: {
    area: true,
    activity: true,
    language: false,
    license: false,
  },
});

function toggleFilterReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_FILTER:
      return state.setIn(
        [action.payload.type, action.payload.filter],
        !state.getIn([action.payload.type, action.payload.filter])
      );
    default:
      return state;
  }
}

export default toggleFilterReducer;
