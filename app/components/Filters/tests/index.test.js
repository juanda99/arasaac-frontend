import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { setFilterItems } from 'containers/MaterialsView/actions'
import createComponentWithIntl from 'utils/createComponentWithIntl'
import { Map } from 'immutable'
import Component from '../index'

jest.mock('material-ui/internal/Tooltip')

describe('<FilterList />', () => {
  const filtersMap = Map({
    Activity: [1, 2, 3],
    License: '2',
    Language: 'es',
    Area: [1, 3, 5]
  })

  it('renders correctly', () => {
    const tree = createComponentWithIntl(
      <MuiThemeProvider>
        <Component setFilterItems={setFilterItems} filtersMap={filtersMap} />
      </MuiThemeProvider>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
