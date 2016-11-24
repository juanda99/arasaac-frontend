import {put, get, remove} from 'redux/persistance/storage'
import {userSchema, repoSchema, userSchemaArray, repoSchemaArray} from './schemas'
import {callApi} from './api'
import {AUTH} from './config'

const api = {
  fetchUser: login => callApi(`users/${login}`, userSchema),
  fetchRepo: fullName => callApi(`repos/${fullName}`, repoSchema),
  fetchStarred: url => callApi(url, repoSchemaArray),
  fetchStargazers: url => callApi(url, userSchemaArray),
  authorize: (username, password) => callApi(AUTH.url, AUTH.config(username, password)),
  removeItem: item => remove(item),
  storeItem: (item, value) => put(item, value),
  getItem: item => get(item)
}

export default api
