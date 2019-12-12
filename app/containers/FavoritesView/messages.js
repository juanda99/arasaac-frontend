/*
 * PictogramsView Messages
 *
 * This contains all the text for the PictogramsView component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  advancedSearch: {
    id: 'app.containers.SearchBox.advancedSearch',
    description: 'Label for filtering Search',
    defaultMessage: 'Advanced Search'
  },
  pictogramsNotFound: {
    id: 'app.containers.PictogramsView.pictogramsNotFound',
    description: 'Message when no pictograms for a specific search',
    defaultMessage: 'We are sorry, we cannot find any pictogram'
  },
  pictogramsFound: {
    id: 'app.containers.PictogramsView.pictogramsFound',
    description: 'Message when pictograms found',
    defaultMessage:
      '{pictogramsCounter, plural, one {We have found just one pictogram} other {We have found {pictogramsCounter} pictograms}}'
  },
  newPictogramsFound: {
    id: 'app.containers.PictogramsView.newPictogramsFound',
    description: 'Message when no pictograms for a specific search',
    defaultMessage:
      'We have found {pictogramsCounter} new or updated pictograms in the last 30 days'
  },
  contentNotAvailableWithoutAuth: {
    id: 'app.containers.PictogramsView.contentNotAvailableWithoutAuth',
    description: 'Message to show when no auth and user not logged in',
    defaultMessage: 'This content is only available for authenticated users'
  },
  signin: {
    id: 'app.containers.PictogramsView.signin',
    description: 'signin button',
    defaultMessage: 'Sign in'
  },
  addList: {
    id: 'app.containers.PictogramsView.addList',
    defaultMessage: 'Add list'
  },
  addListHint: {
    id: 'app.containers.PictogramsView.addListHint',
    defaultMessage: 'Type the name of the new list'
  },
  listName: {
    id: 'app.containers.PictogramsView.listName',
    defaultMessage: 'List name'
  }
})
