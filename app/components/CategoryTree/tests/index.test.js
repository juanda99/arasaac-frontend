import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

jest.mock('underscore', () => require('lodash'))

import CategoryTree from '../index'
import CatLink from '../CatLink'

describe('<CategoryTree />', () => {
  const categoriesEs = fromJS({
    'living being': {
      text: 'Ser vivo',
      tags: [],
      keywords: [],
      children: {
        person: {
          text: 'Persona',
          tags: [],
          keywords: [],
          children: {
            'indigenouos people': {
              text: 'Pueblos indígenas',
              tags: ['person'],
              keywords: ['pueblos indígenas'],
            },
          },
        },
      },
    },
  })

  const categoriesEn = fromJS({
    'living being': {
      text: 'Living being',
      tags: [],
      keywords: [],
      children: {
        person: {
          text: 'Person',
          tags: [],
          keywords: [],
          children: {
            'indigenouos people': {
              text: 'Indigenous people',
              tags: ['person'],
              keywords: [], // Empty keywords in English API response
            },
          },
        },
      },
    },
  })

  const mockProps = {
    selectedKey: 'living being',
    selectedSubKey: 'person',
    categories: categoriesEn,
    locale: 'en',
    onCatChange: jest.fn(),
    onSubCatChange: jest.fn(),
  }

  it('falls back to node.text when keywords array is empty (e.g. Indigenous people in EN)', () => {
    const wrapper = shallow(<CategoryTree {...mockProps} />)
    const nodes = wrapper.state('nodes')
    const indigenousNode = nodes.find(
      (n) => n.key === 'living being,person,indigenouos people'
    )
    expect(indigenousNode).toBeDefined()
    expect(indigenousNode.text).toEqual('Indigenous people')
    expect(indigenousNode.keyword).toEqual('Indigenous people')
  })

  it('uses first keyword when keywords array is populated (e.g. in ES)', () => {
    const wrapper = shallow(
      <CategoryTree {...mockProps} categories={categoriesEs} locale="es" />
    )
    const nodes = wrapper.state('nodes')
    const indigenousNode = nodes.find(
      (n) => n.key === 'living being,person,indigenouos people'
    )
    expect(indigenousNode).toBeDefined()
    expect(indigenousNode.text).toEqual('Pueblos indígenas')
    expect(indigenousNode.keyword).toEqual('pueblos indígenas')
  })

  it('updates nodes when receiving new categories through props (language switch)', () => {
    const wrapper = shallow(
      <CategoryTree {...mockProps} categories={categoriesEs} locale="es" />
    )
    expect(wrapper.state('nodes')[0].text).toEqual('Ser vivo')

    // Simulate language change to English
    wrapper.setProps({ categories: categoriesEn, locale: 'en' })
    expect(wrapper.state('nodes')[0].text).toEqual('Living being')
    const indigenousNode = wrapper
      .state('nodes')
      .find((n) => n.key === 'living being,person,indigenouos people')
    expect(indigenousNode.keyword).toEqual('Indigenous people')
  })
})

describe('<CatLink />', () => {
  it('renders a Link to pictogram search when keyword is provided', () => {
    const wrapper = shallow(
      <CatLink keyword="Indigenous people">
        <span>Indigenous people</span>
      </CatLink>
    )
    const link = wrapper.find('Link')
    expect(link.length).toEqual(1)
    expect(link.prop('to')).toEqual('/pictograms/search/Indigenous%20people')
  })

  it('renders a div when keyword is falsy', () => {
    const wrapper = shallow(
      <CatLink keyword="">
        <span>Some category</span>
      </CatLink>
    )
    expect(wrapper.find('Link').length).toEqual(0)
    expect(wrapper.find('div').length).toEqual(1)
  })
})
