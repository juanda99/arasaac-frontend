/**
*
* SearchBox
*
*/

import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import Toggle from 'material-ui/Toggle'
import SearchField from './SearchField'

import messages from './messages'

const styles = {
  toggle: {
    width: '12rem'
  }
}

const SearchBox = ({ searchText, keywords }) => (
  <div>
    <Toggle style={styles.toggle} label={<FormattedMessage {...messages.advancedSearch} />} />
    <SearchField value={searchText} fullWidth={true} dataSource={keywords} />
  </div>
)

SearchBox.propTypes = {
  searchText: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string)
}
SearchBox.defaultProps = {
  searchText: '',
  keywords: []
}

export default SearchBox
