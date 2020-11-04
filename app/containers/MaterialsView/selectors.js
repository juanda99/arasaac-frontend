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

export const makeLoadingNewSelector = () => createSelector(
  selectMaterialsViewDomain,
  (substate) => substate.get('loadingNew')
)

export const makeErrorSelector = () => createSelector(
  selectMaterialsViewDomain,
  (substate) => substate.get('error')
)

export const makeAuthorsSelector = () => createSelector(
  selectMaterialsViewDomain,
  (substate) => substate.get('authors')
)

export const makeAuthorsNameSelector = () => createSelector(
  makeAuthorsSelector(),
  (substate) => substate.map(author => author.name)
)

export const makeShowFiltersSelector = () => createSelector(
  selectMaterialsViewDomain,
  (substate) => substate.get('showFilter')
)

export const makeShowSettingsSelector = () => createSelector(
  selectMaterialsViewDomain,
  (substate) => substate.get('showSettings')
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

const makeSearchTypeSelector = () => (_, ownProps) => {
  const searchType = ownProps.location.search.split('searchType=')[1]
  return searchType
}

/* get materials id's from a material search (specific for locale and search keywords) */
/* if undefined, it means it's necessary to make an ajax call */

export const makeSearchResultsSelector = () => createSelector(
  makeSearchSelector(), makeSearchTypeSelector(), makeSelectLocale(), makeSearchTextSelector(), (materials, searchType, locale, searchText) =>
  searchType && searchType !== 'content' ?
    materials.getIn([searchType, searchText]) :
    materials.getIn([locale, searchText])
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
  (materials) => materials.filter(material => material.status === PENDING).sort((a, b) =>
    new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
)

export const makeNotPublishedSelector = () => createSelector(
  makeMaterialsFromEntitiesSelector(),
  (materials) => materials.filter(material => material.status === NOT_PUBLISHED).sort((a, b) =>
    new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
)

export const makeVisibleMaterialsSelector = () => createSelector(
  makeSearchResultsSelector(), makeEntitiesSelector(), makeFiltersSelector(), makeSearchTypeSelector(), (searchData, entities, filters, searchType) => {
    /* searchData could be undefined */
    if (searchData == null) return []
    const materialList = denormalize(searchData, searchMaterialSchema, entities)
    const filterList = getFilteredItems(materialList, filters)
    return searchType === 'content' ? filterList : filterList.sort((a, b) =>
      new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
  }
)

export const makeNewMaterialsSelector = () => createSelector(
  makeSearchNewMaterialsSelector(), makeEntitiesSelector(), (searchData, entities) => {
    /* searchData could be undefined */
    if (searchData == null) return []
    const materialList = denormalize(searchData, searchMaterialSchema, entities)
    return materialList.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
  }
)

export const makeNewVisibleMaterialsSelector = () => createSelector(
  makeNewMaterialsSelector(), makeFiltersSelector(), (materialList, filters) => getFilteredItems(materialList, filters))
