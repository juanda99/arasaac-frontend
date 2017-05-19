/*
 *
 * LanguageProvider reducer
 *
 */

import { fromJS } from 'immutable'
import { REHYDRATE } from 'redux-persist/constants'
import { CHANGE_LOCALE, START_TRANSLATION, STOP_TRANSLATION } from './actions'
import { DEFAULT_LOCALE } from '../App/constants'

export const initialState = fromJS({
  locale: DEFAULT_LOCALE,
  previousLocale: ''
})

function languageProviderReducer(state = initialState, action) {
  // if we start translating, change locale to af.
  // We need to remember previous locale, in order to come back when stop translating
  const currentLocale = state.get('locale')
  let previousLocale = state.get('previousLocale')
  switch (action.type) {
    case CHANGE_LOCALE:
      return state
        .set('locale', action.locale)
    case START_TRANSLATION:
      return state
        .set('previousLocale', currentLocale)
        .set('locale', 'af')
    case STOP_TRANSLATION:
      return state
        .set('locale', previousLocale)
        .set('previousLocale', '')
    case REHYDRATE:
      previousLocale = action.payload.language ? action.payload.language.get('previousLocale') : null
      return previousLocale
        ? state.set('locale', previousLocale).set('previousLocale', '')
        : state
    default:
      return state
  }
}

export default languageProviderReducer
