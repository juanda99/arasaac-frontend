// export default function* root() {
  // do nothing
// }

import { fork, call, take, takeLatest, put, cancel } from 'redux-saga/effects'
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

function* authorize(action) {
  try {
    const { username, password } = action.payload
    const {access_token, expires_in, token_type, refresh_token} = yield call(api.login, username, password)
    yield put(login.success())
    // en localstorage almacenaremos datos mediante un middleware:
    // yield call(API.storeItem, {TOKEN: token, USERNAME: username})
  } catch (error) {
    yield put(login.failure(error))
    // yield call(API.removeItem, TOKEN)
    // yield call(API.removeItem, USERNAME)
  }
}

export default function* loginFlow() {
  const watcher = yield takeLatest(LOGIN.REQUEST, authorize)
  // fork return a Task object
  // const task = yield fork(authorize, username, password)
  yield take('LOGOUT.REQUEST')
  yield cancel(watcher)
  yield put(logout.success())
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

