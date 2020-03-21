import { take, takeLatest, call, put, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import api from 'services'
// just a copy of MaterialViewSaga to fix webpack compiling issues
import { MATERIAL, MATERIAL_UPDATE, material, updateMaterial } from './actions'

function* materialGetData(action) {
  try {
    yield put(showLoading())
    const response = yield call(api[action.type], action.payload)
    yield put(material.success(response))
    yield put(hideLoading())
  } catch (error) {
    yield put(hideLoading())
    yield put(material.failure(error.message))
  }
}

function* updateMaterialGetData(action) {
  try {
    yield put(showLoading())
    const response = yield call(api[action.type], action.payload)
    yield put(updateMaterial.success(response))
    yield put(hideLoading())
  } catch (error) {
    yield put(hideLoading())
    yield put(updateMaterial.failure(error.message))
  }
}

export function* updateMaterialData() {
  const watcher = yield takeLatest(MATERIAL_UPDATE.REQUEST, updateMaterialGetData)
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

export function* materialData() {
  const watcher = yield takeLatest(MATERIAL.REQUEST, materialGetData)
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

// All sagas to be loaded
export default [materialData, updateMaterialData]
