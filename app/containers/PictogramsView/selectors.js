import { denormalize } from 'normalizr'
import { createSelector } from 'reselect'
import { searchPictogramSchema } from 'services/schemas'
import { getFilteredItems } from 'utils'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'

export const selectPictogramsViewDomain = (state) => state.get('pictogramsView')

export const makeLoadingSelector = () => createSelector(
  selectPictogramsViewDomain,
  (substate) => substate.get('loading')
)

export const makeShowFiltersSelector = () => createSelector(
  selectPictogramsViewDomain,
  (substate) => substate.get('showFilter')
)

export const makeFiltersSelector = () => createSelector(
  selectPictogramsViewDomain,
  (substate) => substate.get('filters')
)

const makePictogramsSelector = () => createSelector(
  selectPictogramsViewDomain,
  (substate) => substate.get('pictograms')
)

const makeSearchSelector = () => createSelector(
  selectPictogramsViewDomain,
  (substate) => substate.get('search')
)

const makeSearchTextSelector = () => (_, ownProps) => ownProps.params.searchText

export const makeSearchResultsSelector = () => createSelector(
  makeSearchSelector(), makeSelectLocale(), makeSearchTextSelector(), (pictograms, locale, searchText) => (
    pictograms.getIn([locale, searchText])
  )

)

const makeEntitiesSelector = () => createSelector(
  makePictogramsSelector(),
  (pictograms) => {
    const entities = {}
    entities.pictograms = pictograms.toJS()
    return entities
  }
)

export const makeVisiblePictogramsSelector = () => createSelector(
  makeSearchResultsSelector(), makeEntitiesSelector(), makeFiltersSelector(), (searchData, entities, filters) => {
    /* searchData could be undefined */
    if (searchData == null) return []
    const pictogramList = denormalize(searchData, searchPictogramSchema, entities)
    return getFilteredItems(pictogramList, filters)
  }
)

