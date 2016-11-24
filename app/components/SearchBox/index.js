/**
*
* SearchBox
*
*/

import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import Toggle from 'material-ui/Toggle'
import FilterPictograms from 'components/Filters'
import SearchField from './SearchField'


import messages from './messages'

const SearchBox = ({ value, dataSource, onSubmit, onChange, onToggleFilter, filters, showFilter }) => (
  <div>
    <Toggle label={<FormattedMessage {...messages.advancedSearch} />} 
      onToggle={onToggleFilter} defaultToggled={showFilter}
    />
    <SearchField value={value} dataSource={dataSource} onSubmit={onSubmit} onChange={onChange} />
    {showFilter ? <FilterPictograms filter={filters} /> : null}
  </div>
)

SearchBox.propTypes = {
  value: PropTypes.string,
  dataSource: PropTypes.arrayOf(PropTypes.string),
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleFilter: PropTypes.func.isRequired,
  showFilter: React.PropTypes.bool.isRequired,
  filters: PropTypes.arrayOf(PropTypes.string)
}
SearchBox.defaultProps = {
  searchText: '',
  keywords: []
}

export default SearchBox
