/*
 *
 * PictogramsView
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import SearchBox from 'components/SearchBox'
import { withRouter } from 'react-router'
import { loadAutocomplete, loadPictograms, toggleShowFilter } from './actions'

// import selectPictogramsView from './selectors'
// import messages from './messages'

class PictogramsView extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount = () => {
    // aquí deberíamos cargar las llamadas ajax, para autocomplete y para pictograms
  }

  componentDidUpdate = () => {
    // remote calls here, first render doesn't need them (componentDidMount)
    // autocomplete will always
    if (this.props.searchText) {
      this.props.loadPictograms()
    }
  }

  handleChange = (nextValue) => {
    this.props.router.push(`/pictograms/search/${nextValue}`)
  }

  render() {
    const { children, searchText, showFilter, filters, keywords } = this.props
    return (
      <div>
        <Helmet
          title='PictogramsView'
          meta={[
            { name: 'description', content: 'Description of PictogramsView' }
          ]}
        />
        <SearchBox
          value={searchText}
          dataSource={keywords}
          onSubmit={this.handleSubmit}
          onChange={this.props.loadAutocomplete}
          onToggleFilter={this.props.toggleShowFilter}
          filter={filters}
          showFilter={showFilter}
        />

        {searchText ? <SearchList data={pictograms} /> : null}
        {children}
      </div>
    )
  }
}

PictogramsView.propTypes = {
  // Injected by React Redux
  loadAutocomplete: PropTypes.func.isRequired,
  loadPictograms: PropTypes.func.isRequired,
  toggleShowFilter: PropTypes.func.isRequired,
  searchText: PropTypes.string,
  keywords: PropTypes.object,
  showFilter: PropTypes.bool,
  filters: PropTypes.object.isRequired,
  // Injected by React Router
  children: PropTypes.node,
  router: React.PropTypes.any.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const errorMessage = state.errorMessage
  const { searchText } = ownProps.params
  const { gui: { filters } } = state
  const { showFilters } = state

  return {
    errorMessage,
    searchText,
    filters,
    showFilter
  }
}

export default connect(mapStateToProps, { loadAutocomplete, loadPictograms, toggleShowFilter } )(withRouter(PictogramsView))
