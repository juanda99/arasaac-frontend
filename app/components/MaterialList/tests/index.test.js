import { shallow } from 'enzyme'
import React from 'react'
import MaterialList from '../index'

describe('<MaterialList />', () => {
  let materials
  beforeEach(() => {
    materials = [
      { id: 1, title: 'material1', desc: 'description 1' },
      { id: 2, title: 'material2', desc: 'description 2' }
    ]
  })
  it('should render a <ul> tag', () => {
    const renderedComponent = shallow(<MaterialList materials={materials} />)
    // console.log(renderedComponent.debug())
    expect(renderedComponent.type()).toEqual('ul')
  })

  it('should contain a Material', () => {
    const renderedComponent = shallow(<MaterialList materials={materials} />)
    expect(renderedComponent.find('Material')).toBeDefined()
  })
  it('should render all the list of materials', () => {
    const renderedComponent = shallow(<MaterialList materials={materials} />)
    // stateless components looses therir names working with coverage? See https://github.com/facebook/jest/issues/1824
    // fixed with displayName property in the component
    // not able to making it working with lenght :-(
    // console.log(renderedComponent.debug())
    expect(renderedComponent.find('Material').length).toEqual(2)
  })
})
