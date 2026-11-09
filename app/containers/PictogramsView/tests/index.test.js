import React from 'react'
import { shallow } from 'enzyme'
import { fromJS, List } from 'immutable'
import RaisedButton from 'material-ui/RaisedButton'

jest.mock('underscore', () => require('lodash'))
jest.mock('components/SearchField', () => () => <div id="mockSearchField" />)

import { PictogramsView } from '../index'
import CategoryTree from 'components/CategoryTree'

describe('<PictogramsView />', () => {
  let mockRequestPictograms

  beforeEach(() => {
    mockRequestPictograms = jest.fn()
    const mockElem = { click: jest.fn() }
    global.document = global.document || {}
    global.document.getElementById = jest.fn(() => mockElem)
    global.sessionStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    }
  })

  const createProps = (customProps = {}) => ({
    requestAutocomplete: jest.fn(),
    requestPictograms: mockRequestPictograms,
    requestNewPictograms: jest.fn(),
    requestCategories: jest.fn(),
    addFavorite: jest.fn(),
    deleteFavorite: jest.fn(),
    setSearchLanguage: jest.fn(),
    loading: false,
    loadingNew: false,
    params: {},
    location: { search: '', query: {} },
    router: { push: jest.fn() },
    locale: 'es',
    searchLanguage: 'es',
    defaultSearchLanguage: 'es',
    token: 'test-token',
    rootFavorites: List(),
    width: 2,
    categories: fromJS({
      'living being': { text: 'Ser vivo', tags: [], keywords: [] },
    }),
    visiblePictograms: [],
    newPictogramsList: [],
    muiTheme: {
      direction: 'ltr',
      palette: { accent2Color: '#fff' },
    },
    intl: {
      formatMessage: ({ defaultMessage }) => defaultMessage || '',
    },
    ...customProps,
  })

  it('does NOT render the searchByCategory button when categories are active (tab=0 and searchText is empty)', () => {
    const wrapper = shallow(<PictogramsView {...createProps()} />)
    const raisedButton = wrapper.find(RaisedButton)
    expect(raisedButton.length).toEqual(0)
    expect(wrapper.find(CategoryTree).length).toEqual(1)
  })

  it('renders the searchByCategory button when a search text is active', () => {
    const props = createProps({
      params: { searchText: 'arbol' },
    })
    const wrapper = shallow(<PictogramsView {...props} />)
    const raisedButton = wrapper.find(RaisedButton)
    expect(raisedButton.length).toEqual(1)
    expect(raisedButton.prop('disabled')).toBe(false)
    expect(wrapper.find(CategoryTree).length).toEqual(0)
  })

  it('renders the searchByCategory button when on New tab (tab=1)', () => {
    const wrapper = shallow(<PictogramsView {...createProps()} />)
    wrapper.setState({ tab: 1 })
    const raisedButton = wrapper.find(RaisedButton)
    expect(raisedButton.length).toEqual(1)
    expect(raisedButton.prop('disabled')).toBe(false)
    expect(wrapper.find(CategoryTree).length).toEqual(0)
  })

  it('does not request pictograms with "undefined" when searchLanguage changes without searchText', () => {
    const props = createProps()
    const wrapper = shallow(<PictogramsView {...props} />)
    const nextProps = {
      ...props,
      searchLanguage: 'en',
    }
    wrapper.instance().componentWillReceiveProps(nextProps)
    expect(mockRequestPictograms).not.toHaveBeenCalled()
  })

  it('requests pictograms when searchLanguage changes with searchText present', () => {
    const props = createProps({
      params: { searchText: 'arbol' },
    })
    const wrapper = shallow(<PictogramsView {...props} />)
    const nextProps = {
      ...props,
      searchLanguage: 'en',
    }
    wrapper.instance().componentWillReceiveProps(nextProps)
    expect(mockRequestPictograms).toHaveBeenCalledWith('en', 'arbol')
  })
})
