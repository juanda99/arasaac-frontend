import { searchMaterialSchema } from './schemas'
import callApi from './callApi'
import { login, signup, socialLogin } from './config'


const api = {
  keywords: (locale) => callApi(`keywords/${locale}`),
  fetchPictograms: ({ searchText }) => callApi(`pictograms/${searchText}`),
  MATERIALS_REQUEST: ({ locale, searchText }) => callApi(`materials/${locale}/${searchText}`, { schema: searchMaterialSchema }),
  fetchNewMaterials: () => callApi('materials/days/30', { schema: searchMaterialSchema }),
  MATERIAL_REQUEST: ({ idMaterial }) => callApi(`materials/${idMaterial}`),
  LOGIN_REQUEST: ({ username, password }) => callApi(login.url, login.options(username, password)),
  SOCIAL_LOGIN_REQUEST: ({ socialToken, provider }) => callApi(socialLogin.url, socialLogin.options(socialToken, provider)),
  SIGNUP_REQUEST: (userData) => callApi(signup.url, signup.options(userData))
}

export default api

/*
  signIn,
  signUp,
  sendVerificationEmail,
  emailVerification
*/
