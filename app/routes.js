// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors'

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err) // eslint-disable-line no-console
}

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default)
}

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store) // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HomePage')
        ])

        const renderRoute = loadModule(cb)

        importModules.then(([component]) => {
          renderRoute(component)
        })

        importModules.catch(errorLoading)
      }
    }, {
      path: '/pictograms/search',
      name: 'pictogramsView',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/PictogramsView/reducer'),
          import('containers/PictogramsView/sagas'),
          import('containers/PictogramsView')
        ])

        const renderRoute = loadModule(cb)

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('pictogramsView', reducer.default)
          injectSagas(sagas.default)
          renderRoute(component)
        })
        importModules.catch(errorLoading)
      },
      childRoutes: [
        {
          path: '/pictograms/search/:searchText',
          name: 'gallery',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('components/Gallery')
            ])
            const renderRoute = loadModule(cb)
            importModules.then(([component]) => {
              renderRoute(component)
            })
            importModules.catch(errorLoading)
          }
        }
      ]
    }, {
      path: '/materials/search',
      name: 'materialsView',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/MaterialsView/reducer'),
          import('containers/MaterialsView/sagas'),
          import('containers/MaterialsView')
        ])

        const renderRoute = loadModule(cb)

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('materialsView', reducer.default)
          injectSagas(sagas.default)
          renderRoute(component)
        })
        importModules.catch(errorLoading)
      },
      childRoutes: [
        {
          path: '/materials/search/:searchText',
          name: 'gallery',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('components/MaterialList')
            ])
            const renderRoute = loadModule(cb)
            importModules.then(([component]) => {
              renderRoute(component)
            })
            importModules.catch(errorLoading)
          }
        }
      ]
    }, {
      path: '/configuration',
      name: 'configurationView',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          // import('containers/ConfigurationView/reducer'),
          import('containers/ConfigurationView/')
        ])

        const renderRoute = loadModule(cb)
        // if reducer is async, render values:  defaultToggled:
        // state.configuration.filters[ownProps.filter] got undefined!!!
        importModules.then(([component]) => {
          // injectReducer('configuration', reducer.default)
          renderRoute(component)
        })

        importModules.catch(errorLoading)
      }
    }, {
      path: '/configuration',
      name: 'configurationView',
      getComponent(location, cb) {
        import('containers/ConfigurationView')
          .then(loadModule(cb))
          .catch(errorLoading)
      }
    }, {
      path: '/pictograms/api',
      name: 'ApiView',
      getComponent(location, cb) {
        import('containers/ApiView')
          .then(loadModule(cb))
          .catch(errorLoading)
      }
    }, {
      path: '/materials/upload',
      name: 'uploadMaterialView',
      getComponent(location, cb) {
        import('containers/UploadMaterialView')
          .then(loadModule(cb))
          .catch(errorLoading)
      }
    }, {
      path: '/signin',
      name: 'LoginView',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/LoginView/reducer'),
          // import('containers/LoginView/sagas'),
          import('containers/LoginView')
        ])

        const renderRoute = loadModule(cb)

        importModules.then(([reducer, component]) => {
          injectReducer('LoginView', reducer.default)
          // injectSagas(sagas.default)
          renderRoute(component)
        })

        importModules.catch(errorLoading)
      }
    }, {
      path: 'register',
      name: 'SignupView',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/SignupView/reducer'),
          import('containers/SignupView/sagas'),
          import('containers/SignupView')
        ])

        const renderRoute = loadModule(cb)

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('register', reducer.default)
          injectSagas(sagas.default)
          renderRoute(component)
        })

        importModules.catch(errorLoading)
      }
    }, {
      path: '/register-options',
      name: 'loginView',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          // import('containers/LoginView/reducer'),
          // import('containers/LoginView/sagas'),
          import('containers/LoginView')
        ])

        const renderRoute = loadModule(cb)

        importModules.then(([component]) => {
          // injectReducer('loginView', reducer.default)
          // injectSagas(sagas.default)
          renderRoute(component)
        })
        importModules.catch(errorLoading)
      }
    }, {
      path: 'use-conditions',
      name: 'useConditions',
      getComponent(location, cb) {
        import('components/UseConditions')
          .then(loadModule(cb))
          .catch(errorLoading)
      }
    }, {
      path: 'privacy-policy',
      name: 'privacyPolicy',
      getComponent(location, cb) {
        import('components/PrivacyPolicy')
          .then(loadModule(cb))
          .catch(errorLoading)
      }
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading)
      }
    }
  ]
}
