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
    id: 'app.containers.MaterialsView.materialsNotFound',
    description: 'Message when no materials for a specific search',
    defaultMessage: 'We are sorry, we cannot find any material'
  },
  showFilters: {
    id: 'app.containers.MaterialsView.showFilters',
    description: 'Button tooltip to show filters',
    defaultMessage: 'Show filters'
  },
  materialsFound: {
    id: 'app.containers.MaterialsView.materialsFound',
    description: 'Message when materials found',
    defaultMessage: '{materialsCounter, plural, one {We have found just one material} other {We have found {materialsCounter} materials}}'
  },
  newMaterialsFound: {
    id: 'app.containers.MaterialsView.newMaterialsFound',
    description: 'Message when no materials for a specific search',
    defaultMessage: 'We have found {materialsCounter} new or updated materials recently'
  },
  search: {
    id: 'app.containers.MaterialsView.search',
    description: 'Label for search tab',
    defaultMessage: 'Search'
  },
  new: {
    id: 'app.containers.MaterialsView.new',
    description: 'Label for new materials tab',
    defaultMessage: 'New'
  },
  new: {
    id: 'app.containers.MaterialsView.new',
    description: 'Label for new materials tab',
    defaultMessage: 'New'
  },
  pending: {
    id: 'app.containers.MaterialsView.pending',
    defaultMessage: 'Pending'
  },
  notPublished: {
    id: 'app.containers.MaterialsView.notPublished',
    defaultMessage: 'Not published'
  },
  loadingMaterials: {
    id: 'app.containers.MaterialsView.loadingMaterials',
    defaultMessage: 'Loading materials...'
  },
  advancedSearch: {
    id: 'app.containers.MaterialsView.search.advancedSearch',
    defaultMessage: 'Advanced search'
  }
})
