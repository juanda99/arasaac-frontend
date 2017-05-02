/*
 * ConfigurationView Messages
 *
 * This contains all the text for the ConfigurationView component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  appConfiguration: {
    id: 'app.containers.ConfigurationView.title',
    description: 'Title for Arasaac configuration view',
    defaultMessage: 'Arasaac configuration'
  },
  filterCatalog: {
    id: 'app.components.PictogramsFiltersConf.filterCatalog',
    description: 'Conf option filter by Catalog',
    defaultMessage: 'Catalog'
  },
  filterLicense: {
    id: 'app.components.PictogramsFiltersConf.filterLicense',
    description: 'Conf option filter by License',
    defaultMessage: 'License'
  },
  filterSize: {
    id: 'app.components.PictogramsFiltersConf.filterSize',
    description: 'Conf option filter by Size',
    defaultMessage: 'Size'
  },
  searchPictograms: {
    id: 'app.components.PictogramsFiltersConf.searchPictograms',
    description: 'Menu item',
    defaultMessage: 'Search Pictograms'
  },
  searchMaterials: {
    id: 'app.components.PictogramsFiltersConf.searchMaterials',
    description: 'Menu item',
    defaultMessage: 'Search Materials'
  },
  filters: {
    id: 'app.components.PictogramsFiltersConf.filters',
    description: 'Configuration title for filters',
    defaultMessage: 'Filters'
  },
  pictogramFiltersDesc: {
    id: 'app.components.ConfigurationView.pictogramFiltersDesc',
    description: 'Configuration description for filters',
    defaultMessage: 'Select the filters you want to enable for searching pictograms'
  },
  materialFiltersDesc: {
    id: 'app.components.ConfigurationView.materialFiltersDesc',
    description: 'Configuration description for filters',
    defaultMessage: 'Select the filters you want to enable for searching materials'
  }
})
