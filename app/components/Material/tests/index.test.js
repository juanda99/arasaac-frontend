import React from 'react'
import createComponentWithIntl from 'utils/createComponentWithIntl'
import Component from '../index'

describe('<Material />', () => {
  it('renders correctly', () => {
    const material = {
      title: 'Title test',
      desc: 'Description for test material'
    }
    const tree = createComponentWithIntl(
      <Component material={material} locale={'es'} />)
    expect(tree).toMatchSnapshot()
  })
})
