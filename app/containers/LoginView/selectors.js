import { createSelector } from 'reselect'

/**
 * Direct selector to the loginView state domain
 */
const selectLoginViewDomain = () => (state) => state.get('loginView')

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
