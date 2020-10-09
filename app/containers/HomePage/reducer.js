import { fromJS } from "immutable";
import { START_TOUR, STOP_TOUR } from "./actions";

const initialState = fromJS({
  run: false,
});

const tourReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_TOUR:
      return state.set("run", true);
    case STOP_TOUR:
      return state.set("run", false);
    default:
      return state;
  }
};

export default tourReducer;
