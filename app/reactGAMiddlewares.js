import ReactGA from 'react-ga4'

const options = {}

const trackPage = (page) => {
  // Send pageview with a custom path
  ReactGA.send({
    hitType: 'pageview',
    page,
  })
}

let currentPage = ''

export const googleAnalytics = (store) => (next) => (action) => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    const nextPage = `${action.payload.pathname}${action.payload.search}`
    if (currentPage !== nextPage) {
      currentPage = nextPage
      trackPage(nextPage)
    }
  }

  return next(action)
}
