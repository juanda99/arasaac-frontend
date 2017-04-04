import { normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import 'isomorphic-fetch'
import { API_ROOT } from './config'

// Extracts the next page URL from Github API response.
function getNextPageUrl(response) {
  const link = response.headers.get('link')
  if (!link) {
    return null
  }

  const nextLink = link.split(',').find((s) => s.indexOf('rel="next"') > -1)
  if (!nextLink) {
    return null
  }

  return nextLink.split(';')[0].slice(1, -1)
}

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = (endpoint, config, schema) => {
  // console.log('1 envio')
  // console.log('config ' + JSON.stringify(config))
  console.log ('juanda')
  console.log(schema)
  console.log(config)
  console.log(endpoint)
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  console.log (fullUrl)
  /* const data = { type: 'SIGNUP_REQUEST',
    name: 'JUAN D. BURRO ALAEZ',
    surname: 'ALAEZ',
    email: 'juandacorreo@gmail.com',
    username: 'adsf',
    password: 'asdf'
  } */

  return fetch(fullUrl, { method: 'GET', header: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    .then((response) => {
      console.log('respuesta:' + JSON.stringify(response))
      response.json().then((json) => ({ json, response }))
    }).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      const camelizedJson = camelizeKeys(json)
      const nextPageUrl = getNextPageUrl(response)

      if (schema) {
        return Object.assign({}, normalize(camelizedJson, schema), { nextPageUrl })
      }
      return Object.assign({}, camelizedJson, { nextPageUrl }) // else for login (no schema)
    })
    .then(
      (response) => ({ response }),
      (error) => ({ error: error.message || 'Something bad happened' })
    )
}

export default callApi
