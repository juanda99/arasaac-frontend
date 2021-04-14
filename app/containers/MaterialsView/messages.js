/*
 * PictogramsView Messages
 *
 * This contains all the text for the PictogramsView component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  filtersBtn: {
    id: 'app.containers.SearchBox.filtersBtn',
    defaultMessage: 'Click on this button to filter your search results.',
  },
  wordSearch: {
    id: 'app.containers.SearchBox.wordSearch',
    defaultMessage: 'Search by words',
  },
  searchHint1: {
    id: 'app.containers.SearchBox.searchHint1',
    defaultMessage:
      'Enter one or more terms to search for the material, e.g. weekly agenda.',
  },
  searchHint2: {
    id: 'app.containers.SearchBox.searchHint2',
    defaultMessage:
      'To perform an exact search, enter your search terms in quotation marks, e.g. "communication notebook".',
  },
  filtersHint: {
    id: 'app.containers.SearchBox.filtersHint',
    defaultMessage:
      'You can filter search results by activity, area  or language.',
  },
  filters: {
    id: 'app.containers.SearchBox.filters',
    defaultMessage: 'Filters',
  },
  disableFilters: {
    id: 'app.containers.SearchBox.disableFilters',
    defaultMessage: 'Deactivate filters',
  },
  disableFiltersHint: {
    id: 'app.containers.SearchBox.disableFiltersHint',
    defaultMessage: 'Click on this button to deactivate the search filters',
  },
  filterResults: {
    id: 'app.containers.SearchBox.filterResults',
    defaultMessage: 'Filter results',
  },
  advSearchBtn: {
    id: 'app.containers.SearchBox.advSearchBtn',
    defaultMessage: 'Click on this button to do an advanced search.',
  },
  advSearchHint: {
    id: 'app.containers.SearchBox.advSearchHint',
    defaultMessage:
      'Click on the drop-down menu to search by Content, Author, Activity (e.g. routine, agenda, story...) or Area (e.g. Language, Mathematics, Music...).',
  },
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
  new: {
    id: 'app.containers.MaterialsView.new',
    description: 'Label for new materials tab',
    defaultMessage: 'New',
  },
  new: {
    id: 'app.containers.MaterialsView.new',
    description: 'Label for new materials tab',
    defaultMessage: 'New',
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
  next: {
    id: 'joyride.next',
    defaultMessage: 'Next',
  },
  back: {
    id: 'joyride.back',
    defaultMessage: 'Back',
  },
  skip: {
    id: 'joyride.skip',
    defaultMessage: 'Skip',
  },
  last: {
    id: 'joyride.last',
    defaultMessage: 'Last',
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
  advancedSearch: {
    id: 'app.containers.LanguageSelector.advancedSearch',
    description: 'Floating label for language selector',
    defaultMessage: 'Advanced Search',
  },
})
