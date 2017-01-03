import { fork, call, take, put } from 'redux-saga/effects'
import { browserHistory } from 'react-router'
// import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { SIGNUP, signup } from 'containers/SignupView/actions'
import api from 'services'


function* signupCall(userData) {
  try {
    // yield put(showLoading())
    yield call(api.signup, userData)
    yield put(signup.success())
  } catch (error) {
    yield put(signup.failure(error))
    // forwardTo('/')
  } finally {
    // yield put(hideLoading())
  }
}
/* eslint no-constant-condition:0 */
function* signupFlow() {
  while (true) {
    const user = yield take(SIGNUP.REQUEST)
    yield fork(signupCall, user)
    /*
    const task = yield fork(signupCall, user)
    yield take(LOGOUT.REQUEST)
    yield cancel(task)
    yield put(logout.success())
    */
  }
}

/*
function* activationFlow() {
  while (true) {
    try {
      const { urlActivation } = yield take(ACTIVATION.REQUEST)
      yield call(API.userActivation, { urlActivation })
      yield put(activate.success())
    } catch (error) {
      yield put(activate.failure(error))
    }
  }
}
*/

// Little helper function to abstract going to different pages
function forwardTo(location) {
  browserHistory.push(location)
}
export default [signupFlow]
