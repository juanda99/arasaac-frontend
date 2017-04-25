import React from 'react'
import { shallow } from 'enzyme'
import View from 'components/View'
import ConfigurationView from '../index'


describe('<ConfigurationView />', () => {
  it('should render the Filters configuration', () => {
    const renderedComponent = shallow(
      <ConfigurationView />
    )
    // console.log(renderedComponent.debug())
    expect(renderedComponent.find('Connect(Toggle)').length).toEqual(3)
  })

  it('should render a View', () => {
    const renderedComponent = shallow(<ConfigurationView />)
    // console.log(renderedComponent.debug())
    expect(renderedComponent.type()).toEqual(View)
  })
})
