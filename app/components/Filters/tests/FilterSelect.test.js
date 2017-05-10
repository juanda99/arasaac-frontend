import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { setFilterItems } from 'containers/MaterialsView/actions'
import createComponentWithIntl from 'utils/createComponentWithIntl'
import Component from '../FilterSelect'

jest.mock('material-ui/internal/Tooltip')

describe('<FilterSelect />', () => {
  it('renders correctly', () => {
    const props = {
      items: [{ value: 1, primaryText: 'test' }],
      floatingLabelText: 'Label text',
      values: [],
      filterType: 'License'
    }
    const tree = createComponentWithIntl(
      <MuiThemeProvider>
        <Component {...props} setFilterItems={setFilterItems} />
      </MuiThemeProvider>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
