export const API_SERVER = 'https://api.arasaac.org'
const AUTH_SERVER = 'https://auth.arasaac.org'
const WEB_URL = 'http://localhost:3000'
const REDIRECT_URI = `${WEB_URL}/signin`
const CLIENT_ID = '12345'
export const API_ROOT = `${API_SERVER}/api/`
export const AUTH_LOGIN = `${AUTH_SERVER}/dialog/authorize?redirect_uri=${REDIRECT_URI}&response_type=token&client_id=${CLIENT_ID}&scope=offline_access`

export const login = {
  url: 'auth/',
  config: (data) => ({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data
  })
}
export const signup = {
  url: 'register/',
  config: (data) => ({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
}
