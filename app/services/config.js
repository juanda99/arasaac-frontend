// import queryString from 'query-string'

const CLIENT_ID = '12345'
export const WEB_URL = 'https://localhost:3000'
const STATIC_SERVER = 'https://static.arasaac.org'
export const IMAGES_URL = `${STATIC_SERVER}/images`
export const PICTOGRAMS_URL = `${STATIC_SERVER}/pictograms`
export const LOCUTIONS_URL = `${STATIC_SERVER}/locutions`
export const MATERIALS_URL = `${STATIC_SERVER}/materials`
export const API_SERVER = 'https://api.arasaac.org'
export const API_ROOT = `${API_SERVER}/api`
export const AUTH_ROOT = 'https://auth.arasaac.org'
export const PRIVATE_API_ROOT = 'https://privateapi.arasaac.org/api'
export const STORAGE_URL = 'http://storage.arasaac.org'

export const login = {
  url: `${AUTH_ROOT}/oauth/token`,
  options: (username, password) => ({
    config: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
        client_id: CLIENT_ID,
        client_secret: CLIENT_ID,
        grant_type: 'password',
        scope: 'offline_access'
      })
    }
  })
}
export const socialLogin = {
  url: `${AUTH_ROOT}/oauth/token`,
  options: (token, provider, locale) => ({
    config: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        client_id: CLIENT_ID,
        client_secret: CLIENT_ID,
        grant_type: provider,
        scope: 'offline_access',
        locale
      })
    }
  })
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
        body: JSON.stringify(data)
      }
    }
  }
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
        body: JSON.stringify(data)
      }
    }
  }
}

export const customPicto = {
  url: `${PRIVATE_API_ROOT}/pictograms/custom/base64/`,
  options: (parameters) => ({
    config: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parameters)
    }
  })
}

export const addFavorite = {
  url: `${PRIVATE_API_ROOT}/users/favorites`,
  options: (data) => ({
    config: {
      method: 'POST',
      body: JSON.stringify(data)
    }
  })
}

export const getFavorites = {
  url: (locale) => `${PRIVATE_API_ROOT}/pictograms/favorites/${locale}`,
  options: (favoriteIds) => ({
    config: {
      method: 'GET',
      body: JSON.stringify(favoriteIds)
    }
  })
}

export const removeFavorite = {
  url: `${PRIVATE_API_ROOT}/users/favorites`,
  options: (data) => ({
    config: {
      method: 'DELETE',
      body: JSON.stringify(data)
    }
  })
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

export const uploadMaterial = {
  url: `${PRIVATE_API_ROOT}/materials`,
  options: (data) => {
    const formData = new FormData()
    let translations
    const { files, screenshots, languages, activities, areas, authors } = data

    if (files) files.map((file) => formData.append('files', file))
    if (screenshots) {
      screenshots.map((screenshot) => formData.append('screenshots', screenshot))
    }
    if (languages) {
      translations = languages.map((language) => {
        if (language.files) {
          language.files.map((langFile) =>
            formData.append(`${language.language}_files`, langFile)
          )
        }
        if (language.screenshots) {
          language.screenshots.map((langFile) =>
            formData.append(`${language.language}_screenshotfiles`, langFile)
          )
        }
        return {
          title: language.title,
          desc: language.desc,
          language: language.language
        }
      })
    }
    formData.append(
      'formData',
      JSON.stringify({ areas, activities, authors, translations })
    )
    return {
      config: {
        method: 'POST',
        body: formData
      }
    }
  }
}
