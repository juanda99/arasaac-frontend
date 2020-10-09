/*
import { denormalize } from 'normalizr'
import { createSelector } from 'reselect'
import { searchMaterialSchema } from 'services/schemas'
import { getFilteredItems } from 'utils'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'
*/

export const selectNewsViewDomain = (state) => state.get("news");
