import { shallow } from 'enzyme'
import React from 'react'
import Material from 'components/Material'
import MaterialList from '../index'

const materials = [
  { id: 1, title: 'material1', desc: 'description 1' },
  { id: 2, title: 'material2', desc: 'description 2' }
]
// const clickFunction = () => true
/* const renderComponent = (props = { materials, clickFunction }) => shallow(
  <MaterialList {...props} />
) */

describe('<MaterialList />', () => {
  it('should render a <ul> tag', () => {
    const renderedComponent = shallow(<MaterialList materials={materials} />)
    console.log(renderedComponent.debug())
    expect(renderedComponent.type()).toEqual('ul')
  })

  it('should contain a Material', () => {
    const renderedComponent = shallow(<MaterialList materials={materials} />)
    expect(renderedComponent.find(<Material />)).toBeDefined()
    // expect(renderedComponent.find('Connect(Toggle)').length).toEqual(3)
  })
/*
  it('should render all the list of materials', () => {
    const renderedComponent = shallow(<Component materials={materials} onMaterialClick={clickFunction} />)
    console.log(renderedComponent.debug())
    expect(renderedComponent.find(<Material />).length).toEqual(2)
  })
  */
})
