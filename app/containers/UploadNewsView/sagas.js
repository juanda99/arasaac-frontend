import { take, takeLatest, call, put, cancel } from "redux-saga/effects";
import { push, LOCATION_CHANGE } from "react-router-redux";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import api from "services";
import { UPLOAD_NEW, uploadNew } from "./actions";

function* uploadNewProcess(action) {
  try {
    yield put(showLoading());
    const response = yield call(api[action.type], action.payload);
    yield put(uploadNew.success());
    yield put(push("/materials/upload/7"));
  } catch (error) {
    yield put(uploadNew.failure(error.message));
  } finally {
    yield put(hideLoading());
  }
}

export function* uploadNewSaga() {
  // const watcher = yield takeLatest(UPLOAD_MATERIAL.REQUEST, uploadNewProcess)
  // yield take(LOCATION_CHANGE)
  // yield cancel(watcher)
}

// All sagas to be loaded
export default [uploadNewSaga];
