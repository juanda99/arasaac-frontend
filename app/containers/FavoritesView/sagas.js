import { take, takeLatest, call, put, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import api from 'services'
import {
  ADD_FAVORITE,
  DELETE_FAVORITE,
  ADD_LIST,
  RENAME_LIST,
  DELETE_LIST,
  addFavorite,
  deleteFavorite,
  addList,
  renameList,
  deleteList
} from 'containers/App/actions'
import { FAVORITE_PICTOGRAMS, favoritePictograms } from './actions'

function* favoritePictogramsGetData(action) {
  const { locale } = action.payload
  try {
    yield put(showLoading())
    const response = yield call(api[action.type], action.payload)
    yield put(favoritePictograms.success(locale, response))
  } catch (error) {
    yield put(favoritePictograms.failure(error.message))
  } finally {
    yield put(hideLoading())
    // When done, we tell Redux we're not in the middle of a request any more
    // yield put({type: SENDING_REQUEST, sending: false})
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

function* deleteFavoritePutData(action) {
  try {
    const { fileName, listName } = action.payload
    yield put(showLoading())
    yield call(api[action.type], action.payload)
    yield put(deleteFavorite.success(fileName, listName))
  } catch (error) {
    yield put(deleteFavorite.failure(error.message))
  } finally {
    yield put(hideLoading())
  }
}

function* addListPutData(action) {
  try {
    const { listName } = action.payload
    yield put(showLoading())
    yield call(api[action.type], action.payload)
    yield put(addList.success(listName))
  } catch (error) {
    yield put(addList.failure(error.message))
  } finally {
    yield put(hideLoading())
  }
}

function* deleteListPutData(action) {
  try {
    const { listName } = action.payload
    yield put(showLoading())
    yield call(api[action.type], action.payload)
    yield put(deleteList.success(listName))
  } catch (error) {
    yield put(deleteList.failure(error.message))
  } finally {
    yield put(hideLoading())
  }
}

function* renameListPutData(action) {
  try {
    const { listName, newListName } = action.payload
    yield put(showLoading())
    yield call(api[action.type], action.payload)
    yield put(renameList.success(listName, newListName))
  } catch (error) {
    yield put(renameList.failure(error.message))
  } finally {
    yield put(hideLoading())
  }
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

export function* deleteFavoriteData() {
  const watcher = yield takeLatest(
    DELETE_FAVORITE.REQUEST,
    deleteFavoritePutData
  )
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

export function* addListData() {
  const watcher = yield takeLatest(ADD_LIST.REQUEST, addListPutData)
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

export function* renameListData() {
  const watcher = yield takeLatest(RENAME_LIST.REQUEST, renameListPutData)
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

export function* deleteListData() {
  const watcher = yield takeLatest(DELETE_LIST.REQUEST, deleteListPutData)
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

// All sagas to be loaded
export default [
  getFavoritesData,
  addFavoriteData,
  deleteFavoriteData,
  addListData,
  renameListData,
  deleteListData
]
