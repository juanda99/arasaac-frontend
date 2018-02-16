import { normalize } from 'normalizr'
// import { camelizeKeys } from 'humps'
import 'isomorphic-fetch'
import { API_ROOT, AUTH_ROOT } from './config'


// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
// const callApi = (endpoint, config, schema) => {
const callApi = (endpoint, options) => {
  let schema = null
  let config = {}
  if (options) {
    schema = options.schema || null
    config = options.config || {}
  }
  const fullUrl = (endpoint.indexOf(AUTH_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  /* const data = { type: 'SIGNUP_REQUEST',
    name: 'JUAN D. BURRO ALAEZ',
    surname: 'ALAEZ',
    email: 'juandacorreo@gmail.com',
    username: 'adsf',
    password: 'asdf'
  } */
  console.log(`CONFIG************ ${JSON.stringify(options)}`);
  console.log(`CONFIG************ ${JSON.stringify(config)}`);
  // const options = { method: 'GET', header: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
  return fetch(fullUrl, config) // could have options!
    .then((response) =>
      response.json().then((json) => {
        if (!response.ok) {
          return Promise.reject(json)
        }
      // const camelizedJson = camelizeKeys(json)
      // const nextPageUrl = getNextPageUrl(response)
      /*
        return Object.assign({},
          normalize(camelizedJson, schema),
          { nextPageUrl }
        )
      })
      */
        return schema ? normalize(json, schema) : json
      })
  )
}

export default callApi
