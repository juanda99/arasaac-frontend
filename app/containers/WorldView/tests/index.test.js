import React from 'react'
import { shallow } from 'enzyme'
import { FormattedMessage } from 'react-intl'
import CircularProgress from 'material-ui/CircularProgress'

jest.mock('react-leaflet', () => ({
  Map: ({ children }) => <div className="mock-map">{children}</div>,
  TileLayer: () => <div className="mock-tile" />,
  Marker: ({ children }) => <div className="mock-marker">{children}</div>,
  Popup: ({ children }) => <div className="mock-popup">{children}</div>,
}))

jest.mock('leaflet', () => {
  function MockIcon() {}
  MockIcon.Default = {
    prototype: { _getIconUrl: jest.fn() },
    mergeOptions: jest.fn(),
  }
  return {
    Icon: MockIcon,
    divIcon: jest.fn((opts) => opts),
  }
})

import {
  WorldView,
  WorldLocationPopup,
  getYouTubeEmbedUrl,
  getAllPictures,
  getLocationCategoryKey,
  getCategoryIcon,
  CATEGORY_DEFINITIONS,
} from '../index'
import messages from '../messages'
import api from 'services'

const mockLocations = [
  {
    id: 1,
    name: 'C.F.I. Gabriel Pérez Cárcel',
    tipo: 'Colegio',
    description: 'Dolor en personas con TEA',
    latitude: 37.9745,
    longitude: -1.1208,
    picture: 'https://static.arasaac.org/map/1/pic1.jpg',
    pictures: [
      'https://static.arasaac.org/map/1/pic1.jpg',
      'https://static.arasaac.org/map/1/pic2.jpg',
    ],
    video: 'https://www.youtube.com/watch?v=Xg5lvOeWE04',
    address: {
      city: 'Murcia',
      province: 'Murcia',
      country: 'España',
    },
    links: {
      mainWeb: 'http://example.com',
      proyectWeb: 'http://project.com',
      urlNews: 'http://news.com',
    },
    status: 1,
  },
  {
    id: 2,
    name: 'Vilamuseu',
    tipo: 'Museo',
    description: 'Paneles de lectura fácil',
    latitude: 38.5082,
    longitude: -0.2296,
    picture: 'https://static.arasaac.org/map/2/pic1.jpg',
    address: {
      city: 'La Vila Joiosa',
      province: 'Alicante',
      country: 'España',
    },
    links: {
      mainWeb: 'http://vilamuseu.es',
    },
    status: 1,
  },
]

describe('Helper functions and Category mapping', () => {
  describe('getYouTubeEmbedUrl', () => {
    it('should parse standard youtube watch URL', () => {
      expect(
        getYouTubeEmbedUrl('https://www.youtube.com/watch?v=Xg5lvOeWE04')
      ).toBe('https://www.youtube-nocookie.com/embed/Xg5lvOeWE04')
    })

    it('should parse youtu.be short URL', () => {
      expect(getYouTubeEmbedUrl('https://youtu.be/3A70c_FweSc')).toBe(
        'https://www.youtube-nocookie.com/embed/3A70c_FweSc'
      )
    })

    it('should return null for non-YouTube or invalid URLs', () => {
      expect(getYouTubeEmbedUrl('http://bit.ly/2zXeTsM')).toBeNull()
      expect(getYouTubeEmbedUrl(null)).toBeNull()
      expect(getYouTubeEmbedUrl('')).toBeNull()
      expect(getYouTubeEmbedUrl('Not a url')).toBeNull()
    })
  })

  describe('getAllPictures', () => {
    it('should return deduplicated list of picture and pictures', () => {
      const loc = {
        picture: 'https://example.com/p1.jpg',
        pictures: ['https://example.com/p1.jpg', 'https://example.com/p2.jpg'],
      }
      expect(getAllPictures(loc)).toEqual([
        'https://example.com/p1.jpg',
        'https://example.com/p2.jpg',
      ])
    })

    it('should return empty array if no pictures exist', () => {
      expect(getAllPictures({})).toEqual([])
      expect(getAllPictures(null)).toEqual([])
    })
  })

  describe('getLocationCategoryKey & getCategoryIcon', () => {
    it('should correctly map sub-types to main category keys', () => {
      expect(getLocationCategoryKey({ tipo: 'Colegio' })).toBe('educacion')
      expect(getLocationCategoryKey({ tipo: 'Hospital' })).toBe('salud')
      expect(getLocationCategoryKey({ tipo: 'Ayuntamiento' })).toBe('localidades')
      expect(getLocationCategoryKey({ tipo: 'Museo' })).toBe('cultura')
      expect(getLocationCategoryKey({ tipo: 'Asociación' })).toBe('asociaciones')
      expect(getLocationCategoryKey({ tipo: 'Policía' })).toBe('organismos')
      expect(getLocationCategoryKey({ tipo: 'Software CAA' })).toBe('software')
      expect(getLocationCategoryKey({ tipo: 'Residencia' })).toBe('residencias')
      expect(getLocationCategoryKey({ tipo: 'Parque' })).toBe('deporte')
      expect(getLocationCategoryKey({ tipo: 'Comercios' })).toBe('empresas')
      expect(getLocationCategoryKey({ tipo: 'Desconocido' })).toBe('otro')
    })

    it('should return a divIcon with custom SVG for a category', () => {
      const icon = getCategoryIcon('educacion')
      expect(icon).toBeDefined()
      expect(icon.className).toBe('custom-cat-marker')
      expect(icon.html).toContain(CATEGORY_DEFINITIONS.educacion.color)
    })
  })
})

describe('<WorldLocationPopup />', () => {
  const formatMessage = (msg) => msg.defaultMessage || msg.id
  let onOpenDetailMock

  beforeEach(() => {
    onOpenDetailMock = jest.fn()
  })

  it('should render pictures gallery, title, type, and address with category color', () => {
    const loc = mockLocations[0]
    const allPictures = getAllPictures(loc)
    const catDef = CATEGORY_DEFINITIONS.educacion
    const wrapper = shallow(
      <WorldLocationPopup
        loc={loc}
        categoryDef={catDef}
        allPictures={allPictures}
        formatMessage={formatMessage}
        onOpenDetail={onOpenDetailMock}
      />
    )

    expect(wrapper.find('h4').text()).toBe(loc.name)
    expect(wrapper.find('img').length).toBeGreaterThan(0)
    expect(wrapper.text()).toContain('Colegio')
    expect(wrapper.text()).toContain('Murcia, Murcia, España')
  })

  it('should switch photos on prev and next click', () => {
    const loc = mockLocations[0]
    const allPictures = getAllPictures(loc)
    const wrapper = shallow(
      <WorldLocationPopup
        loc={loc}
        allPictures={allPictures}
        formatMessage={formatMessage}
        onOpenDetail={onOpenDetailMock}
      />
    )

    expect(wrapper.state('activePhotoIndex')).toBe(0)
    wrapper.instance().handleNextPhoto({ stopPropagation: jest.fn() })
    expect(wrapper.state('activePhotoIndex')).toBe(1)
    wrapper.instance().handlePrevPhoto({ stopPropagation: jest.fn() })
    expect(wrapper.state('activePhotoIndex')).toBe(0)
  })

  it('should switch media tabs when both photos and video are present', () => {
    const loc = mockLocations[0]
    const allPictures = getAllPictures(loc)
    const wrapper = shallow(
      <WorldLocationPopup
        loc={loc}
        allPictures={allPictures}
        formatMessage={formatMessage}
        onOpenDetail={onOpenDetailMock}
      />
    )

    expect(wrapper.state('mediaTab')).toBe('photo')
    wrapper.instance().handleTabChange('video', { stopPropagation: jest.fn() })
    expect(wrapper.state('mediaTab')).toBe('video')
    expect(wrapper.find('iframe').length).toBe(1)
  })

  it('should trigger onOpenDetail when clicking image or view details button', () => {
    const loc = mockLocations[0]
    const allPictures = getAllPictures(loc)
    const wrapper = shallow(
      <WorldLocationPopup
        loc={loc}
        allPictures={allPictures}
        formatMessage={formatMessage}
        onOpenDetail={onOpenDetailMock}
      />
    )

    wrapper.find('img').first().simulate('click')
    expect(onOpenDetailMock).toHaveBeenCalledWith(loc, 0)

    wrapper.find('button').last().simulate('click')
    expect(onOpenDetailMock).toHaveBeenCalledTimes(2)
  })
})

describe('<WorldView />', () => {
  let defaultProps
  let originalWorldApi

  beforeEach(() => {
    defaultProps = {
      theme: 'default',
      intl: {
        formatMessage: (msg) => msg.defaultMessage || msg.id,
      },
    }
    originalWorldApi = api.WORLD_REQUEST
    api.WORLD_REQUEST = jest.fn(() => Promise.resolve(mockLocations))
  })

  afterEach(() => {
    api.WORLD_REQUEST = originalWorldApi
  })

  it('should render the introductory message and NOT render an iframe', () => {
    const wrapper = shallow(<WorldView {...defaultProps} />)
    expect(
      wrapper.contains(<FormattedMessage {...messages.arasaacInWorld} />)
    ).toBe(true)
    expect(wrapper.find('iframe').length).toBe(0)
  })

  it('should display loading indicator when loading', () => {
    const wrapper = shallow(<WorldView {...defaultProps} />)
    wrapper.setState({ loading: true })
    expect(wrapper.find(CircularProgress).length).toBe(1)
  })

  it('should load locations from API on mount', async () => {
    const wrapper = shallow(<WorldView {...defaultProps} />)
    await wrapper.instance().componentDidMount()
    expect(api.WORLD_REQUEST).toHaveBeenCalled()
    expect(wrapper.state('locations')).toEqual(mockLocations)
    expect(wrapper.state('loading')).toBe(false)
  })

  it('should filter locations by searchText', () => {
    const wrapper = shallow(<WorldView {...defaultProps} />)
    wrapper.setState({
      locations: mockLocations,
      loading: false,
      searchText: 'Gabriel',
    })
    const filtered = wrapper.instance().getFilteredLocations()
    expect(filtered.length).toBe(1)
    expect(filtered[0].name).toContain('Gabriel')
  })

  it('should filter locations by selectedCategory', () => {
    const wrapper = shallow(<WorldView {...defaultProps} />)
    wrapper.setState({
      locations: mockLocations,
      loading: false,
      selectedCategory: 'cultura',
    })
    const filtered = wrapper.instance().getFilteredLocations()
    expect(filtered.length).toBe(1)
    expect(filtered[0].tipo).toBe('Museo')
  })

  it('should extract available categories with counts', () => {
    const wrapper = shallow(<WorldView {...defaultProps} />)
    wrapper.setState({ locations: mockLocations })
    const available = wrapper.instance().getAvailableCategories()
    expect(available.length).toBe(2)
    const educacion = available.find((c) => c.key === 'educacion')
    const cultura = available.find((c) => c.key === 'cultura')
    expect(educacion.count).toBe(1)
    expect(cultura.count).toBe(1)
  })

  it('should handle open and close detail dialog', () => {
    const wrapper = shallow(<WorldView {...defaultProps} />)
    wrapper.instance().handleOpenDetail(mockLocations[0], 1)
    expect(wrapper.state('selectedLocation')).toEqual(mockLocations[0])
    expect(wrapper.state('dialogPhotoIndex')).toBe(1)

    wrapper.instance().handleCloseDetail()
    expect(wrapper.state('selectedLocation')).toBeNull()
  })

  it('should cycle through dialog pictures with handlePrevDialogPhoto and handleNextDialogPhoto', () => {
    const wrapper = shallow(<WorldView {...defaultProps} />)
    wrapper.instance().handleOpenDetail(mockLocations[0], 0)
    expect(wrapper.state('dialogPhotoIndex')).toBe(0)

    wrapper.instance().handleNextDialogPhoto({ stopPropagation: jest.fn() })
    expect(wrapper.state('dialogPhotoIndex')).toBe(1)

    wrapper.instance().handleNextDialogPhoto({ stopPropagation: jest.fn() })
    expect(wrapper.state('dialogPhotoIndex')).toBe(0)

    wrapper.instance().handlePrevDialogPhoto({ stopPropagation: jest.fn() })
    expect(wrapper.state('dialogPhotoIndex')).toBe(1)
  })
})
