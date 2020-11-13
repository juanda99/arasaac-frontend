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
        const importModules = Promise.all([import('containers/HomePage')])

        const renderRoute = loadModule(cb)

        importModules.then(([component]) => {
          renderRoute(component)
        })

        importModules.catch(errorLoading)
      }
    },
    {
      path: '/aac(/:language)',
      name: 'AAC',
      getComponent(nextState, cb) {
        const importModules = Promise.all([import('containers/IntroAAC')])
        const renderRoute = loadModule(cb)
        importModules.then(([component]) => {
          renderRoute(component)
        })
        importModules.catch(errorLoading)
      }
    },
    {
      path: '/aac-users(/:language)',
      name: 'AAC-users',
      getComponent(nextState, cb) {
        const importModules = Promise.all([import('containers/IntroUsersAAC')])
        const renderRoute = loadModule(cb)
        importModules.then(([component]) => {
          renderRoute(component)
        })
        importModules.catch(errorLoading)
      }
    },
    {
      path: '/use-of-aac(/:language)',
      name: 'AAC-usage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([import('containers/IntroUsageAAC')])
        const renderRoute = loadModule(cb)
        importModules.then(([component]) => {
          renderRoute(component)
        })
        importModules.catch(errorLoading)
      }
    },
    {
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
              import('components/PictogramList')
            ])
            const renderRoute = loadModule(cb)
            importModules.then(([component]) => {
              renderRoute(component)
            })
            importModules.catch(errorLoading)
          }
        }
      ]
    },
    {
      path: '/pictograms/favorites',
      name: 'favoritesView',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/PictogramsView/reducer'),
          import('containers/PictogramsView/sagas'),
          import('containers/FavoritesView')
        ])

        const renderRoute = loadModule(cb)

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('pictogramsView', reducer.default)
          injectSagas(sagas.default)
          renderRoute(component)
        })
        importModules.catch(errorLoading)
      }
    },
    {
      path: '/activate/:activationCode',
      name: 'activateView',
      getComponent(location, cb) {
        import('containers/ActivateView')
          .then(loadModule(cb))
          .catch(errorLoading)
      }
    },
    // {
    //   path: '/activate/:activationCode',
    //   name: 'activateView',
    //   getComponent(nextState, cb) {
    //     const importModules = Promise.all([
    //       import('containers/App/reducer'),
    //       import('containers/App/sagas'),
    //       import('containers/ActivateView/')
    //     ])

    //     const renderRoute = loadModule(cb)
    //     // if reducer is async, render values:  defaultToggled:
    //     // state.configuration.filters[ownProps.filter] got undefined!!!
    //     importModules.then(([reducer, sagas, component]) => {
    //       // injectReducer('aux', reducer.default)
    //       injectSagas(sagas.default)
    //       renderRoute(component)
    //     })

    //     importModules.catch(errorLoading)
    //   }
    // },

    {
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
    },
    {
      path: '/news/upload',
      onEnter(nextState, replace, callback) {
        // onEnter gets called when we visit a route
        // childRoute changes do not trigger onEnter, which is a desired behavior
        // Prevent saga reinjection if they are running
        if (this.loadedSagas) {
          callback()
          return
        }

        // Inject sagas as usual
        const importModules = System.import('containers/UploadNewsView/sagas')

        importModules.then((sagas) => {
          this.loadedSagas = injectSagas(sagas.default)
          callback()
        })

        importModules.catch(errorLoading)
      },
      onLeave() {
        // onLeave gets called when we leave the route
        // Cancel the sagas if they are running
        if (this.loadedSagas) {
          this.loadedSagas.forEach((saga) => saga.cancel())
          delete this.loadedSagas
        }
      },
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/UploadNewsView'),
          System.import('containers/UploadNewsView/reducer')
        ])

        const renderRoute = loadModule(cb)

        importModules.then(([component, reducer]) => {
          injectReducer('uploadNewsView', reducer.default)
          renderRoute(component)
        })

        importModules.catch(errorLoading)
      }
    },
    {
      path: '/materials/upload',
      name: 'uploadMaterialView',
      getComponent(nextState, cb) {
        import('containers/UploadMaterialView')
          .then(loadModule(cb))
          .catch(errorLoading)
      }
    },
    {
      path: '/materials/update(/:idMaterial)',
      name: 'updateMaterialView',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/MaterialsView/sagas'),
          import('containers/UpdateMaterialView/')
        ])

        const renderRoute = loadModule(cb)
        // if reducer is async, render values:  defaultToggled:
        // state.configuration.filters[ownProps.filter] got undefined!!!
        importModules.then(([sagas, component]) => {
          injectSagas(sagas.default)
          renderRoute(component)
        })

        importModules.catch(errorLoading)
      }
    },
    {
      path: '/materials/add-translation(/:idMaterial)',
      name: 'uploadTranslationView',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/MaterialsView/sagas'),
          import('containers/UploadTranslationView/')
        ])

        const renderRoute = loadModule(cb)
        // if reducer is async, render values:  defaultToggled:
        // state.configuration.filters[ownProps.filter] got undefined!!!
        importModules.then(([sagas, component]) => {
          injectSagas(sagas.default)
          renderRoute(component)
        })

        importModules.catch(errorLoading)
      }
    },
    {
      path: '/materials/:locale/:idMaterial',
      name: 'materialView',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/MaterialsView/sagas'),
          import('containers/MaterialView/')
        ])

        const renderRoute = loadModule(cb)
        // if reducer is async, render values:  defaultToggled:
        // state.configuration.filters[ownProps.filter] got undefined!!!
        importModules.then(([sagas, component]) => {
          injectSagas(sagas.default)
          renderRoute(component)
        })

        importModules.catch(errorLoading)
      }
    },
    {
      path: '/pictograms/:locale/:idPictogram(/:searchText)',
      name: 'pictogramView',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/PictogramsView/reducer'),
          import('containers/PictogramsView/sagas'),
          import('containers/PictogramView/')
        ])

        const renderRoute = loadModule(cb)
        // if reducer is async, render values:  defaultToggled:
        // state.configuration.filters[ownProps.filter] got undefined!!!
        importModules.then(([reducer, sagas, component]) => {
          injectReducer('pictogramsView', reducer.default)
          injectSagas(sagas.default)
          renderRoute(component)
        })

        importModules.catch(errorLoading)
      }
    },
    {
      path: '/developers',
      name: 'DevelopersView',
      getComponent(location, cb) {
        import('containers/DevelopersView')
          .then(loadModule(cb))
          .catch(errorLoading)
      }
    },
    {
      path: '/developers/accounts',
      name: 'DevAccountView',
      getComponent(location, cb) {
        import('containers/DevAccountView')
          .then(loadModule(cb))
          .catch(errorLoading)
      }
    },
    {
      path: '/developers/api',
      name: 'ApiView',
      getComponent(location, cb) {
        import('containers/ApiView')
          .then(loadModule(cb))
          .catch(errorLoading)
      }
    },
    {
      path: '/profile',
      name: 'profileView',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/ProfileView/sagas'),
          import('containers/ProfileView/')
        ])
        const renderRoute = loadModule(cb)
        // if reducer is async, render values:  defaultToggled:
        // state.configuration.filters[ownProps.filter] got undefined!!!
        importModules.then(([sagas, component]) => {
          injectSagas(sagas.default)
          renderRoute(component)
        })
        importModules.catch(errorLoading)
      }
    },
    {
      path: '/signin',
      name: 'LoginView',
      getComponent(nextState, cb) {
        const importModules = Promise.all([import('containers/LoginView')])
        const renderRoute = loadModule(cb)
        importModules.then(([component]) => {
          renderRoute(component)
        })

        importModules.catch(errorLoading)
      }
    },
    {
      path: '/registerform',
      name: 'SignupView',
      getComponent(nextState, cb) {
        const importModules = Promise.all([import('containers/SignupView')])
        const renderRoute = loadModule(cb)
        importModules.then(([component]) => {
          renderRoute(component)
        })
        importModules.catch(errorLoading)
      }
    },
    {
      path: '/recoverpassword(/:email)',
      name: 'RecoverPasswordView',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/RecoverPasswordView')
        ])
        const renderRoute = loadModule(cb)
        importModules.then(([component]) => {
          renderRoute(component)
        })
        importModules.catch(errorLoading)
      }
    },
    {
      path: '/register',
      name: 'SignupOptionsView',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/SignupOptionsView')
        ])

        const renderRoute = loadModule(cb)

        importModules.then(([component]) => {
          renderRoute(component)
        })
        importModules.catch(errorLoading)
      }
    },
    {
      path: 'terms-of-use',
      name: 'useConditions',
      getComponent(location, cb) {
        import('containers/TermsOfUseView')
          .then(loadModule(cb))
          .catch(errorLoading)
      }
    },
    {
      path: 'privacy-policy',
      name: 'privacyPolicy',
      getComponent(location, cb) {
        import('containers/PrivacyPolicyView')
          .then(loadModule(cb))
          .catch(errorLoading)
      }
    },
    {
      path: 'cookies-policy',
      name: 'cookiesPolicy',
      getComponent(location, cb) {
        import('containers/CookiesPolicyView')
          .then(loadModule(cb))
          .catch(errorLoading)
      }
    },
    {
      path: '/prizes',
      name: 'prizes',
      getComponent(location, cb) {
        import('containers/PrizesView')
          .then(loadModule(cb))
          .catch(errorLoading)
      }
    },
    {
      path: '/world',
      name: 'world',
      getComponent(location, cb) {
        import('containers/WorldView')
          .then(loadModule(cb))
          .catch(errorLoading)
      }
    },
    {
      path: '/settings',
      name: 'settings',
      getComponent(location, cb) {
        import('containers/SettingsView')
          .then(loadModule(cb))
          .catch(errorLoading)
      }
    },
    {
      path: '/translators',
      name: 'translators',
      getComponent(location, cb) {
        import('containers/CollaboratorsView')
          .then(loadModule(cb))
          .catch(errorLoading)
      }
    },
    {
      path: 'contact-us',
      name: 'contact-us',
      getComponent(location, cb) {
        import('containers/ContactView')
          .then(loadModule(cb))
          .catch(errorLoading)
      }
    },
    {
      path: 'about-us',
      name: 'about-us',
      getComponent(location, cb) {
        import('containers/AboutView')
          .then(loadModule(cb))
          .catch(errorLoading)
      }
    },
    {
      path: '/lse/search',
      name: 'lseView',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/LSE')
        ])
        const renderRoute = loadModule(cb)
        importModules.then(([component]) => {
          renderRoute(component)
        })
        importModules.catch(errorLoading)
      },
      childRoutes: [
        {
          path: '/lse/search/:searchText',
          name: 'lseList',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('components/PictogramList')
            ])
            const renderRoute = loadModule(cb)
            importModules.then(([component]) => {
              renderRoute(component)
            })
            importModules.catch(errorLoading)
          }
        }
      ]
    },
    {
      path: 'permissionsError',
      name: 'permissionsError',
      getComponent(location, cb) {
        import('containers/PermissionsErrorView')
          .then(loadModule(cb))
          .catch(errorLoading)
      }
    },
    {
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
