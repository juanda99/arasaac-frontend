import { put, get, remove } from 'storage'
import { userSchema, repoSchema, userSchemaArray, repoSchemaArray, searchSchema, pictogramsSchema } from './schemas'
import callApi from './callApi'
import { login, signup } from './config'

const api = {
  keywords: (locale) => callApi(`keywords/${locale}`),
  fetchPictograms: (searchText) => callApi(`pictograms/${searchText}`, pictogramsSchema),
  fetchUser: (username) => callApi(`users/${username}`, userSchema),
  fetchRepo: (fullName) => callApi(`repos/${fullName}`, repoSchema),
  fetchStarred: (url) => callApi(url, repoSchemaArray),
  fetchStargazers: (url) => callApi(url, userSchemaArray),
  login: (username, password) => callApi(login.url, login.config(username, password)),
  signup: (data) => callApi(signup.url, signup.config(data)),
  removeItem: (item) => remove(item),
  storeItem: (item, value) => put(item, value),
  getItem: (item) => get(item)
}

export default api

/*
  signIn,
  signUp,
  sendVerificationEmail,
  emailVerification
*/
