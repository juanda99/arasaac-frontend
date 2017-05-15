import { userSchema, repoSchema, userSchemaArray, repoSchemaArray, pictogramsSchema } from './schemas'
import callApi from './callApi'
import { login, signup } from './config'

const api = {
  keywords: (locale) => callApi(`keywords/${locale}`),
  fetchPictograms: (searchText) => callApi(`pictograms/${searchText}`, pictogramsSchema),
  fetchMaterials: (locale, searchText) => callApi(`materials/${locale}/${searchText}`),
  fetchMaterial: (idMaterial) => callApi(`materials/${idMaterial}`),
  fetchUser: (username) => callApi(`users/${username}`, userSchema),
  fetchRepo: (fullName) => callApi(`repos/${fullName}`, repoSchema),
  fetchStarred: (url) => callApi(url, repoSchemaArray),
  fetchStargazers: (url) => callApi(url, userSchemaArray),
  login: (username, password) => callApi(login.url, login.config(username, password)),
  signup: (data) => callApi(signup.url, signup.config(data))
}

export default api

/*
  signIn,
  signUp,
  sendVerificationEmail,
  emailVerification
*/
