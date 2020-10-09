import { fromJS } from "immutable";
import {
  LOGIN,
  LOGOUT,
  TOKEN_VALIDATION,
  TOKEN_REFRESH,
  ACTIVATION,
  SOCIAL_LOGIN,
  RESET_ERROR,
  ADD_FAVORITE,
  DELETE_FAVORITE,
  RENAME_LIST,
  DELETE_LIST,
  ADD_LIST,
  UPDATE_USER,
} from "./actions";

const initialState = fromJS({
  loading: false,
  error: "",
});

const { List } = require("immutable");

// The auth reducer. The starting state sets authentication based on a token being in local storage.
// TODO:
// we would also want a util to check if the token is expired, it would update isAuthenticated key

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN.REQUEST:
    case SOCIAL_LOGIN.REQUEST:
    case TOKEN_VALIDATION.REQUEST:
    case ACTIVATION.REQUEST:
    case ADD_FAVORITE.REQUEST:
    case DELETE_FAVORITE.REQUEST:
    case ADD_LIST.REQUEST:
    case RENAME_LIST.REQUEST:
    case DELETE_LIST.REQUEST:
    case TOKEN_REFRESH.REQUEST:
    case UPDATE_USER.REQUEST:
      return state.set("loading", true).set("error", "");
    case LOGIN.SUCCESS:
    case SOCIAL_LOGIN.SUCCESS:
    case ACTIVATION.SUCCESS:
      return state
        .set("loading", false)
        .set("accessToken", action.payload.accessToken);
    case UPDATE_USER.SUCCESS: {
      let tmpState = state;
      Object.keys(action.payload.user).forEach((key) => {
        // facebook, google and favorites not synced here (need fromJS)
        tmpState = tmpState.set(key, action.payload.user[key]);
      });
      return tmpState;
    }
    case ADD_FAVORITE.SUCCESS: {
      const favorites = state.get("favorites");
      const { fileName, listName } = action.payload;
      // add favorite, and remove duplicates, just in case...
      const listFavorites = favorites.get(listName);
      const modifiedList = listFavorites.push(fileName).toSet().toList();
      return state
        .set("loading", false)
        .setIn(["favorites", listName], modifiedList);
    }
    case DELETE_FAVORITE.SUCCESS: {
      const favorites = state.get("favorites");
      const { fileName, listName } = action.payload;
      // add favorite, and remove duplicates, just in case...
      const listFavorites = favorites.get(listName);
      const modifiedList = listFavorites.filter((name) => name !== fileName);
      return state
        .set("loading", false)
        .setIn(["favorites", listName], modifiedList);
    }

    case ADD_LIST.SUCCESS: {
      const favorites = state.get("favorites");
      const { listName } = action.payload;
      return state
        .set("loading", false)
        .set("favorites", favorites.set(listName, List()));
    }

    case DELETE_LIST.SUCCESS: {
      const favorites = state.get("favorites");
      const { listName } = action.payload;
      return state
        .set("loading", false)
        .set("favorites", favorites.delete(listName));
    }

    case RENAME_LIST.SUCCESS: {
      let favorites = state.get("favorites");
      const { listName, newListName } = action.payload;
      // const listFavorites = favorites.get(listName)
      favorites = favorites.mapKeys((k) => {
        if (k === listName) return newListName;
        return k;
      });
      return state.set("loading", false).set("favorites", favorites);
      //   .setIn(['favorites', newListName], listFavorites)
      //   .set('favorites', favorites.delete(listName))
    }

    case TOKEN_VALIDATION.SUCCESS:
      // after login ok, we test token asking for profile
      // token & refreshToken get not altered as they are valid
      // we upgrade user profile
      return state
        .set("loading", false)
        .set("favorites", {})
        .mergeDeep(action.payload.authData);
    case TOKEN_REFRESH.SUCCESS:
      return state
        .set("loading", false)
        .set("accessToken", action.payload.accessToken);
    case LOGIN.FAILURE:
    case SOCIAL_LOGIN.FAILURE:
    case ACTIVATION.FAILURE:
    case TOKEN_VALIDATION.FAILURE:
      return state
        .set("loading", false)
        .set("accessToken", "")
        .set("error", action.payload.error);
    case UPDATE_USER.FAILURE:
      return state.set("loading", false).set("error", action.payload.error);
    case TOKEN_REFRESH.FAILURE:
      return state.set("loading", false).set("refreshToken", "");
    case LOGOUT:
      return initialState;
    case RESET_ERROR:
      return state.set("error", "");
    default:
      return state;
  }
};

export default authReducer;
