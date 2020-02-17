import { denormalize } from 'normalizr'
import { createSelector } from 'reselect'
import { searchMaterialSchema } from 'services/schemas'
import { getFilteredItems } from 'utils'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'

export const selectUploadMaterialViewDomain = (state) => state.get('uploadMaterialView')

export const makeLoadingSelector = () => createSelector(
  selectUploadMaterialViewDomain,
  (substate) => substate.get('loading')
)

export const makeErrorSelector = () => createSelector(
  selectUploadMaterialViewDomain,
  (substate) => substate.get('loading')
)

