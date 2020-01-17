import { defineMessages } from 'react-intl'

const scope = 'app.containersTranslationStatus'

export default defineMessages({
  noDataAvailable: {
    id: `${scope}.noDataAvailable`,
    defaultMessage: 'No data available'
  },
  webTranslationStatus: {
    id: `${scope}.webTranslationStatus`,
    defaultMessage: 'Web translation status: {webTranslatedString}%'
  },
  pictosTranslationStatus: {
    id: `${scope}.pictosTranslationStatus`,
    defaultMessage: 'Pictograms validation status (maybe already translated): {pictosValidatedString}%'
  }

})
