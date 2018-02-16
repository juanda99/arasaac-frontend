const CLIENT_ID = '12345'
export const WEB_URL = 'http://localhost:3000'
export const API_SERVER = 'https://api.arasaac.org'
export const API_ROOT = `${API_SERVER}/api/`
export const AUTH_ROOT = 'https://auth.arasaac.org'


export const login = {
  url: `${AUTH_ROOT}/oauth/token`,
  options: {
    config:
    (data) => ({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:
      {
        username: data.username,
        password: data.password,
        client_id: CLIENT_ID,
        client_secret: CLIENT_ID,
        grant_type: 'password',
        scope: 'offline_access'
      }
    })
  }
}
export const signup = {
  url: 'register/',
  config: (data) => ({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body:
    {
      username: data.username,
      password: data.password,
      client_id: CLIENT_ID,
      client_secret: CLIENT_ID,
      grant_type: 'password',
      scope: 'offline_access'
    }
  })
}
