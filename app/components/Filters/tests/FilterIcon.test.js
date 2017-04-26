
import { shallow } from 'enzyme'
import React from 'react'
import IconButton from 'material-ui/IconButton'
import Component from '../FilterIcon'
import Filter from '../images/Filter'


describe('<FilterIcon />', () => {
  it('should render an <IconButton /> tag', () => {
    const renderedComponent = shallow(<Component />)
    expect(renderedComponent.type()).toEqual(IconButton)
  })
  it('should contain a <Filter /> tag', () => {
    const renderedComponent = shallow(<Component />)
    expect(renderedComponent.contains(<Filter />)).toEqual(true)
  })
})
