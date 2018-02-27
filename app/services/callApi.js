import { normalize } from 'normalizr'
// import { camelizeKeys } from 'humps'
import 'isomorphic-fetch'
import { API_ROOT, AUTH_ROOT } from './config'

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
// const callApi = (endpoint, config, schema) => {
const callApi = (endpoint, options, token) => {
  console.log(endpoint)
  console.log(options)
  console.log(token)
  let schema = null
  let config = {}
  if (options) {
    schema = options.schema || null
    config = options.config || {}
  }

  // if token we add it as header
  if (token) {
    const authHeader = { headers: { Authorization: `Bearer ${token}` }}
    config = { ...config || {}, ...authHeader }
  }
  const fullUrl = (endpoint.indexOf(AUTH_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  return fetch(fullUrl, config)
    .then((response) => {
      if (response.status >= 400) {
        return Promise.reject(response.status)
        // throw new Error('Bad response from server')
      }
      return response.json()
    })
    .then((json) => (schema ? normalize(json, schema) : json)
    )
}

export default callApi
