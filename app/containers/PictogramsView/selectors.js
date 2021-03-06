import { denormalize } from 'normalizr'
import { createSelector } from 'reselect'
import { searchPictogramSchema } from 'services/schemas'
// import { makeSelectLocale } from 'containers/LanguageProvider/selectors'
import { makeSelectFavorites } from 'containers/App/selectors'
import { Map } from 'immutable'
import { makeSelectSearchLanguage } from 'containers/App/selectors'

export const selectPictogramsViewDomain = (state) => state.get('pictogramsView')

export const makeLoadingSelector = () =>
  createSelector(selectPictogramsViewDomain, (substate) =>
    substate.get('loading')
  )

export const makeLoadingNewSelector = () =>
  createSelector(selectPictogramsViewDomain, (substate) =>
    substate.get('loading')
  )

const makeKeywordsSelector = () =>
  createSelector(selectPictogramsViewDomain, (substate) =>
    substate.get('words')
  )

export const makeSelectPictogramSearchLanguage = () =>
  createSelector(
    selectPictogramsViewDomain,
    makeSelectSearchLanguage(),
    (substate, locale) =>
      substate.get('searchLanguage') ? substate.get('searchLanguage') : locale
  )

export const makeKeywordsSelectorByLocale = () =>
  createSelector(
    makeKeywordsSelector(),
    makeSelectPictogramSearchLanguage(),
    (substate, locale) => substate.get(locale)
  )

const makeCategoriesSelector = () =>
  createSelector(selectPictogramsViewDomain, (substate) =>
    substate.get('categories')
  )

export const makeCategoriesSelectorByLocale = () =>
  createSelector(
    makeCategoriesSelector(),
    makeSelectPictogramSearchLanguage(),
    (substate, locale) => substate.get(locale)
  )

const makePictogramsSelector = () =>
  createSelector(
    selectPictogramsViewDomain,
    makeSelectPictogramSearchLanguage(),
    (substate, locale) => substate.getIn(['pictograms', locale]) || new Map()
  )

const makeSearchSelector = () =>
  createSelector(selectPictogramsViewDomain, (substate) =>
    substate.get('search')
  )

const makeSearchTextSelector = () => (_, ownProps) => ownProps.params.searchText

export const makeSearchResultsSelector = () =>
  createSelector(
    makeSearchSelector(),
    makeSelectPictogramSearchLanguage(),
    makeSearchTextSelector(),
    (pictograms, locale, searchText) => pictograms.getIn([locale, searchText])
  )

const makeSearchNewPictogramsSelector = () =>
  createSelector(selectPictogramsViewDomain, (substate) =>
    substate.get('newPictograms')
  )

const makeEntitiesSelector = () =>
  createSelector(makePictogramsSelector(), (pictograms) => {
    const entities = {}
    entities.pictograms = pictograms.toJS()
    return entities
  })

export const makeVisiblePictogramsSelector = () =>
  createSelector(
    makeSearchResultsSelector(),
    makeEntitiesSelector(),
    (searchData, entities, filters) => {
      /* searchData could be undefined */
      if (searchData == null) return []
      const pictogramList = denormalize(
        searchData,
        searchPictogramSchema,
        entities
      )
      const aacColorPictograms = pictogramList.filter(
        (pictogram) => pictogram.aacColor
      )
      /* hack to duplicate pictograms  when we need to remove color for AAC purposes */
      let skip = false
      pictogramList.forEach((pictogram, index) => {
        if (pictogram.aacColor && !skip) {
          const AACPictogram = JSON.parse(JSON.stringify(pictogram))
          AACPictogram.showAAC = true
          AACPictogram._id = `${pictogram._id}aac`
          pictogramList.splice(index, 0, AACPictogram)
          skip = true
        } else skip = false
      })
      return pictogramList
    }
  )

export const makeListSelector = () =>
  createSelector(selectPictogramsViewDomain, (substate) =>
    substate.get('favoriteList')
  )

export const makeListFavoritesSelector = () =>
  createSelector(makeListSelector(), makeSelectFavorites(), (list, favorites) =>
    // not authenticated, return null
    favorites ? favorites.get(list) : null
  )

export const makeFavoritePictogramsSelector = () =>
  createSelector(
    makeListFavoritesSelector(),
    makeEntitiesSelector(),
    (favorites, entities) => {
      /* searchData could be undefined */
      if (favorites == null) return []
      const pictogramList = denormalize(
        favorites,
        searchPictogramSchema,
        entities
      )
      const pictoList = pictogramList.toJS()
      // it can be calculated when pictos are not yet present
      if (pictoList.length) {
        return pictoList[0] === undefined ? [] : pictoList
      }
      return pictogramList.toJS()
    }
  )

export const makeNewPictogramsSelector = () =>
  createSelector(
    makeSearchNewPictogramsSelector(),
    makeEntitiesSelector(),
    (searchData, entities) => {
      /* searchData could be undefined */
      if (searchData == null) return []
      const materialList = denormalize(
        searchData,
        searchPictogramSchema,
        entities
      )
      return materialList
    }
  )
