import React from 'react'
import { shallow } from 'enzyme'
import axios from 'axios'

jest.mock('react-leaflet', () => ({
  Map: ({ children, onClick }) => (
    <div className="mock-map" onClick={onClick}>
      {children}
    </div>
  ),
  TileLayer: () => <div className="mock-tile" />,
  Marker: ({ children }) => <div className="mock-marker">{children}</div>,
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

jest.mock('react-dropzone', () => {
  const React = require('react')
  return function MockDropzone(props) {
    return <div className="mock-dropzone">{props.children}</div>
  }
})

import {
  UploadWorldView,
  CATEGORIES,
  MAX_IMAGES,
  MAX_DESCRIPTION_LENGTH,
  MAX_DESCRIPTION_WORDS,
  countWords,
} from '../index'
import messages from '../messages'

const mockIntl = {
  formatMessage: (msg, values) => {
    if (values && values.progressStatus !== undefined) {
      return `Upload progress: ${values.progressStatus}%`
    }
    return msg.defaultMessage || msg.id
  },
  formatHTMLMessage: jest.fn(),
  formatDate: jest.fn(),
  formatTime: jest.fn(),
  formatRelative: jest.fn(),
  formatNumber: jest.fn(),
  formatPlural: jest.fn(),
  now: jest.fn(),
}

const defaultProps = {
  token: 'mock-auth-token-123',
  email: 'user@test.org',
  name: 'Test User',
  role: 'user',
  intl: mockIntl,
}

describe('<UploadWorldView />', () => {
  let originalAxiosRequest

  beforeEach(() => {
    originalAxiosRequest = axios.request
  })

  afterEach(() => {
    axios.request = originalAxiosRequest
  })

  it('should render form with all sections and submit button', () => {
    const wrapper = shallow(<UploadWorldView {...defaultProps} />)
    expect(wrapper.find('#world-name-input').length).toBe(1)
    expect(wrapper.find('#world-tipo-select').length).toBe(1)
    expect(wrapper.find('#world-desc-input').length).toBe(1)
    expect(wrapper.find('#world-lat-input').length).toBe(1)
    expect(wrapper.find('#world-lng-input').length).toBe(1)
    expect(wrapper.find('#world-address-input').length).toBe(1)
    expect(wrapper.find('#world-city-input').length).toBe(1)
    expect(wrapper.find('#world-link-url-0').length).toBe(1)
    expect(wrapper.find('#world-add-link-btn').length).toBe(1)
    expect(wrapper.find('#world-video-input').length).toBe(1)
    expect(wrapper.find('MockDropzone').length).toBe(1)
    expect(wrapper.find('RaisedButton').length).toBe(1)
  })

  it('should update state on text input changes', () => {
    const wrapper = shallow(<UploadWorldView {...defaultProps} />)
    const nameInput = wrapper.find('#world-name-input')
    nameInput.simulate('change', { target: { value: 'Colegio Nuevo' } })
    expect(wrapper.state('name')).toBe('Colegio Nuevo')

    const descInput = wrapper.find('#world-desc-input')
    descInput.simulate('change', { target: { value: 'Una descripción de prueba' } })
    expect(wrapper.state('description')).toBe('Una descripción de prueba')
  })

  it('should update category and tipo on category selection', () => {
    const wrapper = shallow(<UploadWorldView {...defaultProps} />)
    const select = wrapper.find('#world-tipo-select')
    select.simulate('change', {}, 1, 'salud')
    expect(wrapper.state('categoryKey')).toBe('salud')
    expect(wrapper.state('tipo')).toBe('Salud')
  })

  it('should update coordinates on map click', () => {
    const wrapper = shallow(<UploadWorldView {...defaultProps} />)
    wrapper.instance().handleMapClick({
      latlng: {
        lat: { toFixed: () => '40.416800' },
        lng: { toFixed: () => '-3.703800' },
      },
    })
    expect(wrapper.state('latitude')).toBe('40.4168')
    expect(wrapper.state('longitude')).toBe('-3.7038')
  })

  it('should handle drop files and remove files', () => {
    const wrapper = shallow(<UploadWorldView {...defaultProps} />)
    const mockFile1 = { name: 'photo1.jpg', preview: 'blob:preview1' }
    const mockFile2 = { name: 'photo2.jpg', preview: 'blob:preview2' }

    wrapper.instance().handleDropFiles([mockFile1, mockFile2])
    expect(wrapper.state('files').length).toBe(2)

    wrapper.instance().handleRemoveFile(0)
    expect(wrapper.state('files').length).toBe(1)
    expect(wrapper.state('files')[0].name).toBe('photo2.jpg')
  })

  it('should validate required fields and prevent submission if empty', () => {
    const wrapper = shallow(<UploadWorldView {...defaultProps} />)
    expect(wrapper.state('categoryKey')).toBe('')
    expect(wrapper.state('tipo')).toBe('')
    const mockRequest = jest.fn()
    axios.request = mockRequest

    wrapper.instance().handleSubmit()
    expect(wrapper.state('errors').name).toBeDefined()
    expect(wrapper.state('errors').tipo).toBeDefined()
    expect(wrapper.state('errors').description).toBeDefined()
    expect(wrapper.state('errors').coords).toBeDefined()
    expect(mockRequest).not.toHaveBeenCalled()
  })

  it('should validate description limit (1800 characters or 300 words)', () => {
    const wrapper = shallow(<UploadWorldView {...defaultProps} />)
    const mockRequest = jest.fn()
    axios.request = mockRequest

    // Exceeding character limit
    const longDesc = 'a'.repeat(MAX_DESCRIPTION_LENGTH + 1)
    wrapper.setState({
      name: 'Centro Test',
      tipo: 'Educación',
      latitude: '41.6561',
      longitude: '-0.8773',
      description: longDesc,
    })
    wrapper.instance().handleSubmit()
    expect(wrapper.state('errors').description).toBeDefined()
    expect(mockRequest).not.toHaveBeenCalled()

    // Exceeding word limit (>300 words)
    const manyWords = Array(MAX_DESCRIPTION_WORDS + 1).fill('palabra').join(' ')
    wrapper.setState({
      name: 'Centro Test',
      tipo: 'Educación',
      latitude: '41.6561',
      longitude: '-0.8773',
      description: manyWords,
    })
    wrapper.instance().handleSubmit()
    expect(wrapper.state('errors').description).toBeDefined()
    expect(mockRequest).not.toHaveBeenCalled()
  })

  it('should enforce photo limit of 15 maximum and prevent adding more', () => {
    const wrapper = shallow(<UploadWorldView {...defaultProps} />)
    expect(MAX_IMAGES).toBe(15)

    // Dropping 16 files should only keep 15 and set warning
    const files16 = Array.from({ length: 16 }, (_, i) => ({
      name: `photo_${i}.jpg`,
      preview: `blob:preview_${i}`,
    }))
    wrapper.instance().handleDropFiles(files16)
    expect(wrapper.state('files').length).toBe(15)
    expect(wrapper.state('errors').files).toBeDefined()

    // Trying to add another when already at 15
    wrapper.instance().handleDropFiles([{ name: 'extra.jpg' }])
    expect(wrapper.state('files').length).toBe(15)

    // Removing a file should clear file error
    wrapper.instance().handleRemoveFile(0)
    expect(wrapper.state('files').length).toBe(14)
    expect(wrapper.state('errors').files).toBe('')
  })

  it('should correctly count words with countWords helper', () => {
    expect(countWords('')).toBe(0)
    expect(countWords('   ')).toBe(0)
    expect(countWords(null)).toBe(0)
    expect(countWords('hola')).toBe(1)
    expect(countWords('hola mundo desde ARASAAC')).toBe(4)
    expect(countWords('  palabra1   palabra2\npalabra3\tpalabra4  ')).toBe(4)
  })

  it('should submit form data via axios and show success state', async () => {
    const mockRequest = jest.fn().mockImplementation(() => Promise.resolve({ data: { id: 5 } }))
    axios.request = mockRequest
    const wrapper = shallow(<UploadWorldView {...defaultProps} />)

    wrapper.setState({
      name: 'Centro Aragonés',
      tipo: 'Educación',
      description: 'Una descripción válida de prueba',
      latitude: '41.6561',
      longitude: '-0.8773',
      address: 'Calle Mayor 1',
      city: 'Zaragoza',
      files: [{ name: 'img.jpg' }],
    })

    await wrapper.instance().handleSubmit()

    expect(mockRequest).toHaveBeenCalled()
    expect(wrapper.state('success')).toBe(true)
    expect(wrapper.find('ActionCheckCircle').length).toBe(1)

    // Clicking "Submit another" resets form
    wrapper.instance().resetForm()
    expect(wrapper.state('success')).toBe(false)
    expect(wrapper.state('name')).toBe('')
  })

  it('should handle submission errors gracefully', async () => {
    const mockRequest = jest.fn().mockImplementation(() => Promise.reject(new Error('Network error')))
    axios.request = mockRequest
    const wrapper = shallow(<UploadWorldView {...defaultProps} />)

    wrapper.setState({
      name: 'Centro Aragonés',
      tipo: 'Educación',
      description: 'Una descripción válida de prueba',
      latitude: '41.6561',
      longitude: '-0.8773',
    })

    await wrapper.instance().handleSubmit()

    expect(wrapper.state('sending')).toBe(false)
    expect(wrapper.state('error')).toBe('Network error')
  })

  it('should support adding, modifying, and removing dynamic links of various types', () => {
    const wrapper = shallow(<UploadWorldView {...defaultProps} />)
    expect(wrapper.state('links').length).toBe(1)

    // Add a link
    wrapper.instance().handleAddLink()
    expect(wrapper.state('links').length).toBe(2)

    // Modify first link type and url
    wrapper.instance().handleLinkTypeChange(0)({}, 0, 'project')
    wrapper.instance().handleLinkUrlChange(0)({ target: { value: 'https://project.org' } })

    // Modify second link type and url
    wrapper.instance().handleLinkTypeChange(1)({}, 1, 'news')
    wrapper.instance().handleLinkUrlChange(1)({ target: { value: 'https://news.org/article' } })

    const updatedLinks = wrapper.state('links')
    expect(updatedLinks[0].type).toBe('project')
    expect(updatedLinks[0].url).toBe('https://project.org')
    expect(updatedLinks[1].type).toBe('news')
    expect(updatedLinks[1].url).toBe('https://news.org/article')

    // Remove first link
    wrapper.instance().handleRemoveLink(0)()
    expect(wrapper.state('links').length).toBe(1)
    expect(wrapper.state('links')[0].url).toBe('https://news.org/article')
  })

  it('should submit dynamic links in payload and exclude empty URLs', async () => {
    let capturedData = null
    const mockRequest = jest.fn().mockImplementation((config) => {
      capturedData = config.data
      return Promise.resolve({ data: { id: 10 } })
    })
    axios.request = mockRequest
    const wrapper = shallow(<UploadWorldView {...defaultProps} />)

    wrapper.setState({
      name: 'Centro Con Múltiples Links',
      tipo: 'Educación',
      description: 'Una descripción válida de prueba',
      latitude: '41.6561',
      longitude: '-0.8773',
      links: [
        { id: '1', url: 'https://arasaac.org', type: 'web' },
        { id: '2', url: 'https://arasaac.org/proyecto', type: 'project' },
        { id: '3', url: '   ', type: 'news' }, // should be filtered out
        { id: '4', url: 'https://premio.org', type: 'award' },
      ],
    })

    await wrapper.instance().handleSubmit()

    expect(mockRequest).toHaveBeenCalled()
    expect(capturedData).toBeInstanceOf(FormData)
    const jsonPayload = JSON.parse(capturedData.get('formData'))
    expect(jsonPayload.links).toEqual([
      { url: 'https://arasaac.org', type: 'web' },
      { url: 'https://arasaac.org/proyecto', type: 'project' },
      { url: 'https://premio.org', type: 'award' },
    ])
  })

  it('should display server error message with error details if available', async () => {
    const errorResponse = {
      response: {
        data: {
          message: 'Error creating world location',
          error: 'EACCES: permission denied',
        },
      },
    }
    const mockRequest = jest.fn().mockImplementation(() => Promise.reject(errorResponse))
    axios.request = mockRequest
    const wrapper = shallow(<UploadWorldView {...defaultProps} />)

    wrapper.setState({
      name: 'Centro Test',
      tipo: 'Educación',
      description: 'Una descripción válida',
      latitude: '41.6561',
      longitude: '-0.8773',
    })

    await wrapper.instance().handleSubmit()

    expect(wrapper.state('sending')).toBe(false)
    expect(wrapper.state('error')).toBe('Error creating world location: EACCES: permission denied')
  })
})
