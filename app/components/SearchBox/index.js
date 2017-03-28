/**
*
* SearchBox
*
*/

import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import Toggle from 'material-ui/Toggle'
import FilterPictograms from 'components/Filters'
import { Map } from 'immutable'
import SearchField from './SearchField'


import messages from './messages'

const SearchBox = ({ value, dataSource, onSubmit, onChange, onToggleFilter, filters, showFilter }) => (
  <div>
    <Toggle
      label={<FormattedMessage {...messages.advancedSearch} />}
      onToggle={onToggleFilter} defaultToggled={showFilter} style={{ width: '200px', float: 'right' }}
    />
    <SearchField value={value} dataSource={dataSource} onSubmit={onSubmit} onChange={onChange} />
    {showFilter ? <FilterPictograms filters={filters} /> : null}
  </div>
)

SearchBox.propTypes = {
  value: PropTypes.string.isRequired,
  dataSource: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleFilter: PropTypes.func.isRequired,
  showFilter: React.PropTypes.bool.isRequired,
  filters: PropTypes.instanceOf(Map)
}
SearchBox.defaultProps = {
  value: '',
  dataSource: []
}

export default SearchBox
