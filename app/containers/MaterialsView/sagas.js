import { take, takeLatest, call, put, cancel, select } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import api from 'services'
import { selectSearchKey } from './selectors'
import { MATERIALS, materials } from './actions'

function* materialsGetData() {
  try {
    const searchText = yield select(selectSearchKey())
    const response = yield call(api.fetchMaterials, searchText)
    yield put(materials.success(response))
  } catch (error) {
    yield put(materials.failure(error.message))
  } finally {
    // When done, we tell Redux we're not in the middle of a request any more
    // yield put({type: SENDING_REQUEST, sending: false})
  }
}


export function* materialsData() {
  const watcher = yield takeLatest(MATERIALS.REQUEST, materialsGetData)
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}


// All sagas to be loaded
export default [materialsGetData]
