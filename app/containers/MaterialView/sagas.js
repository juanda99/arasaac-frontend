import { take, takeLatest, call, put, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import api from 'services'
import { MATERIAL, material } from './actions'
// import { AUTOCOMPLETE } from '../PictogramsView/actions'

function* materialGetData(action) {
  try {
    const { idMaterial } = action.payload
    yield put(showLoading())
    const response = yield call(api.fetchMaterial, idMaterial)
    yield put(material.success(response))
    yield put(hideLoading())
    /*
    const t0 = performance.now()
    // processs
    const t1 = performance.now()
    let tiempo = (t1 - t0) / 1000
    console.log('Ha llevado ' + tiempo.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 4}) + ' segundos.')
    */
  } catch (error) {
    yield put(material.failure(error.message))
  } finally {

    // When done, we tell Redux we're not in the middle of a request any more
    // yield put({type: SENDING_REQUEST, sending: false})
  }
}

export function* materialData() {
  const watcher = yield takeLatest(MATERIAL.REQUEST, materialGetData)
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

// All sagas to be loaded
export default [materialData]
