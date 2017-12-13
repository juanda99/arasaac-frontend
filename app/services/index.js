import { searchMaterialSchema } from './schemas'
import callApi from './callApi'
import { login, signup } from './config'

const api = {
  keywords: (locale) => callApi(`keywords/${locale}`),
  fetchPictograms: (searchText) => callApi(`pictograms/${searchText}`),
  fetchMaterials: (locale, searchText) => callApi(`materials/${locale}/${searchText}`, searchMaterialSchema),
  fetchNewMaterials: () => callApi(`materials/days/30`, searchMaterialSchema),
  fetchMaterial: (idMaterial) => callApi(`materials/${idMaterial}`),
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
