import { take, takeLatest, call, put, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import api from 'services'
import { MATERIALS, materials } from './actions'
// import { AUTOCOMPLETE } from '../PictogramsView/actions'

function* materialsGetData(action) {
  try {
    const { locale, searchText } = action.payload
    const response = yield call(api.fetchMaterials, locale, searchText)
    yield put(materials.success(locale, searchText, response))
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
export default [materialsData]
