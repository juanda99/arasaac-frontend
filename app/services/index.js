import { searchMaterialSchema, searchPictogramSchema } from './schemas'
import callApi from './callApi'
import {
  login,
  signup,
  contactForm,
  socialLogin,
  uploadMaterial,
  customPicto,
  resetPassword,
  addFavorite,
  removeFavorite,
  getFavorites,
  addFavoriteList,
  deleteFavoriteList,
  renameFavoriteList,
  changePassword,
  updateUser,
  /* customPictogram, */
  API_ROOT,
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
  UPDATE_USER_REQUEST: ({ user, token }) => callApi(updateUser.url(token), updateUser.options(user), token),
  CONTACTFORM_REQUEST: (userData) => callApi(contactForm.url, contactForm.options(userData)),
  FAVORITE_PICTOGRAMS_REQUEST: ({ locale, favoriteIds, token }) => callApi(getFavorites.url(locale), getFavorites.options(favoriteIds), token),
  ADD_FAVORITE_REQUEST: ({ ...data, token }) => callApi(addFavorite.url, addFavorite.options(data), token),
  ADD_LIST_REQUEST: ({ listName, token }) => callApi(addFavoriteList.url(listName), addFavoriteList.options, token),
  DELETE_LIST_REQUEST: ({ listName, token }) => callApi(deleteFavoriteList.url(listName), deleteFavoriteList.options, token),
  RENAME_LIST_REQUEST: ({ listName, newListName, token }) => callApi(renameFavoriteList.url(listName), renameFavoriteList.options(newListName), token),
  DELETE_FAVORITE_REQUEST: ({ ...data, token }) => callApi(removeFavorite.url, removeFavorite.options(data), token),
  GENERATE_CUSTOM_PICTOGRAM: (parameters) =>
    callApi(customPicto.url, customPicto.options(parameters)),
  GET_KEYWORDS_BY_PICTOID: ({ language, idPictogram }) =>
    callApi(
      `${PRIVATE_API_ROOT}/pictograms/keywords/${language}/${idPictogram}`
    ),
  CATALOGS_REQUEST: () => callApi(`${PRIVATE_API_ROOT}/catalogs`),
  RESET_USER_PASSWORD: (userData) =>
    callApi(resetPassword.url, resetPassword.options(userData)),
  GET_USER_BY_EMAIL: (email, token) => callApi(`${PRIVATE_API_ROOT}/users/email/${email}`, null, token),
  CHANGE_PASSWORD: (password, token) => callApi(changePassword.url, changePassword.options(password), token),
  TRANSLATIONS_STATUS: (locale) => callApi(`${PRIVATE_API_ROOT}/translations/status/${locale}`)

  /* CUSTOM_PICTOGRAM_REQUEST: (idPictogram, options) => callApi(customPictogram.url(idPictogram, options))*/
}

export const downloadCustomPictogram = (fileName) =>
  `${PRIVATE_API_ROOT}/pictograms/custom/${fileName}`

export const downloadLocution = (locale, keyword) =>
  `${PRIVATE_API_ROOT}/locutions/${locale}/${keyword}`

export default api

/*
  signIn,
  signUp,
  sendVerificationEmail,
  emailVerification
*/
