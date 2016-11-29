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

const selectShowFilters = () => createSelector(
  selectPictogramsViewDomain(),
  (substate) => substate.get('showFilters')
)

const selectPictogramsList = () => createSelector(
  selectPictogramsViewDomain(),
  (substate) => substate.get('pictograms')
)


const selectSearchKey = () => createSelector(
  selectPictogramsViewDomain(),
  (substate) => substate.get('searchkey')
)

const selectPictogramsBySearchKey = () => createSelector(
  selectPictogramsList(),
  selectSearchKey(),
  (pictogramsList, searchKey) => pictogramsList.get(searchKey)
)

export default selectPictogramsView
export {
  selectPictogramsViewDomain, selectShowFilters, selectPictogramsList, selectSearchKey, selectPictogramsBySearchKey
}
