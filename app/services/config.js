// import queryString from 'query-string'

import jwtDecode from 'jwt-decode'
import { searchPictogramSchema } from './schemas'
const CLIENT_ID = '12345'
export const WEB_URL = 'https://localhost:3000'
export const STATIC_SERVER = 'https://beta.static.arasaac.org'
export const IMAGES_URL = `${STATIC_SERVER}/images`
export const PICTOGRAMS_URL = `${STATIC_SERVER}/pictograms`
export const LOCUTIONS_URL = `${STATIC_SERVER}/locutions`
export const MATERIALS_URL = `${STATIC_SERVER}/materials`
export const API_SERVER = 'https://beta.api.arasaac.org'
export const API_ROOT = `${API_SERVER}/api`
export const AUTH_ROOT = 'https://beta.auth.arasaac.org'
export const PRIVATE_API_ROOT = 'https://beta.privateapi.arasaac.org/api'

export const login = {
  url: `${AUTH_ROOT}/oauth/token`,
  options: (username, password) => ({
    config: {
      method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
        client_id: CLIENT_ID,
        client_secret: CLIENT_ID,
        grant_type: 'password',
        scope: 'offline_access',
      }),
    },
  }),
}
export const socialLogin = {
  url: `${AUTH_ROOT}/oauth/token`,
  options: (token, provider, locale) => ({
    config: {
      method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        client_id: CLIENT_ID,
        client_secret: CLIENT_ID,
        grant_type: provider,
        scope: 'offline_access',
        locale,
      }),
    },
  }),
}
export const changePassword = {
  url: `${PRIVATE_API_ROOT}/users/password`,
  options: (password, token) => ({
    config: {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    },
  }),
}

export const signup = {
  url: `${PRIVATE_API_ROOT}/users`,
  options: (userData) => {
    const emailData = { email: userData.email.toLowerCase().trim() }
    const data = { ...userData, ...emailData }
    return {
      config: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      },
    }
  },
}

export const updateUser = {
  url: (token) => {
    const { sub } = jwtDecode(token)
    return `${PRIVATE_API_ROOT}/users/${sub}`
  },
  options: (data) => ({
    config: {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data.user),
    },
  }),
}

export const contactForm = {
  url: `${PRIVATE_API_ROOT}/users/contact`,
  options: (userData) => {
    const emailData = { email: userData.email.toLowerCase().trim() }
    const data = { ...userData, ...emailData }
    return {
      config: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      },
    }
  },
}

export const resetPassword = {
  url: `${PRIVATE_API_ROOT}/users/password`,
  options: (userData) => {
    const emailData = { email: userData.username.toLowerCase().trim() }
    const data = { ...userData, ...emailData }
    return {
      config: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      },
    }
  },
}

export const customPicto = {
  url: `${PRIVATE_API_ROOT}/pictograms/custom/base64/`,
  options: (parameters) => ({
    config: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parameters),
    },
  }),
}

export const addFavorite = {
  url: `${PRIVATE_API_ROOT}/users/favorites`,
  options: (data) => ({
    config: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    },
  }),
}

export const getFavorites = {
  url: (locale) => `${PRIVATE_API_ROOT}/pictograms/favorites/${locale}`,
  options: (favoriteIds) => ({
    config: {
      method: 'POST',
      body: JSON.stringify({ favoriteIds }),
    },
    schema: searchPictogramSchema,
  }),
}

export const removeFavorite = {
  url: `${PRIVATE_API_ROOT}/users/favorites`,
  options: (data) => ({
    config: {
      method: 'DELETE',
      body: JSON.stringify(data),
    },
  }),
}

export const addFavoriteList = {
  url: (listName) => `${PRIVATE_API_ROOT}/users/favorites/list/${listName}`,
  options: {
    config: {
      method: 'POST',
    },
  },
}

export const deleteFavoriteList = {
  url: (listName) => `${PRIVATE_API_ROOT}/users/favorites/list/${listName}`,
  options: {
    config: {
      method: 'DELETE',
    },
  },
}

export const renameFavoriteList = {
  url: (listName) => `${PRIVATE_API_ROOT}/users/favorites/list/${listName}`,
  options: (newListName) => ({
    config: {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newListName }),
    },
  }),
}

export const materialPublish = {
  url: (id) => `${PRIVATE_API_ROOT}/materials/${id}`,
  options: (status) => ({
    config: {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    },
  }),
}

export const materialUpdate = {
  url: (id) => `${PRIVATE_API_ROOT}/materials/${id}`,
  options: (data) => ({
    config: {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    },
  }),
}

export const materialRemove = {
  url: (id) => `${PRIVATE_API_ROOT}/materials/${id}`,
  options: () => ({
    config: {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    },
  }),
}

/*
export const customPictogram = {
  url: (idPictogram, options) => {
    const getString = queryString.stringify(options)
    return `${API_ROOT}/pictograms/${idPictogram}?${getString}`
  }
}
*/

/* this is what we get:
    activities: [Number],
    areas: [Number],
    authors: [author],
    files: [file],
    languages: [language],
    screenshots: [file]
    author: {id, name}
    language: {language(string), title (string), description(string), screenshots[file], files[file]}
*/
