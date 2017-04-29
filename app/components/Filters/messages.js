/*
 * Filters Messages
 *
 * This contains all the text for the Filters component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  allCatalogs: {
    id: 'app.components.Filters.SelectCatalog.all',
    description: 'Menu choose catalog',
    defaultMessage: 'All catalogs'
  },
  catalog: {
    id: 'app.components.Filters.SelectCatalog.catalog',
    description: 'Menu choose catalog initial text',
    defaultMessage: 'Catalog'
  },
  colorPictograms: {
    id: 'app.components.Filters.SelectCatalog.colorPictograms',
    description: 'Menu choose catalog',
    defaultMessage: 'Color pictograms'
  },
  blackAndWhitePictograms: {
    id: 'app.components.Filters.SelectCatalog.blackAndWhitePictograms',
    description: 'Menu choose catalog',
    defaultMessage: 'Black and white pictograms'
  },
  pictures: {
    id: 'app.components.Filters.SelectCatalog.pictures',
    description: 'Menu choose catalog',
    defaultMessage: 'Pictures'
  },
  lseVideos: {
    id: 'app.components.Filters.SelectCatalog.lseVideos',
    description: 'Menu choose catalog',
    defaultMessage: 'LSE Videos'
  },
  lseColor: {
    id: 'app.components.Filters.SelectCatalog.lseColor',
    description: 'Menu choose catalog',
    defaultMessage: 'LSE Color'
  },
  choose: {
    id: 'app.components.Filters.SelectLicense.choose',
    description: 'Menu choose license',
    defaultMessage: 'Usage rights'
  },
  reuseMofified: {
    id: 'app.components.Filters.SelectLicense.reuseModified',
    description: 'Menu choose license',
    defaultMessage: 'Labeled for reuse with modification'
  },
  reuse: {
    id: 'app.components.Filters.SelectLicense.reuse',
    description: 'Menu choose license',
    defaultMessage: 'Labeled for reuse'
  },
  nonCommercialModified: {
    id: 'app.components.Filters.SelectLicense.nonCommercialModified',
    description: 'Menu choose license',
    defaultMessage: 'Labeled for noncommercial reuse with modification'
  },
  nonCommercial: {
    id: 'app.components.Filters.SelectLicense.nonCommercial',
    description: 'Menu choose license',
    defaultMessage: 'Labeled for noncommercial reuse'
  },
  all: {
    id: 'app.components.Filters.SelectLicense.all',
    description: 'Menu choose license',
    defaultMessage: 'Not filtered by license'
  },
  size: {
    id: 'size.choose',
    description: 'Menu choose catalog',
    defaultMessage: 'Size'
  },
  any: {
    id: 'app.components.Filters.SelectSize.any',
    description: 'Menu choose any Size',
    defaultMessage: 'Any size'
  },
  large: {
    id: 'app.components.Filters.SelectSize.large',
    description: 'Menu display large size',
    defaultMessage: 'Large'
  },
  medium: {
    id: 'app.components.Filters.SelectSize.medium',
    description: 'Menu display medium size',
    defaultMessage: 'Medium'
  },
  small: {
    id: 'app.components.Filters.SelectSize.small',
    description: 'Menu choose display small size',
    defaultMessage: 'Small'
  },
  largeChoose: {
    id: 'app.components.Filters.SelectSize.largeChoose',
    description: 'Menu choose large size',
    defaultMessage: 'Large, wider than 1000px'
  },
  mediumChoose: {
    id: 'app.components.Filters.SelectSize.mediumChoose',
    description: 'Menu choose meium size',
    defaultMessage: 'Medium, width between 500px and 1000px'
  },
  smallChoose: {
    id: 'app.components.Filters.SelectSize.smallChoose',
    description: 'Menu choose small size',
    defaultMessage: 'Small, wide less than 500px'
  },
  selfawareness: {
    id: 'app.components.Filters.SelectArea.selfawareness',
    description: 'Menu choose material area',
    defaultMessage: 'Self-awareness and personal autonomy'
  },
  visualdiscrimination: {
    id: 'app.components.Filters.SelectArea.visualdiscrimination',
    description: 'Menu choose material area',
    defaultMessage: 'Language: Visual discrimination'
  },
  auditorydiscrimination: {
    id: 'app.components.Filters.SelectArea.auditorydiscrimination',
    description: 'Menu choose material area',
    defaultMessage: 'Language: Auditory discrimination'
  },
  phonology: {
    id: 'app.components.Filters.SelectArea.phonology',
    description: 'Menu choose material area',
    defaultMessage: 'Language: Phonology'
  },
  morphosyntax: {
    id: 'app.components.Filters.SelectArea.morphosyntax',
    description: 'Menu choose material area',
    defaultMessage: 'Language: Morphosyntax'
  },
  semantics: {
    id: 'app.components.Filters.SelectArea.semantics',
    description: 'Menu choose material area',
    defaultMessage: 'Language: Semantics'
  },
  pragmatics: {
    id: 'app.components.Filters.SelectArea.pragmatics',
    description: 'Menu choose material area',
    defaultMessage: 'Language: Pragmatics'
  },
  reading: {
    id: 'app.components.Filters.SelectArea.reading',
    description: 'Menu choose material area',
    defaultMessage: 'Language: Reading'
  },
  writing: {
    id: 'app.components.Filters.SelectArea.writing',
    description: 'Menu choose material area',
    defaultMessage: 'Language: Writing'
  },
  literature: {
    id: 'app.components.Filters.SelectArea.literature',
    description: 'Menu choose material area',
    defaultMessage: 'Literature'
  },
  languages: {
    id: 'app.components.Filters.SelectArea.languages',
    description: 'Menu choose material area',
    defaultMessage: 'Languages'
  },
  numeration: {
    id: 'app.components.Filters.SelectArea.numeration',
    description: 'Menu choose material area',
    defaultMessage: 'Math: numeration'
  },
  basicOperations: {
    id: 'app.components.Filters.SelectArea.basicOperations',
    description: 'Menu choose material area',
    defaultMessage: 'Math: Basic operations'
  },
  problems: {
    id: 'app.components.Filters.SelectArea.problems',
    description: 'Menu choose material area',
    defaultMessage: 'Math: Problems'
  },
  geometry: {
    id: 'app.components.Filters.SelectArea.geometry',
    description: 'Menu choose material area',
    defaultMessage: 'Math: Geometry'
  },
  naturalSciences: {
    id: 'app.components.Filters.SelectArea.naturalSciences',
    description: 'Menu choose material area',
    defaultMessage: 'Natural Sciences'
  },
  socialSciences: {
    id: 'app.components.Filters.SelectArea.socialSciences',
    description: 'Menu choose material area',
    defaultMessage: 'Social Sciences'
  },
  music: {
    id: 'app.components.Filters.SelectArea.music',
    description: 'Menu choose material area',
    defaultMessage: 'Music'
  },
  art: {
    id: 'app.components.Filters.SelectArea.art',
    description: 'Menu choose material area',
    defaultMessage: 'Art'
  },
  physicalEducation: {
    id: 'app.components.Filters.SelectArea.physicalEducation',
    description: 'Menu choose material area',
    defaultMessage: 'Physical Education'
  },
  religion: {
    id: 'app.components.Filters.SelectArea.religion',
    description: 'Menu choose material area',
    defaultMessage: 'Religion'
  },
  health: {
    id: 'app.components.Filters.SelectArea.health',
    description: 'Menu choose material area',
    defaultMessage: 'Health'
  },
  leisure: {
    id: 'app.components.Filters.SelectArea.leisure',
    description: 'Menu choose material area',
    defaultMessage: 'Leisure and culture'
  },
  multimediaBook: {
    id: 'app.components.Filters.SelectArea.multimediaBook',
    description: 'Menu choose material activity',
    defaultMessage: 'Multimedia Book'
  },
  picaa: {
    id: 'app.components.Filters.SelectArea.picaa',
    description: 'Menu choose material activity',
    defaultMessage: 'Picaa activity'
  },
  signage: {
    id: 'app.components.Filters.SelectArea.signage',
    description: 'Menu choose material activity',
    defaultMessage: 'Signage'
  },
  signage: {
    id: 'app.components.Filters.SelectArea.signage',
    description: 'Menu choose material activity',
    defaultMessage: 'Signage'
  },
  signage: {
    id: 'app.components.Filters.SelectArea.signage',
    description: 'Menu choose material activity',
    defaultMessage: 'Signage'
  },
  signage: {
    id: 'app.components.Filters.SelectArea.signage',
    description: 'Menu choose material activity',
    defaultMessage: 'Signage'
  },
  signage: {
    id: 'app.components.Filters.SelectArea.signage',
    description: 'Menu choose material activity',
    defaultMessage: 'Signage'
  },
  signage: {
    id: 'app.components.Filters.SelectArea.signage',
    description: 'Menu choose material activity',
    defaultMessage: 'Signage'
  },
  signage: {
    id: 'app.components.Filters.SelectArea.signage',
    description: 'Menu choose material activity',
    defaultMessage: 'Signage'
  },
  signage: {
    id: 'app.components.Filters.SelectArea.signage',
    description: 'Menu choose material activity',
    defaultMessage: 'Signage'
  },
  signage: {
    id: 'app.components.Filters.SelectArea.signage',
    description: 'Menu choose material activity',
    defaultMessage: 'Signage'
  },
  signage: {
    id: 'app.components.Filters.SelectArea.signage',
    description: 'Menu choose material activity',
    defaultMessage: 'Signage'
  },
  signage: {
    id: 'app.components.Filters.SelectArea.signage',
    description: 'Menu choose material activity',
    defaultMessage: 'Signage'
  },
  signage: {
    id: 'app.components.Filters.SelectArea.signage',
    description: 'Menu choose material activity',
    defaultMessage: 'Signage'
  },
  signage: {
    id: 'app.components.Filters.SelectArea.signage',
    description: 'Menu choose material activity',
    defaultMessage: 'Signage'
  },
  signage: {
    id: 'app.components.Filters.SelectArea.signage',
    description: 'Menu choose material activity',
    defaultMessage: 'Signage'
  },
  signage: {
    id: 'app.components.Filters.SelectArea.signage',
    description: 'Menu choose material activity',
    defaultMessage: 'Signage'
  },
  signage: {
    id: 'app.components.Filters.SelectArea.signage',
    description: 'Menu choose material activity',
    defaultMessage: 'Signage'
  },
  signage: {
    id: 'app.components.Filters.SelectArea.signage',
    description: 'Menu choose material activity',
    defaultMessage: 'Signage'
  },
  signage: {
    id: 'app.components.Filters.SelectArea.signage',
    description: 'Menu choose material activity',
    defaultMessage: 'Signage'
  },
  signage: {
    id: 'app.components.Filters.SelectArea.signage',
    description: 'Menu choose material activity',
    defaultMessage: 'Signage'
  }
})
