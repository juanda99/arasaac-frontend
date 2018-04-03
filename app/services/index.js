import { searchMaterialSchema } from './schemas'
import callApi from './callApi'
import { login, signup, socialLogin, uploadMaterial, API_ROOT } from './config'

const api = {
  keywords: (locale) => callApi(`${API_ROOT}/keywords/${locale}`),
  fetchPictograms: ({ searchText }) => callApi(`${API_ROOT}/pictograms/${searchText}`),
  MATERIALS_REQUEST: ({ locale, searchText }) => callApi(`${API_ROOT}/materials/${locale}/${searchText}`, { schema: searchMaterialSchema }),
  fetchNewMaterials: () => callApi('materials/days/30', { schema: searchMaterialSchema }),
  UPLOAD_MATERIAL_REQUEST: (formData) => callApi(uploadMaterial.url, uploadMaterial.options(formData)),
  MATERIAL_REQUEST: ({ idMaterial }) => callApi(`${API_ROOT}/materials/${idMaterial}`),
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
