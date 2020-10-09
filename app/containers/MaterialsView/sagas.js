import { take, takeLatest, call, put, cancel } from "redux-saga/effects";
import { LOCATION_CHANGE } from "react-router-redux";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import api from "services";
import {
  MATERIALS,
  NEW_MATERIALS,
  AUTHORS,
  MATERIAL_PUBLISH,
  MATERIAL_REMOVE,
  MATERIAL,
  MATERIALS_NOT_PUBLISHED,
  MATERIAL_UPDATE,
  materials,
  newMaterials,
  publishMaterial,
  notPublishedMaterials,
  removeMaterial,
  material,
  updateMaterial,
  authors,
} from "./actions";

function* materialsGetData(action) {
  try {
    const { locale, searchText, searchType } = action.payload;
    yield put(showLoading());
    const response = yield call(api[action.type], action.payload);
    yield put(materials.success(locale, searchText, searchType, response));
  } catch (error) {
    yield put(materials.failure(error.message));
  } finally {
    yield put(hideLoading());
    // When done, we tell Redux we're not in the middle of a request any more
    // yield put({type: SENDING_REQUEST, sending: false})
  }
}

function* newMaterialsGetData(action) {
  try {
    // yield put(showLoading())
    const response = yield call(api[action.type], action.payload);
    yield put(newMaterials.success(response));
    const d1 = new Date();
    sessionStorage.setItem("newMaterialsDate", d1.getTime());
  } catch (error) {
    yield put(newMaterials.failure(error.message));
  } finally {
    // yield put(hideLoading())
  }
}

function* materialPublishGetData(action) {
  try {
    yield put(showLoading());
    const response = yield call(api[action.type], action.payload);
    yield put(publishMaterial.success(response));
  } catch (error) {
    yield put(publishMaterial.failure(error.message));
  } finally {
    yield put(hideLoading());
  }
}

function* materialsNotPublishedGetData(action) {
  try {
    // yield put(showLoading())
    const response = yield call(api[action.type], action.payload);
    yield put(notPublishedMaterials.success(response));
  } catch (error) {
    yield put(notPublishedMaterials.failure(error.message));
  } finally {
    // yield put(hideLoading())
  }
}

function* materialRemoveGetData(action) {
  try {
    yield put(showLoading());
    const response = yield call(api[action.type], action.payload);
    yield put(removeMaterial.success(response));
  } catch (error) {
    yield put(removeMaterial.failure(error.message));
  } finally {
    yield put(hideLoading());
  }
}

export function* materialsData() {
  const watcher = yield takeLatest(MATERIALS.REQUEST, materialsGetData);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* materialRemoveData() {
  const watcher = yield takeLatest(
    MATERIAL_REMOVE.REQUEST,
    materialRemoveGetData
  );
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* materialPublishData() {
  const watcher = yield takeLatest(
    MATERIAL_PUBLISH.REQUEST,
    materialPublishGetData
  );
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* materialsNotPublishedData() {
  const watcher = yield takeLatest(
    MATERIALS_NOT_PUBLISHED.REQUEST,
    materialsNotPublishedGetData
  );
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* newMaterialsData() {
  const watcher = yield takeLatest(NEW_MATERIALS.REQUEST, newMaterialsGetData);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

function* materialGetData(action) {
  try {
    yield put(showLoading());
    const response = yield call(api[action.type], action.payload);
    yield put(material.success(response));
    yield put(hideLoading());
  } catch (error) {
    yield put(hideLoading());
    yield put(material.failure(error.message));
  }
}

function* authorsGetData(action) {
  try {
    // yield put(showLoading())
    const response = yield call(api[action.type], action.payload);
    yield put(authors.success(response));
    // yield put(hideLoading())
  } catch (error) {
    yield put(hideLoading());
    yield put(authors.failure(error.message));
  }
}

function* updateMaterialGetData(action) {
  try {
    yield put(showLoading());
    const response = yield call(api[action.type], action.payload);
    yield put(updateMaterial.success(response));
    yield put(hideLoading());
  } catch (error) {
    yield put(hideLoading());
    yield put(updateMaterial.failure(error.message));
  }
}

export function* updateMaterialData() {
  const watcher = yield takeLatest(
    MATERIAL_UPDATE.REQUEST,
    updateMaterialGetData
  );
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* materialData() {
  const watcher = yield takeLatest(MATERIAL.REQUEST, materialGetData);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* authorsData() {
  const watcher = yield takeLatest(AUTHORS.REQUEST, authorsGetData);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  materialsData,
  newMaterialsData,
  authorsData,
  materialPublishData,
  materialsNotPublishedData,
  materialRemoveData,
  materialData,
  updateMaterialData,
];
