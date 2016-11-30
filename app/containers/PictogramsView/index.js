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
import { selectFilters } from 'containers/ToggleFilter/selectors'
import { loadAutocomplete, loadPictograms, toggleShowFilter } from './actions'
import { selectShowFilters, selectPictogramsBySearchKey } from './selectors'

// import selectPictogramsView from './selectors'
// import messages from './messages'

class PictogramsView extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    if (this.props.searchText) {
      this.props.loadPictograms(this.props.searchText)
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.searchText !== nextProps.searchTest) {
      this.props.loadPictograms(nextProps.searchText)
    }
  }

  handleChange = (nextValue) => {
    this.props.router.push(`/pictograms/search/${nextValue}`)
  }

  render() {
    const { children, searchText, showFilter, filters, keywords, pictograms } = this.props
    const gallery = children ? React.cloneElement(children, { data: pictograms }) : null
    // const gallery = React.cloneElement(children, { data: pictograms })
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
        {gallery}
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
  router: PropTypes.any.isRequired,
  pictograms: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = (state, ownProps) => ({
  searchText: ownProps.params.searchText,
  filters: selectFilters(state),
  showFilters: selectShowFilters(state),
  pictograms: selectPictogramsBySearchKey(state)
})

export default connect(mapStateToProps, { loadAutocomplete, loadPictograms, toggleShowFilter })(withRouter(PictogramsView))
