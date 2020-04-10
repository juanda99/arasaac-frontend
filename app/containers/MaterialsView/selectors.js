import { denormalize } from 'normalizr'
import { createSelector } from 'reselect'
import { searchMaterialSchema } from 'services/schemas'
import { getFilteredItems, NOT_PUBLISHED, PENDING } from 'utils'

import { makeSelectLocale } from 'containers/LanguageProvider/selectors'

export const selectMaterialsViewDomain = (state) => state.get('materialsView')

export const makeLoadingSelector = () => createSelector(
  selectMaterialsViewDomain,
  (substate) => substate.get('loading')
)

export const makeErrorSelector = () => createSelector(
  selectMaterialsViewDomain,
  (substate) => substate.get('error')
)

export const makeShowFiltersSelector = () => createSelector(
  selectMaterialsViewDomain,
  (substate) => substate.get('showFilter')
)

export const makeFiltersSelector = () => createSelector(
  selectMaterialsViewDomain,
  (substate) => substate.get('filters')
)

const makeMaterialsSelector = () => createSelector(
  selectMaterialsViewDomain,
  (substate) => substate.get('materials')
)

const makeSearchSelector = () => createSelector(
  selectMaterialsViewDomain,
  (substate) => substate.get('search')
)

const makeSearchTextSelector = () => (_, ownProps) => ownProps.params.searchText

/* get materials id's from a material search (specific for locale and search keywords) */
/* if undefined, it means it's necessary to make an ajax call */

export const makeSearchResultsSelector = () => createSelector(
  makeSearchSelector(), makeSelectLocale(), makeSearchTextSelector(), (materials, locale, searchText) => (
    materials.getIn([locale, searchText])
  )

)

/* get materials id's for last modify materials (configured in client/server API for 30 days) */
const makeSearchNewMaterialsSelector = () => createSelector(
  selectMaterialsViewDomain,
  (substate) => substate.get('newMaterials')
)

const makeEntitiesSelector = () => createSelector(
  makeMaterialsSelector(),
  (materials) => {
    const entities = {}
    entities.materials = materials.toJS()
    return entities
  }
)

const makeMaterialsFromEntitiesSelector = () => createSelector(
  makeEntitiesSelector(),
  (entities) => Object.values(entities.materials) || [] // maybe it's empty
)

export const makePendingSelector = () => createSelector(
  makeMaterialsFromEntitiesSelector(),
  (materials) => materials.filter(material => material.status === PENDING)
)

export const makeNotPublishedSelector = () => createSelector(
  makeMaterialsFromEntitiesSelector(),
  (materials) => materials.filter(material => material.status === NOT_PUBLISHED)
)

export const makeVisibleMaterialsSelector = () => createSelector(
  makeSearchResultsSelector(), makeEntitiesSelector(), makeFiltersSelector(), (searchData, entities, filters) => {
    /* searchData could be undefined */
    if (searchData == null) return []
    const materialList = denormalize(searchData, searchMaterialSchema, entities)
    return getFilteredItems(materialList, filters)
  }
)

export const makeNewMaterialsSelector = () => createSelector(
  makeSearchNewMaterialsSelector(), makeEntitiesSelector(), (searchData, entities) => {
    /* searchData could be undefined */
    if (searchData == null) return []
    const materialList = denormalize(searchData, searchMaterialSchema, entities)
    return materialList
  }
)

export const makeNewVisibleMaterialsSelector = () => createSelector(
  makeSearchNewMaterialsSelector(), makeEntitiesSelector(), makeFiltersSelector(), (searchData, entities, filters) => {
    /* searchData could be undefined */
    if (searchData == null) return []
    const materialList = denormalize(searchData, searchMaterialSchema, entities)
    return getFilteredItems(materialList, filters)
  }
)
