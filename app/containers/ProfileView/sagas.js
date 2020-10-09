import { take, takeLatest, call, put, cancel } from "redux-saga/effects";
import { LOCATION_CHANGE } from "react-router-redux";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import api from "services";
import { UPDATE_USER, updateUser } from "containers/App/actions";

function* updateUserGetData(action) {
  try {
    yield put(showLoading());
    const user = yield call(api[action.type], action.payload);
    yield put(updateUser.success(user));
    yield put(hideLoading());
  } catch (error) {
    yield put(hideLoading());
    yield put(updateUser.failure(error.message));
  } finally {
    // When done, we tell Redux we're not in the middle of a request any more
    // yield put({type: SENDING_REQUEST, sending: false})
  }
}

export function* updateUserFlow() {
  const watcher = yield takeLatest(UPDATE_USER.REQUEST, updateUserGetData);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [updateUserFlow];
