import { shallow } from 'enzyme'
import React from 'react'
import { fromJS } from 'immutable'
import Component from '../index'

import Catalog from '../Catalog'
import License from '../License'
import Size from '../Size'

describe('<Filters />', () => {
  it('should render a <Catalog /> tag', () => {
    const filters = fromJS({ catalog: true })
    const renderedComponent = shallow(<Component filters={filters} />)
    expect(renderedComponent.contains(<Catalog />)).toEqual(true)
  })
  it('should not render a <Catalog /> tag', () => {
    const filters = fromJS({ catalog: false })
    // const renderedComponent = renderComponent({ filter })
    const renderedComponent = shallow(<Component filters={filters} />)
    expect(renderedComponent.contains(<Catalog />)).toEqual(false)
  })

  it('should render a <Size /> tag', () => {
    const filters = fromJS({ size: true })
    const renderedComponent = shallow(<Component filters={filters} />)
    expect(renderedComponent.contains(<Size />)).toEqual(true)
  })
  it('should not render a <Size /> tag', () => {
    const filters = fromJS({ size: false })
    // const renderedComponent = renderComponent({ filter })
    const renderedComponent = shallow(<Component filters={filters} />)
    expect(renderedComponent.contains(<Size />)).toEqual(false)
  })

  it('should render a <SelectLicense /> tag', () => {
    const filters = fromJS({ license: true })
    const renderedComponent = shallow(<Component filters={filters} />)
    expect(renderedComponent.contains(<License />)).toEqual(true)
  })
  it('should not render a <License /> tag', () => {
    const filters = fromJS({ license: false })
    // const renderedComponent = renderComponent({ filter })
    const renderedComponent = shallow(<Component filters={filters} />)
    expect(renderedComponent.contains(<License />)).toEqual(false)
  })
})
