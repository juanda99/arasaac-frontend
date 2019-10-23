import { searchMaterialSchema, searchPictogramSchema } from './schemas'
import callApi from './callApi'
import {
  login,
  signup,
  socialLogin,
  uploadMaterial,
  customPicto,
  resetPassword,
  /* customPictogram, */ API_ROOT,
  PRIVATE_API_ROOT
} from './config'

const api = {
  ACTIVATION_REQUEST: ({ code }) =>
    callApi(`${PRIVATE_API_ROOT}/users/activate/${code}`),
  AUTOCOMPLETE_REQUEST: ({ locale }) =>
    callApi(`${API_ROOT}/keywords/${locale}`),
  PICTOGRAMS_REQUEST: ({ locale, searchText }) =>
    callApi(`${API_ROOT}/pictograms/${locale}/search/${searchText}`, {
      schema: searchPictogramSchema
    }),
  NEW_PICTOGRAMS_REQUEST: ({ locale }) =>
    callApi(`${API_ROOT}/pictograms/${locale}/new/30`, {
      schema: searchPictogramSchema
    }),
  MATERIALS_REQUEST: ({ locale, searchText }) =>
    callApi(`${API_ROOT}/materials/${locale}/${searchText}`, {
      schema: searchMaterialSchema
    }),
  NEW_MATERIALS_REQUEST: () =>
    callApi(`${API_ROOT}/materials/new/30`, { schema: searchMaterialSchema }),
  UPLOAD_MATERIAL_REQUEST: (formData) =>
    callApi(uploadMaterial.url, uploadMaterial.options(formData)),
  MATERIAL_REQUEST: ({ idMaterial }) =>
    callApi(`${API_ROOT}/materials/${idMaterial}`),
  PICTOGRAM_REQUEST: ({ idPictogram, locale }) =>
    callApi(`${API_ROOT}/pictograms/${locale}/${idPictogram}`),
  LOGIN_REQUEST: ({ username, password }) =>
    callApi(login.url, login.options(username, password)),
  SOCIAL_LOGIN_REQUEST: ({ socialToken, provider, locale }) =>
    callApi(
      socialLogin.url,
      socialLogin.options(socialToken, provider, locale)
    ),
  SIGNUP_REQUEST: (userData) => callApi(signup.url, signup.options(userData)),
  GENERATE_CUSTOM_PICTOGRAM: (parameters) =>
    callApi(customPicto.url, customPicto.options(parameters)),
  GET_KEYWORDS_BY_PICTOID: ({ language, idPictogram }) =>
    callApi(
      `${PRIVATE_API_ROOT}/pictograms/keywords/${language}/${idPictogram}`
    ),
  CATALOGS_REQUEST: () => callApi(`${PRIVATE_API_ROOT}/catalogs`),
  RESET_USER_PASSWORD: (userData) =>
    callApi(resetPassword.url, resetPassword.options(userData))

  /* CUSTOM_PICTOGRAM_REQUEST: (idPictogram, options) => callApi(customPictogram.url(idPictogram, options))*/
}

export const downloadCustomPictogram = (fileName) =>
  `${PRIVATE_API_ROOT}/pictograms/custom/${fileName}`

export const downloadLocution = (id, locale, keyword) =>
  `${PRIVATE_API_ROOT}/locutions/${id}/${locale}/${keyword}`

export default api

/*
  signIn,
  signUp,
  sendVerificationEmail,
  emailVerification
*/
