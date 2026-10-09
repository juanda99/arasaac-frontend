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

import { UploadWorldView, CATEGORIES } from '../index'
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
    expect(wrapper.find('#world-mainweb-input').length).toBe(1)
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
    expect(wrapper.state('errors').coords).toBeDefined()
    expect(mockRequest).not.toHaveBeenCalled()
  })

  it('should submit form data via axios and show success state', async () => {
    const mockRequest = jest.fn().mockImplementation(() => Promise.resolve({ data: { id: 5 } }))
    axios.request = mockRequest
    const wrapper = shallow(<UploadWorldView {...defaultProps} />)

    wrapper.setState({
      name: 'Centro Aragonés',
      tipo: 'Educación',
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
      latitude: '41.6561',
      longitude: '-0.8773',
    })

    await wrapper.instance().handleSubmit()

    expect(wrapper.state('sending')).toBe(false)
    expect(wrapper.state('error')).toBe('Network error')
  })
})
