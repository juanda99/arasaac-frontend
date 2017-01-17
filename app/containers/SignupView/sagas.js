import { fork, call, take, put } from 'redux-saga/effects'
import { browserHistory } from 'react-router'
// import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { SIGNUP, signup } from 'containers/SignupView/actions'
import api from 'services'


function* signupCall(userData) {
  try {
    console.log ('ha entrado en signupCall')
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
    const { payload: user } = yield take(SIGNUP.REQUEST)
    const usuario = JSON.stringify(user)
    console.log(`usuario: ${usuario}`)
    console.log('ha entrado en signup request')
    // yield fork(signupCall, user)
    /*
    const task = yield fork(signupCall, user)
    *
    yield take(LOGOUT.REQUEST)
    yield cancel(task)
    yield put(logout.success())
    */
  }
}

function* test() {
  while (true) {
    yield take(SIGNUP.REQUEST)
    console.log('Ha entrado aquí')
    yield take(SIGNUP.REQUEST)
    console.log('Ha entrado aquí también')
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
export default [test]
