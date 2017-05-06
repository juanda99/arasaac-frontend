import { shallow } from 'enzyme'
import React from 'react'
import SelectField from 'material-ui/SelectField'
import Component from '../Size'


describe('<Size />', () => {
  it('should contain a SelectField', () => {
    const renderedComponent = shallow(<Component />)
    expect(renderedComponent.find(<SelectField />)).toBeDefined()
  })
})
