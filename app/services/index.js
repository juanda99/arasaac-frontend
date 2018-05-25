import { searchMaterialSchema, searchPictogramSchema } from './schemas'
import callApi from './callApi'
import { login, signup, socialLogin, uploadMaterial, customPictogram, API_ROOT } from './config'

const api = {
  AUTOCOMPLETE_REQUEST: ({ locale }) => callApi(`${API_ROOT}/keywords/${locale}`),
  PICTOGRAMS_REQUEST: ({ locale, searchText }) => callApi(`${API_ROOT}/pictograms/${locale}/search/${searchText}`, { schema: searchPictogramSchema }),
  NEW_PICTOGRAMS_REQUEST: ({ locale }) => callApi(`${API_ROOT}/pictograms/${locale}/new/30`, { schema: searchPictogramSchema }),
  MATERIALS_REQUEST: ({ locale, searchText }) => callApi(`${API_ROOT}/materials/${locale}/${searchText}`, { schema: searchMaterialSchema }),
  NEW_MATERIALS_REQUEST: () => callApi(`${API_ROOT}/materials/new/30`, { schema: searchMaterialSchema }),
  UPLOAD_MATERIAL_REQUEST: (formData) => callApi(uploadMaterial.url, uploadMaterial.options(formData)),
  MATERIAL_REQUEST: ({ idMaterial }) => callApi(`${API_ROOT}/materials/${idMaterial}`),
  PICTOGRAM_REQUEST: ({ idPictogram, locale }) => callApi(`${API_ROOT}/pictograms/${locale}/${idPictogram}`),
  LOGIN_REQUEST: ({ username, password }) => callApi(login.url, login.options(username, password)),
  SOCIAL_LOGIN_REQUEST: ({ socialToken, provider }) => callApi(socialLogin.url, socialLogin.options(socialToken, provider)),
  SIGNUP_REQUEST: (userData) => callApi(signup.url, signup.options(userData)),
  CUSTOM_PICTOGRAM_REQUEST: (idPictogram, options) => callApi(customPictogram.url(idPictogram, options))
}

export default api

/*
  signIn,
  signUp,
  sendVerificationEmail,
  emailVerification
*/
