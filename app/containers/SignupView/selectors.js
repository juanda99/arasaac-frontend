import { createSelector } from 'reselect'

/**
 * Direct selector to the registerView state domain
 */
const selectRegisterViewDomain = () => (state) => state.get('registerView')

/**
 * Other specific selectors
 */


/**
 * Default selector used by RegisterView
 */

const selectRegisterView = () => createSelector(
  selectRegisterViewDomain(),
  (substate) => substate.toJS()
)

export default selectRegisterView
export {
  selectRegisterViewDomain
}
