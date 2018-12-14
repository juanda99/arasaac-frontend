import { take, takeLatest, call, put, cancel } from 'redux-saga/effects'
import { LOCATION_CHANGE, push } from 'react-router-redux'
// import { showLoading, hideLoading } from 'react-redux-loading-bar'
import api from 'services'
import { SIGNUP, signup } from './actions'

function* userSignup(action) {
  const { type, payload } = action
  try {
    const response = yield call(api[type], payload)
    const { err } = response
    if (!err) {
      yield put(signup.success())
      yield put(push('/profile'))
    } else {
      yield put(signup.failure(err))
    }
  } catch (error) {
    yield put(signup.failure(error, error))
  }
}

function* userSignupSaga() {
  const watcher = yield takeLatest(SIGNUP.REQUEST, userSignup)
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE)
  yield cancel(watcher)
}

// All sagas to be loaded
export default [userSignupSaga]
