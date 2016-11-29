import { createSelector } from 'reselect'

/**
 * Direct selector to the pictogramsView state domain
 */
const selectConfigurationViewDomain = () => (state) => state.get('configuration')

/**
 * Other specific selectors
 */


/**
 * Default selector used by PictogramsView
 */

const selectConfigurationView = () => createSelector(
  selectConfigurationViewDomain(),
  (substate) => substate.toJS()
)


export default selectConfigurationView
export {
  selectConfigurationViewDomain
}
