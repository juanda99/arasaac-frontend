import { fork, call, take, put, cancel } from 'redux-saga/effects'
import { LOGIN, LOGOUT, login, logout } from 'containers/LoginView/actions'
import api from 'services'

/* eslint no-constant-condition:0 */

// resuable fetch Subroutine
// entity :  user | repo | starred | stargazers
// apiFn  : api.fetchUser | api.fetchRepo | ...
// id     : login | fullName
// url    : next page url. If not provided will use pass it to apiFn
/*
function* fetchEntity(entity, apiFn, id, url) {
  yield put( entity.request(id) )
  const {response, error} = yield call(apiFn, url || id)
  if(response)
    yield put( entity.success(id, response) )
  else
    yield put( entity.failure(id, error) )
}

*/
// yeah! we can also bind Generators
/*
export const fetchUser       = fetchEntity.bind(null, user, api.fetchUser)
export const fetchRepo       = fetchEntity.bind(null, repo, api.fetchRepo)
export const fetchStarred    = fetchEntity.bind(null, starred, api.fetchStarred)
export const fetchStargazers = fetchEntity.bind(null, stargazers, api.fetchStargazers)
*/

function* authorize(username, password) {
  try {
    const token = yield call(api.login, username, password)
    yield put(login.success(token))
    // en localstorage almacenaremos datos mediante un middleware:
    // yield call(API.storeItem, {TOKEN: token, USERNAME: username})
  } catch (error) {
    yield put(login.failure(error))
    // yield call(API.removeItem, TOKEN)
    // yield call(API.removeItem, USERNAME)
  }
}

function* loginFlow() {
  while (true) {
    const { username, password } = yield take(LOGIN.REQUEST)
    // fork return a Task object
    const task = yield fork(authorize, username, password)
    yield take(LOGOUT.REQUEST)
    yield cancel(task)
    yield put(logout.success())
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
export default function* root() {
  /* yield [
    fork(loginFlow),
    fork(activationFlow)
  ] */
  yield fork(loginFlow)
}