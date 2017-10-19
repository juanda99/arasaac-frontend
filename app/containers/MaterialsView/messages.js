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
  materialsNotFound: {
    id: 'app.containers.MaterialsView',
    description: 'Message when no materials for a specific search',
    defaultMessage: 'We are sorry, we cannot find any material'
  },
  showFilters: {
    id: 'app.containers.MaterialsView.showFilters',
    description: 'Button tooltip to show filters',
    defaultMessage: 'Show filters'
  },
  showCategories: {
    id: 'app.containers.MaterialsView.showCategories',
    description: 'Button tooltip to show categories on search items',
    defaultMessage: 'Show categories in search results'
  },
  showSettings: {
    id: 'app.containers.MaterialsView.showSettings',
    description: 'Button tooltip to show search settings',
    defaultMessage: 'Show search settings'
  }
})
