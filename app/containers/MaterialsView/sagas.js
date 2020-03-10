import { take, takeLatest, call, put, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import api from 'services'
import { MATERIALS, NEW_MATERIALS, MATERIAL_PUBLISH, materials, newMaterials, publishMaterial } from './actions'

function* materialsGetData(action) {
  try {
    const { locale, searchText } = action.payload
    yield put(showLoading())
    const response = yield call(api[action.type], action.payload)
    yield put(materials.success(locale, searchText, response))
  } catch (error) {
    yield put(materials.failure(error.message))
  } finally {
    yield put(hideLoading())
    // When done, we tell Redux we're not in the middle of a request any more
    // yield put({type: SENDING_REQUEST, sending: false})
  }
}

function* newMaterialsGetData(action) {
  try {
    yield put(showLoading())
    const response = yield call(api[action.type], action.payload)
    yield put(newMaterials.success(response))
  } catch (error) {
    yield put(newMaterials.failure(error.message))
  } finally {
    yield put(hideLoading())
  }
}

function* materialPublishGetData(action) {
  try {
    yield put(showLoading())
    const response = yield call(api[action.type], action.payload)
    yield put(publishMaterial.success(response))
  } catch (error) {
    yield put(publishMaterial.failure(error.message))
  } finally {
    yield put(hideLoading())
  }
}

export function* materialsData() {
  const watcher = yield takeLatest(MATERIALS.REQUEST, materialsGetData)
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

export function* materialPublishData() {
  const watcher = yield takeLatest(MATERIAL_PUBLISH.REQUEST, materialPublishGetData)
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

export function* newMaterialsData() {
  const watcher = yield takeLatest(NEW_MATERIALS.REQUEST, newMaterialsGetData)
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

// All sagas to be loaded
export default [materialsData, newMaterialsData, materialPublishData]
