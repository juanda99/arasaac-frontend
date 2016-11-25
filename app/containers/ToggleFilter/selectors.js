import { createSelector } from 'reselect'

/**
 * Direct selector to the toggleFilter state domain
 */
const selectToggleFilterDomain = () => (state) => state.get('toggleFilter')

/**
 * Other specific selectors
 */


/**
 * Default selector used by ToggleFilter
 */

const selectToggleFilter = () => createSelector(
  selectToggleFilterDomain(),
  (substate) => substate.toJS()
)

export default selectToggleFilter
export {
  selectToggleFilterDomain
}
