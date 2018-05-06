/*
 * Pictogram Messages
 *
 * This contains all the text for the Pictogram component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  authors: {
    id: 'app.components.Pictogram.authors',
    description: 'Label for authors',
    defaultMessage: 'Authors'
  },
  sharePictogram: {
    id: 'app.components.Pictogram.sharePictogram',
    description: 'Title for list of icons for sharing pictograms',
    defaultMessage: 'Share it!'
  },
  languages: {
    id: 'app.components.Pictogram.languages',
    description: 'Title for list of languages',
    defaultMessage: 'Languages'
  },
  description: {
    id: 'app.components.Pictogram.description',
    description: 'Pictogram description: keyword, meaning...',
    defaultMessage: 'Description'
  },
  meaning: {
    id: 'app.components.Pictogram.meaning',
    description: 'Meaning of pictogram associated keyword',
    defaultMessage: 'Meaning'
  },
  changePictoLanguage: {
    id: 'app.components.Pictogram.changePictoLanguage',
    description: 'Dropdown to select pictogram language',
    defaultMessage: 'Choose a language to see the pictogram description in another language'
  },
  modifyPicto: {
    id: 'app.components.Pictogram.modifyPicto',
    description: 'Title for the area of picto modifications',
    defaultMessage: 'Modify pictogram'
  },
  singular: {
    id: 'app.components.Pictogram.singular',
    description: 'Radiobutton to set the pictogram as singular',
    defaultMessage: 'Singular'
  },
  plural: {
    id: 'app.components.Pictogram.plural',
    description: 'Radiobutton to set the pictogram as plural',
    defaultMessage: 'Plural'
  }
})
