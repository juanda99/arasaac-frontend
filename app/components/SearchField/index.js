import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SearchBar from 'material-ui-search-bar'
import { injectIntl, intlShape } from 'react-intl'
import messages from './messages'
import customFilter from './filter'

const styles = {
  searchBar: {
    maxWidth: '800px',
    width: '100%'
  }
}

class SearchField extends Component {

  state = { searchText: this.props.value }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ searchText: nextProps.value })
    }
  }


  handleUpdateInput = (t) => {
    if (t.keyCode === 13) {
      this.props.onSubmit(this.state.searchText)
    } else {
      this.setState({ searchText: t })
    }
  }

  handleClick = () => {
    this.props.onSubmit(this.state.searchText)
  }

  render() {
    const { formatMessage } = this.props.intl
    const dataSource = this.props.dataSource || []

    return (
      <div>
        <SearchBar
          style={styles.searchBar}
          ref={(ref) => (this.myInput = ref)}
          filter={customFilter}
          dataSource={dataSource}
          onChange={this.handleUpdateInput}
          onRequestSearch={this.handleClick}
          value={this.state.searchText}
          maxSearchResults={10}
          hintText={formatMessage(messages.search)}
        />
      </div>
    )
  }
}

SearchField.propTypes = {
  dataSource: PropTypes.array,
  intl: intlShape.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default injectIntl(SearchField)
