import { fromJS, List } from "immutable";
import { UPLOAD_NEW } from "./actions";

export const initialState = fromJS({
  loading: false,
  error: false,
});

function uploadNewReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_NEW.REQUEST:
      return state.set("loading", true).set("error", false);
    case UPLOAD_NEW.SUCCESS:
      return state.set("loading", false);
    case UPLOAD_NEW.FAILURE:
      return state.set("error", action.payload.error).set("loading", false);
    default:
      return state;
  }
}

export default uploadNewReducer;
