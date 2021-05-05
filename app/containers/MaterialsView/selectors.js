import { denormalize } from 'normalizr'
import { createSelector } from 'reselect'
import { searchMaterialSchema } from 'services/schemas'
import { getFilteredItems, NOT_PUBLISHED, PENDING } from 'utils'

import { makeSelectLocale } from 'containers/LanguageProvider/selectors'

export const selectMaterialsViewDomain = (state) => state.get('materialsView')

export const makeLoadingSelector = () =>
  createSelector(selectMaterialsViewDomain, (substate) =>
    substate.get('loading')
  )

export const makeLoadingNewSelector = () =>
  createSelector(selectMaterialsViewDomain, (substate) =>
    substate.get('loadingNew')
  )

export const makeErrorSelector = () =>
  createSelector(selectMaterialsViewDomain, (substate) => substate.get('error'))

export const makeAuthorsSelector = () =>
  createSelector(selectMaterialsViewDomain, (substate) =>
    substate.get('authors')
  )

export const makeAuthorsNameSelector = () =>
  createSelector(makeAuthorsSelector(), (substate) =>
    substate.map((author) => author.name)
  )

export const makeFiltersSelector = () =>
  createSelector(selectMaterialsViewDomain, (substate) =>
    substate.get('filters')
  )

const makeMaterialsSelector = () =>
  createSelector(selectMaterialsViewDomain, (substate) =>
    substate.get('materials')
  )

const makeSearchSelector = () =>
  createSelector(selectMaterialsViewDomain, (substate) =>
    substate.get('search')
  )

const makeSearchTextSelector = () => (_, ownProps) => ownProps.params.searchText

const makeSearchTypeSelector = () => (_, ownProps) => ({
  ...ownProps.location.query,
})

/* get materials id's for last modify materials (configured in client/server API for 30 days) */
const makeSearchNewMaterialsSelector = () =>
  createSelector(selectMaterialsViewDomain, (substate) =>
    substate.get('newMaterials')
  )

const makeEntitiesSelector = () =>
  createSelector(makeMaterialsSelector(), (materials) => {
    const entities = {}
    entities.materials = materials.toJS()
    return entities
  })

const makeMaterialsFromEntitiesSelector = () =>
  createSelector(
    makeEntitiesSelector(),
    (entities) => Object.values(entities.materials) || [] // maybe it's empty
  )

export const makePendingSelector = () =>
  createSelector(
    makeMaterialsFromEntitiesSelector(),
    makeFiltersSelector(),
    (materials, filters) => {
      const materialList = materials
        .filter((material) => material.status === PENDING)
        .sort(
          (a, b) =>
            new Date(b.lastUpdated).getTime() -
            new Date(a.lastUpdated).getTime()
        )
      return getFilteredItems(materialList, filters)
    }
  )

export const makeNotPublishedSelector = () =>
  createSelector(
    makeMaterialsFromEntitiesSelector(),
    makeFiltersSelector(),
    (materials, filters) => {
      const materialList = materials
        .filter((material) => material.status === NOT_PUBLISHED)
        .sort(
          (a, b) =>
            new Date(b.lastUpdated).getTime() -
            new Date(a.lastUpdated).getTime()
        )
      return getFilteredItems(materialList, filters)
    }
  )

/* get materials id's from a material search (specific for locale and search keywords) */
/* if undefined, it means it's necessary to make an ajax call */

export const makeSearchResultsSelector = () =>
  createSelector(
    makeSearchSelector(),
    makeSearchTypeSelector(),
    makeSelectLocale(),
    makeSearchTextSelector(),
    (materials, searchType, locale, searchText) => {
      const activity = searchType.activity
        ? parseInt(searchType.activity)
        : null
      const area = searchType.area ? parseInt(searchType.area) : null
      const language = searchType.language || null
      const searchByAuthor = searchType.searchByAuthor == 'true'
      /* if searchText, we use it, if not present return undefined to make ajax call */
      if (searchText && !searchByAuthor)
        return materials.getIn([locale, searchText])
      else if (searchText && searchByAuthor) {
        return materials.getIn(['author', searchText])
      } else if (activity && materials.getIn(['activity', activity])) {
        return materials.getIn(['activity', activity])
      } else if (area && materials.getIn(['area', area])) {
        return materials.getIn(['area', area])
      } else if (language && materials.getIn(['language', language])) {
        return materials.getIn(['language', language])
      }
      return null
    }
  )

export const makeVisibleMaterialsSelector = () =>
  createSelector(
    makeSearchResultsSelector(),
    makeEntitiesSelector(),
    makeFiltersSelector(),
    makeSearchTypeSelector(),
    makeSearchTextSelector(),
    (searchData, entities, filters, searchType, searchText) => {
      /* searchData could be undefined */
      if (searchData == null) return []
      const materialList = denormalize(
        searchData,
        searchMaterialSchema,
        entities
      )
      const searchByAuthor = searchType.searchByAuthor == 'true'
      /* if searchText, we use it, if not present return undefined to make ajax call */
      let data = []
      if (searchText && !searchByAuthor) {
        data = materialList.sort((a, b) => b.score - a.score)
      } else {
        data = materialList.sort(
          (a, b) =>
            new Date(b.lastUpdated).getTime() -
            new Date(a.lastUpdated).getTime()
        )
      }

      return getFilteredItems(data, filters)
      // return searchType === 'content'
      //   ? filterList
      //   : filterList.sort(
      //       (a, b) =>
      //         new Date(b.lastUpdated).getTime() -
      //         new Date(a.lastUpdated).getTime()
      //     )
    }
  )

export const makeNewMaterialsSelector = () =>
  createSelector(
    makeSearchNewMaterialsSelector(),
    makeEntitiesSelector(),
    makeFiltersSelector(),
    (searchData, entities, filters) => {
      /* searchData could be undefined */
      if (searchData == null) return []
      const materialList = denormalize(
        searchData,
        searchMaterialSchema,
        entities
      )
      const filterList = getFilteredItems(materialList, filters)
      return filterList.sort(
        (a, b) =>
          new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      )
    }
  )

export const makeNewVisibleMaterialsSelector = () =>
  createSelector(
    makeNewMaterialsSelector(),
    makeFiltersSelector(),
    (materialList, filters) => getFilteredItems(materialList, filters)
  )
