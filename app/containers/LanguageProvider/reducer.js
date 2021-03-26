/*
 *
 * LanguageProvider reducer
 *
 */

import { fromJS } from 'immutable'
import { CHANGE_LOCALE, START_TRANSLATION, STOP_TRANSLATION } from './actions'
import { DEFAULT_LOCALE } from '../App/constants'
import { getDirection } from 'utils'

export const initialState = fromJS({
  locale: DEFAULT_LOCALE,
  previousLocale: '',
  direction: getDirection(DEFAULT_LOCALE),
})

function languageProviderReducer(state = initialState, action) {
  // if we start translating, change locale to af.
  // We need to remember previous locale, in order to come back when stop translating
  const currentLocale = state.get('locale')
  const previousLocale = state.get('previousLocale')
  switch (action.type) {
    case CHANGE_LOCALE:
      const direction = getDirection(action.locale)
      return state.set('locale', action.locale).set('direction', direction)
    case START_TRANSLATION:
      return state.set('previousLocale', currentLocale).set('locale', 'af')
    case STOP_TRANSLATION:
      return state.set('locale', previousLocale).set('previousLocale', '')
    // eslint-disable-next-line no-case-declarations
    default:
      return state
  }
}

export default languageProviderReducer
