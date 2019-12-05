import { take, takeLatest, call, put, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import api from 'services'
import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  addFavorite,
  removeFavorite
} from 'containers/App/actions'
import {
  PICTOGRAMS,
  FAVORITE_PICTOGRAMS,
  favoritePictograms,
  NEW_PICTOGRAMS,
  pictograms,
  newPictograms,
  AUTOCOMPLETE,
  autocomplete
} from './actions'

function* pictogramsGetData(action) {
  try {
    const { locale, searchText } = action.payload
    yield put(showLoading())
    const response = yield call(api[action.type], action.payload)
    yield put(pictograms.success(locale, searchText, response))
  } catch (error) {
    yield put(pictograms.failure(error.message))
  } finally {
    yield put(hideLoading())
    // When done, we tell Redux we're not in the middle of a request any more
    // yield put({type: SENDING_REQUEST, sending: false})
  }
}

function* favoritePictogramsGetData(action) {
  console.log('adfadfadfafasfdasfkjñj')
  const { locale } = action.payload
  console.log(action)
  try {
    yield put(showLoading())
    const response = yield call(api[action.type], action.payload)
    yield put(pictograms.success(locale, response))
  } catch (error) {
    yield put(pictograms.failure(error.message))
  } finally {
    yield put(hideLoading())
    // When done, we tell Redux we're not in the middle of a request any more
    // yield put({type: SENDING_REQUEST, sending: false})
  }
}

function* newPictogramsGetData(action) {
  try {
    const { locale } = action.payload
    yield put(showLoading())
    const response = yield call(api[action.type], action.payload)
    yield put(newPictograms.success(locale, response))
  } catch (error) {
    yield put(newPictograms.failure(error.message))
  } finally {
    yield put(hideLoading())
  }
}

function* addFavoritePutData(action) {
  try {
    const { fileName, listName } = action.payload
    yield put(showLoading())
    yield call(api[action.type], action.payload)
    yield put(addFavorite.success(fileName, listName))
  } catch (error) {
    yield put(addFavorite.failure(error.message))
  } finally {
    yield put(hideLoading())
  }
}

function* removeFavoritePutData(action) {
  try {
    const { fileName, listName } = action.payload
    yield put(showLoading())
    yield call(api[action.type], action.payload)
    yield put(removeFavorite.success(fileName, listName))
  } catch (error) {
    yield put(removeFavorite.failure(error.message))
  } finally {
    yield put(hideLoading())
  }
}

function* autoCompleteGetData(action) {
  try {
    const { locale } = action.payload
    const response = yield call(api[action.type], action.payload)
    const { words } = response
    // order by lenght so autocomplete is better:
    words.sort((a, b) => a.length - b.length)
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

export function* newPictogramsData() {
  const watcher = yield takeLatest(
    NEW_PICTOGRAMS.REQUEST,
    newPictogramsGetData
  )
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

export function* getFavoritesData() {
  const watcher = yield takeLatest(
    FAVORITE_PICTOGRAMS.REQUEST,
    favoritePictogramsGetData
  )
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

export function* addFavoriteData() {
  const watcher = yield takeLatest(ADD_FAVORITE.REQUEST, addFavoritePutData)
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

export function* removeFavoriteData() {
  const watcher = yield takeLatest(
    REMOVE_FAVORITE.REQUEST,
    removeFavoritePutData
  )
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

// All sagas to be loaded
export default [
  pictogramsData,
  getFavoritesData,
  newPictogramsData,
  autoCompleteData,
  addFavoriteData,
  removeFavoriteData
]
