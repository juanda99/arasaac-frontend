import { take, takeLatest, call, put, cancel, select } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import api from 'services'
import { selectSearchKey } from './selectors'
import { PICTOGRAMS, pictograms, AUTOCOMPLETE, autocomplete } from './actions'

function* pictogramsGetData() {
  try {
    // TODO: change using action as parameter!!!!!!!
    const searchText = yield select(selectSearchKey())
    const response = yield call(api.fetchPictograms, searchText)
    yield put(pictograms.success(response))
  } catch (error) {
    yield put(pictograms.failure(error.message))
  } finally {
    // When done, we tell Redux we're not in the middle of a request any more
    // yield put({type: SENDING_REQUEST, sending: false})
  }
}


function* autoCompleteGetData(action) {
  try {
    const { locale } = action.payload
    const response = yield call(api.keywords, locale)
    const { words } = response
    // order by lenght so autocomplete is better:
    words.sort((a, b) => (a.length - b.length))
    yield put(autocomplete.success(locale, words))
  } catch (error) {
    yield put(autocomplete.failure(error.message))
  } finally {
    // When done, we tell Redux we're not in the middle of a request any more
    // yield put({type: SENDING_REQUEST, sending: false})
  }
}


/**
 * Root saga manages watcher lifecycle
 */
export function* autoCompleteData() {
  const watcher = yield takeLatest(AUTOCOMPLETE.REQUEST, autoCompleteGetData)
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

export function* pictogramsData() {
  const watcher = yield takeLatest(PICTOGRAMS.REQUEST, pictogramsGetData)
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}


// All sagas to be loaded
export default [pictogramsGetData, autoCompleteData]
