// export const API_SERVER = 'https://api.arasaac.org'
export const API_SERVER = 'http://api.arasaac.org:8002'
export const API_ROOT = `${API_SERVER}/api`

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
