export const API_ROOT = 'http://localhost:8000/api/'
export const login = {
  url: 'auth/',
  config: (username, password) => ({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: `auth/username=${username}&password=${password}`
  })
}
