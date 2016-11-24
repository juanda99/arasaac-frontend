export const API_ROOT = 'http://localhost:8000/api/'
export const AUTH = {
  url: 'sessions/',
  config: (username, password) => ({
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=${username}&password=${password}`
  })
}
