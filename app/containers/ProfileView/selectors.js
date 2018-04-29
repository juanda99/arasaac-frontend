import { selectAuth } from 'containers/App/selectors'
import { createSelector } from 'reselect'

const selectName = () => createSelector(
  selectAuth,
  (substate) => substate.get('name') || substate.getIn(['facebook', 'name']) || substate.getIn(['google', 'name'])
)

const selectPicture = () => createSelector(
  selectAuth,
  (substate) => substate.getIn(['facebook', 'picture']) || substate.getIn(['google', 'picture'])
)

const selectLastLogin = () => createSelector(
  selectAuth,
  (substate) => substate.get('lastLogin')
)

export { selectName, selectPicture, selectLastLogin }
