import { denormalize } from "normalizr";
import { createSelector } from "reselect";
import { searchPictogramSchema } from "services/schemas";
import { getFilteredItems } from "utils";
import { makeSelectLocale } from "containers/LanguageProvider/selectors";
import { makeSelectFavorites } from "containers/App/selectors";
import { Map } from "immutable";

export const selectPictogramsViewDomain = (state) =>
  state.get("pictogramsView");

export const makeLoadingSelector = () =>
  createSelector(selectPictogramsViewDomain, (substate) =>
    substate.get("loading")
  );

const makeKeywordsSelector = () =>
  createSelector(selectPictogramsViewDomain, (substate) =>
    substate.get("words")
  );

export const makeKeywordsSelectorByLocale = () =>
  createSelector(
    makeKeywordsSelector(),
    makeSelectLocale(),
    (substate, locale) => substate.get(locale)
  );

export const makeShowFiltersSelector = () =>
  createSelector(selectPictogramsViewDomain, (substate) =>
    substate.get("showFilter")
  );

export const makeFiltersSelector = () =>
  createSelector(selectPictogramsViewDomain, (substate) =>
    substate.get("filters")
  );

const makePictogramsSelector = () =>
  createSelector(
    selectPictogramsViewDomain,
    makeSelectLocale(),
    (substate, locale) =>
      // pictograms.locale does not exists first time, just pictograms
      substate.getIn(["pictograms", locale]) || new Map()
  );

const makeSearchSelector = () =>
  createSelector(selectPictogramsViewDomain, (substate) =>
    substate.get("search")
  );

const makeSearchTextSelector = () => (_, ownProps) =>
  ownProps.params.searchText;

export const makeSearchResultsSelector = () =>
  createSelector(
    makeSearchSelector(),
    makeSelectLocale(),
    makeSearchTextSelector(),
    (pictograms, locale, searchText) => pictograms.getIn([locale, searchText])
  );

const makeSearchNewPictogramsSelector = () =>
  createSelector(selectPictogramsViewDomain, (substate) =>
    substate.get("newPictograms")
  );

const makeEntitiesSelector = () =>
  createSelector(makePictogramsSelector(), (pictograms) => {
    const entities = {};
    entities.pictograms = pictograms.toJS();
    return entities;
  });

export const makeVisiblePictogramsSelector = () =>
  createSelector(
    makeSearchResultsSelector(),
    makeEntitiesSelector(),
    makeFiltersSelector(),
    (searchData, entities, filters) => {
      /* searchData could be undefined */
      if (searchData == null) return [];
      const pictogramList = denormalize(
        searchData,
        searchPictogramSchema,
        entities
      );
      return getFilteredItems(pictogramList, filters);
    }
  );

export const makeListSelector = () =>
  createSelector(selectPictogramsViewDomain, (substate) =>
    substate.get("favoriteList")
  );

export const makeListFavoritesSelector = () =>
  createSelector(makeListSelector(), makeSelectFavorites(), (list, favorites) =>
    // not authenticated, return null
    favorites ? favorites.get(list) : null
  );

export const makeFavoritePictogramsSelector = () =>
  createSelector(
    makeListFavoritesSelector(),
    makeEntitiesSelector(),
    (favorites, entities) => {
      /* searchData could be undefined */
      if (favorites == null) return [];
      const pictogramList = denormalize(
        favorites,
        searchPictogramSchema,
        entities
      );
      const pictoList = pictogramList.toJS();
      // it can be calculated when pictos are not yet present
      if (pictoList.length) {
        return pictoList[0] === undefined ? [] : pictoList;
      }
      return pictogramList.toJS();
    }
  );

export const makeNewPictogramsSelector = () =>
  createSelector(
    makeSearchNewPictogramsSelector(),
    makeEntitiesSelector(),
    (searchData, entities) => {
      /* searchData could be undefined */
      if (searchData == null) return [];
      const materialList = denormalize(
        searchData,
        searchPictogramSchema,
        entities
      );
      return materialList;
    }
  );
