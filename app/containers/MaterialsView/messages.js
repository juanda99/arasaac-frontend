/*
 * PictogramsView Messages
 *
 * This contains all the text for the PictogramsView component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  materialsNotFound: {
    id: 'app.containers.MaterialsView.materialsNotFound',
    description: 'Message when no materials for a specific search',
    defaultMessage: 'We are sorry, we cannot find any material',
  },
  materialsFound: {
    id: 'app.containers.MaterialsView.materialsFound',
    description: 'Message when materials found',
    defaultMessage:
      '{materialsCounter, plural, one {We have found just one material} other {We have found {materialsCounter} materials}}',
  },
  newMaterialsFound: {
    id: 'app.containers.MaterialsView.newMaterialsFound',
    description: 'Message when no materials for a specific search',
    defaultMessage:
      'We have found {materialsCounter} new or updated materials recently',
  },
  search: {
    id: 'app.containers.MaterialsView.search',
    description: 'Label for search tab',
    defaultMessage: 'Search',
  },
  pending: {
    id: 'app.containers.MaterialsView.pending',
    defaultMessage: 'Pending',
  },
  notPublished: {
    id: 'app.containers.MaterialsView.notPublished',
    defaultMessage: 'Not published',
  },
  loadingMaterials: {
    id: 'app.containers.MaterialsView.loadingMaterials',
    defaultMessage: 'Loading materials...',
  },
  pageTitle: {
    id: 'app.MaterialsView.pageTitle',
    defaultMessage: 'AAC shared material resources - ARASAAC',
  },
  pageDescription: {
    id: 'app.MaterialsView.pageDescription',
    defaultMessage:
      'AAC material resources for professionals and families. Download Augmentative and Alternative Communication documents, boards, worksheets...',
  },
  pageTitleSearch: {
    id: 'app.MaterialsView.pageTitleSearch',
    defaultMessage:
      'AAC shared material resources related to {searchText} - ARASAAC',
  },
  pageDescriptionSearch: {
    id: 'app.MaterialsView.pageDescriptionSearch',
    defaultMessage:
      'AAC material resources related to {searchText} for professionals and families. Download Augmentative and Alternative Communication documents, boards, worksheets...',
  },
})
