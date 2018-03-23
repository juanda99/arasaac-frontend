const CLIENT_ID = '12345'
export const WEB_URL = 'https://localhost:3000'
const STATIC_SERVER = 'https://static.arasaac.org'
export const IMAGES_URL = `${STATIC_SERVER}/images`
export const MATERIALS_URL = `${STATIC_SERVER}/materials`
export const API_SERVER = 'https://api.arasaac.org'
export const API_ROOT = `${API_SERVER}/api/`
export const AUTH_ROOT = 'https://auth.arasaac.org'


export const login = {
  url: `${AUTH_ROOT}/oauth/token`,
  options: (username, password) => ({
    config: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          username,
          password,
          client_id: CLIENT_ID,
          client_secret: CLIENT_ID,
          grant_type: 'password',
          scope: 'offline_access'
        }
      )
    }
  })
}
export const socialLogin = {
  url: `${AUTH_ROOT}/oauth/token`,
  options: (token, provider) => ({
    config: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          token,
          client_id: CLIENT_ID,
          client_secret: CLIENT_ID,
          grant_type: provider,
          scope: 'offline_access'
        }
      )
    }
  })
}
export const signup = {
  url: 'users',
  options: (userData) => ({
    config: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    }
  })
}
