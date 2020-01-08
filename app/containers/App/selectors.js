import { createSelector } from 'reselect'
import { DEFAULT_LIST } from 'utils'

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

// we use Token as User
const makeSelectHasUser = () =>
  createSelector(selectAuth, (auth) => auth.get('accessToken'))

const makeSelectLoading = () =>
  createSelector(selectAuth, (auth) => auth.get('loading'))

const makeSelectFavorites = () =>
  createSelector(selectAuth, (auth) => auth.get('favorites'))

const makeSelectRootFavorites = () =>
  createSelector(makeSelectFavorites(), (favorites) =>
    favorites ? favorites.get(DEFAULT_LIST) : []
  )

const makeSelectError = () =>
  createSelector(selectAuth, (auth) => auth.get('error'))

const makeSelectRefreshToken = () =>
  createSelector(selectAuth, (auth) => auth.get('refreshToken'))

const makeSelectRefreshing = () =>
  createSelector(selectAuth, (auth) => auth.get('isRefreshing'))

const makeSelectTokens = () =>
  createSelector(
    makeSelectHasUser(),
    makeSelectRefreshToken(),
    (accessToken, refreshToken) => ({ accessToken, refreshToken })
  )

const makeSelectName = () => createSelector(
  selectAuth,
  (substate) => substate.get('name') || substate.getIn(['facebook', 'name']) || substate.getIn(['google', 'name'])
)

const makeSelectPicture = () => createSelector(
  selectAuth,
  (substate) => substate.getIn(['facebook', 'picture']) || substate.getIn(['google', 'picture'])
)

const makeSelectLastLogin = () => createSelector(
  selectAuth,
  (substate) => substate.get('lastLogin')
)

const makeSelectEmail = () => createSelector(
  selectAuth,
  (substate) => substate.get('email')
)

export {
  makeSelectLocationState,
  selectAuth,
  makeSelectHasUser,
  makeSelectRefreshToken,
  makeSelectTokens,
  makeSelectRefreshing,
  makeSelectLoading,
  makeSelectError,
  makeSelectFavorites,
  makeSelectRootFavorites,
  makeSelectName,
  makeSelectPicture,
  makeSelectLastLogin,
  makeSelectEmail
}
