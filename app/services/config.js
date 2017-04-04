export const API_ROOT = 'http://localhost:8100/api/'
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
