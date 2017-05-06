import { shallow } from 'enzyme'
import React from 'react'
import SelectField from 'material-ui/SelectField'
import Component from '../License'


describe('<License />', () => {
  it('should contain a SelectField', () => {
    const renderedComponent = shallow(<Component />)
    expect(renderedComponent.find(<SelectField />)).toBeDefined()
  })
})
