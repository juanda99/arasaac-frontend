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
    description: 'Title for pictogram description: keyword, meaning...',
    defaultMessage: 'Related words'
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
  color: {
    id: 'app.components.Pictogram.color',
    description: 'Toggle button to color the pictogram',
    defaultMessage: 'Color'
  },
  plural: {
    id: 'app.components.Pictogram.plural',
    description: 'Toggle button to set the pictogram in plural',
    defaultMessage: 'Plural'
  },
  backgroundColor: {
    id: 'app.components.Pictogram.backgroundColor',
    description: 'Toggle button to set a backgroundColor, by default transparent',
    defaultMessage: 'Background color'
  },
  past: {
    id: 'app.components.Pictogram.past',
    description: 'Toggle button to set the pictogram in past',
    defaultMessage: 'Past'
  },
  future: {
    id: 'app.components.Pictogram.future',
    description: 'Toggle button to set the pictogram in future',
    defaultMessage: 'Future'
  },
})
