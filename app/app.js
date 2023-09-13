/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill'

// Import all the third party stuff
import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga4'
import { Provider } from 'react-redux'
import { applyRouterMiddleware, Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import FontFaceObserver from 'fontfaceobserver'
import { useScroll } from 'react-router-scroll'

import 'sanitize.css/sanitize.css'

// Import root app
import App from 'containers/App'

// Import selector for `syncHistoryWithStore`
import { makeSelectLocationState } from 'containers/App/selectors'

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider'

// Import Theme Provider
import ThemeProvider from 'containers/ThemeProvider'

// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./favicon.ico'
import '!file-loader?name=[name].[ext]!./manifest.json'
import 'file-loader?name=[name].[ext]!./.htaccess' // eslint-disable-line import/extensions
/* eslint-enable import/no-webpack-loader-syntax */

import configureStore from './store'

// Import i18n messages
import { translationMessages } from './i18n'

// Import CSS reset and Global Styles
import './global-styles'

// Import root routes
import createRoutes from './routes'

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Roboto', {})

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(
  () => {
    document.body.classList.add('fontLoaded')
  },
  () => {
    document.body.classList.remove('fontLoaded')
  }
)

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
// const initialState = {}
// const store = configureStore(initialState, browserHistory)

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
// const history = syncHistoryWithStore(browserHistory, store, {
//   selectLocationState: makeSelectLocationState()
// })

// // Set up the router, wrapping all Routes in the App component
// const rootRoute = {
//   component: App,
//   childRoutes: createRoutes(store)
// }

const render = async (messages) => {
  // Create redux store with history
  const initialState = {}
  const store = await configureStore(initialState, browserHistory)
  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: makeSelectLocationState(),
  })
  // Set up the router, wrapping all Routes in the App component
  const rootRoute = {
    component: App,
    childRoutes: createRoutes(store),
  }
  ReactGA.initialize('G-3H233XF985')

  // Send pageview with a custom path
  ReactGA.send({
    hitType: 'pageview',
    page: window.location.pathname + window.location.search,
  })

  // ReactGA.pageview(window.location.pathname + window.location.search)
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ThemeProvider>
          <Router
            history={history}
            routes={rootRoute}
            render={
              // Scroll to top when going to a new page, imitating default browser
              // behaviour
              applyRouterMiddleware(useScroll())
            }
          />
        </ThemeProvider>
      </LanguageProvider>
    </Provider>,
    document.getElementById('app')
  )
}

// Hot reloadable translation json files
if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept('./i18n', () => {
    render(translationMessages)
  })
}

// Chunked polyfill for browsers without Intl support
// if (!window.Intl) {
//   new Promise((resolve) => {
//     resolve(import('intl'))
//   })
//     .then(() =>
//       Promise.all([
//         import('intl/locale-data/jsonp/en.js'),
//         import('intl/locale-data/jsonp/bg.js'),
//         import('intl/locale-data/jsonp/nl.js'),
//         import('intl/locale-data/jsonp/es.js'),
//         import('intl/locale-data/jsonp/fr.js'),
//         import('intl/locale-data/jsonp/it.js'),
//         import('intl/locale-data/jsonp/de.js'),
//         import('intl/locale-data/jsonp/nl.js'),
//         import('intl/locale-data/jsonp/pt.js'),
//         import('intl/locale-data/jsonp/he.js'),
//         import('intl/locale-data/jsonp/hr.js'),
//         import('intl/locale-data/jsonp/hu.js'),
//         import('intl/locale-data/jsonp/ca.js'),
//         import('intl/locale-data/jsonp/gl.js'),
//         import('intl/locale-data/jsonp/ro.js'),
//         import('intl/locale-data/jsonp/ru.js'),
//         import('intl/locale-data/jsonp/sk.js'),
//         import('intl/locale-data/jsonp/ar.js'),
//         import('intl/locale-data/jsonp/eu.js'),
//         import('intl/locale-data/jsonp/zh.js'),
//         import('intl/locale-data/jsonp/af.js'),
//         import('intl/locale-data/jsonp/mk.js'),
//         import('intl/locale-data/jsonp/el.js'),
//         import('intl/locale-data/jsonp/sq.js'),
//         import('intl/locale-data/jsonp/el.js'),
//         import('intl/locale-data/jsonp/et.js')
//       ])
//     )
//     .then(() => render(translationMessages))
//     .catch((err) => {
//       throw err
//     })
// } else {
//   render(translationMessages)
// }

/* comment polyfill for intl and just render  translationMessages: */
render(translationMessages)

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install() // eslint-disable-line global-require
} else {
  const Perf = require('react-addons-perf') // eslint-disable-line global-require
  window.Perf = Perf
}
