/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { addLocaleData } from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import esLocaleData from 'react-intl/locale-data/es'

import enTranslationMessages from './translations/en.json'
import esTranslationMessages from './translations/es.json'

import { DEFAULT_LOCALE } from './containers/App/constants'; // eslint-disable-line

addLocaleData(enLocaleData)
addLocaleData(esLocaleData)

export const appLocales = [
  'en',
  'es'
]

addLocaleData(enLocaleData)

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages = locale !== DEFAULT_LOCALE ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages) : {}
  const formattedMessages = {}
  const messageKeys = Object.keys(messages)

  for (const messageKey of messageKeys) { // eslint-disable-line
    if (locale === DEFAULT_LOCALE) {
      formattedMessages[messageKey] = messages[messageKey]
    } else {
      formattedMessages[messageKey] = messages[messageKey] || defaultFormattedMessages[messageKey]
    }
  }

  return formattedMessages
}

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  es: formatTranslationMessages('es', esTranslationMessages)
}
