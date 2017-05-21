import React from 'react'
import createComponentWithIntl from 'utils/createComponentWithIntl'
import material from 'data/material.json'
import Component from '../index'

describe('<Material />', () => {
  it('renders correctly', () => {
    const tree = createComponentWithIntl(
      <Component material={material} locale={'es'} />)
    expect(tree).toMatchSnapshot()
  })
})
