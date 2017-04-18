import { shallow } from 'enzyme'
import React from 'react'
import { fromJS } from 'immutable'
import Component from '../index'

import SelectCatalog from '../SelectCatalog'
import SelectLicense from '../SelectLicense'
import SelectSize from '../SelectSize'

describe('<Filters />', () => {
  it('should render a <SelectCatalog /> tag', () => {
    const filters = fromJS({ catalog: true })
    const renderedComponent = shallow(<Component filters={filters} />)
    expect(renderedComponent.contains(<SelectCatalog />)).toEqual(true)
  })
  it('should not render a <SelectCatalog /> tag', () => {
    const filters = fromJS({ catalog: false })
    // const renderedComponent = renderComponent({ filter })
    const renderedComponent = shallow(<Component filters={filters} />)
    expect(renderedComponent.contains(<SelectCatalog />)).toEqual(false)
  })

  it('should render a <SelectSize /> tag', () => {
    const filters = fromJS({ size: true })
    const renderedComponent = shallow(<Component filters={filters} />)
    expect(renderedComponent.contains(<SelectSize />)).toEqual(true)
  })
  it('should not render a <SelectSize /> tag', () => {
    const filters = fromJS({ size: false })
    // const renderedComponent = renderComponent({ filter })
    const renderedComponent = shallow(<Component filters={filters} />)
    expect(renderedComponent.contains(<SelectSize />)).toEqual(false)
  })

  it('should render a <SelectLicense /> tag', () => {
    const filters = fromJS({ license: true })
    const renderedComponent = shallow(<Component filters={filters} />)
    expect(renderedComponent.contains(<SelectLicense />)).toEqual(true)
  })
  it('should not render a <SelectLicense /> tag', () => {
    const filters = fromJS({ license: false })
    // const renderedComponent = renderComponent({ filter })
    const renderedComponent = shallow(<Component filters={filters} />)
    expect(renderedComponent.contains(<SelectLicense />)).toEqual(false)
  })
})
