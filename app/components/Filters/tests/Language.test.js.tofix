import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { setFilterItems } from 'containers/MaterialsView/actions'
import createComponentWithIntl from 'utils/createComponentWithIntl'
import Component from '../Language'

jest.mock('material-ui/internal/Tooltip')

describe('<Language />', () => {
  it('renders correctly', () => {
    const tree = createComponentWithIntl(
      <MuiThemeProvider>
        <Component setFilterItems={setFilterItems} values={'en'} />
      </MuiThemeProvider>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
