import { createSelector } from 'reselect'

// makeSelectLocationState expects a plain JS object for the routing state
const makeSelectLocationState = () => {
  let prevRoutingState
  let prevRoutingStateJS

  return (state) => {
    const routingState = state.get('route') // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState
      prevRoutingStateJS = routingState.toJS()
    }

    return prevRoutingStateJS
  }
}

const selectAuth = (state) => state.get('auth')

const makeSelectToken = () => createSelector(
  selectAuth(),
  (auth) => auth.get('token')
)

const makeSelectRefreshToken = () => createSelector(
  selectAuth(),
  (auth) => auth.get('refreshToken')
)

const makeSelectTokens = () => createSelector(
  makeSelectToken, makeSelectRefreshToken, (token, refreshToken) => ({ token, refreshToken })
)

export {
  makeSelectLocationState,
  selectAuth,
  makeSelectToken,
  makeSelectRefreshToken,
  makeSelectTokens
}
