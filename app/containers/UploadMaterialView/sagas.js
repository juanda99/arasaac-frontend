import { take, takeLatest, call, put, cancel } from 'redux-saga/effects'
import { push, LOCATION_CHANGE } from 'react-router-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import api from 'services'
import { UPLOAD_MATERIAL, uploadMaterial } from './actions'

function* uploadMaterialProcess(action) {
  try {
    yield put(showLoading())
    const { id } = yield call(api[action.type], action.payload)
    yield put(uploadMaterial.success())
    yield put(push(`/materials/${id}`))
  } catch (error) {
    yield put(uploadMaterial.failure(error.message))
  } finally {
    yield put(hideLoading())
  }
}

export function* uploadMaterialSaga() {
  const watcher = yield takeLatest(UPLOAD_MATERIAL.REQUEST, uploadMaterialProcess)
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

// All sagas to be loaded
export default [uploadMaterialSaga]
