import { createSelector } from 'reselect'

/**
 * Direct selector to the loginView state domain
 */
const selectLoginViewDomain = () => (state) => state.get('auth')
const getToken = (state) => state.getIn(['auth', 'token'])

/**
 * Other specific selectors
 */


/**
 * Default selector used by LoginView
 */

const selectLoginView = () => createSelector(
  selectLoginViewDomain(),
  (substate) => substate.toJS()
)

export default selectLoginView
export {
  selectLoginViewDomain
}
