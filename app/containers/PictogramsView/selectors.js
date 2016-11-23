import { createSelector } from 'reselect'

/**
 * Direct selector to the pictogramsView state domain
 */
const selectPictogramsViewDomain = () => (state) => state.get('pictogramsView')

/**
 * Other specific selectors
 */


/**
 * Default selector used by PictogramsView
 */

const selectPictogramsView = () => createSelector(
  selectPictogramsViewDomain(),
  (substate) => substate.toJS()
)

export default selectPictogramsView
export {
  selectPictogramsViewDomain
}
