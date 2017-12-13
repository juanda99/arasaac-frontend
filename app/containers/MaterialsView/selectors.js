import { denormalize } from 'normalizr'
import { createSelector } from 'reselect'
import { searchMaterialSchema } from 'services/schemas'
import { getFilteredItems } from 'utils'

export const localeSelector = (state) => state.getIn(['language', 'locale'])
export const loadingSelector = (state) => state.getIn(['materialsView', 'loading'])
export const showFiltersSelector = (state) => state.getIn(['materialsView', 'showFilter'])
export const filtersSelector = (state) => state.getIn(['materialsView', 'filters'])
export const materialsSelector = (state) => state.getIn(['materialsView', 'materials'])
export const searchSelector = (state) => state.getIn(['materialsView', 'search'])


const searchTextSelector = (_, ownProps) => ownProps.params.searchText

/* get materials id's from a material search (specific for locale and search keywords) */
export const searchResultsSelector = createSelector(
  searchSelector, localeSelector, searchTextSelector, (materials, locale, searchText) => {
    const kk = materials.getIn([locale, searchText])
    return kk
  }
  /* if undefined, it means it's necessary to make an ajax call */
)

/* get materials id's for last modify materials (configured in client/server API for 30 days) */
export const searchNewMaterialsSelector = (state) => state.getIn(['materialsView', 'newMaterials'])

export const entitiesSelector = createSelector(
  materialsSelector, (materials) => {
    const entities = {}
    entities.materials = materials.toJS()
    return entities
  }
)

export const visibleMaterialsSelector = createSelector(
  searchResultsSelector, entitiesSelector, filtersSelector, (searchData, entities, filters) => {
    /* searchData could be undefined */
    if (searchData == null) return []
    const materialList = denormalize(searchData, searchMaterialSchema, entities)
    return getFilteredItems(materialList, filters)
  }
)

export const newMaterialsSelector = createSelector(
  searchNewMaterialsSelector, entitiesSelector, (searchData, entities) => {
    /* searchData could be undefined */
    if (searchData == null) return []
    const materialList = denormalize(searchData, searchMaterialSchema, entities)
    return materialList
  }
)
