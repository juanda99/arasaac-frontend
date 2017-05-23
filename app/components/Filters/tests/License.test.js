import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { setFilterItems } from 'containers/MaterialsView/actions'
import createComponentWithIntl from 'utils/createComponentWithIntl'
import Component from '../License'

jest.mock('material-ui/internal/Tooltip')

describe('<License />', () => {
  it('renders correctly', () => {
    const tree = createComponentWithIntl(
      <MuiThemeProvider>
        <Component setFilterItems={setFilterItems} values={'1'} />
      </MuiThemeProvider>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
