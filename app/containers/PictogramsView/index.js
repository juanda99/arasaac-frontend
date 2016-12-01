/*
 *
 * PictogramsView
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import SearchBox from 'components/SearchBox'
import { createSelector } from 'reselect'
import { withRouter } from 'react-router'
import { selectFilters } from 'containers/ToggleFilter/selectors'
import View from 'components/View'
import { autocomplete, pictograms, toggleShowFilter } from './actions'
import { selectShowFilter, selectPictogramsBySearchKey } from './selectors'

// import selectPictogramsView from './selectors'
// import messages from './messages'

class PictogramsView extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    if (this.props.searchText) {
      this.props.requestPictograms(this.props.searchText)
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.searchText !== nextProps.searchTest) {
      this.props.requestPictograms(nextProps.searchText)
    }
  }

  handleSubmit = (nextValue) => {
    this.props.router.push(`/pictograms/search/${nextValue}`)
  }

  handleChange = (searchText) => {
    this.props.requestAutocomplete(searchText)
  }

  render() {
    const { children, searchText, showFilter, filters, keywords, pictoList } = this.props
    const gallery = children ? React.cloneElement(children, { data: pictoList }) : null
    // const gallery = React.cloneElement(children, { data: pictograms })
    return (
      <View>
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
          onChange={this.handleChange}
          onToggleFilter={this.props.toggleShowFilter}
          filters={filters}
          showFilter={showFilter}
        />
        {gallery}
      </View>
    )
  }
}

PictogramsView.propTypes = {
  requestPictograms: PropTypes.func.isRequired,
  requestAutocomplete: PropTypes.func.isRequired,
  toggleShowFilter: PropTypes.func.isRequired,
  searchText: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  showFilter: PropTypes.bool,
  filters: PropTypes.object.isRequired,
  // Injected by React Router
  children: PropTypes.node,
  router: PropTypes.any.isRequired,
  pictoList: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = (state, ownProps) => {
  const filters = createSelector(selectFilters(), (fltrs) => (fltrs))(state)
  const showFilter = createSelector(selectShowFilter(), (shwFltrs) => (shwFltrs))(state)
  const pictoList = createSelector(selectPictogramsBySearchKey(), (pctLst) => (pctLst))(state, ownProps)
  return ({
    searchText: ownProps.params.searchText || '',
    filters,
    showFilter,
    pictoList,
    keywords: ['prueba1', 'prueba2', 'prueba3']
  })
}

const mapDispatchToProps = (dispatch) => ({
  requestPictograms: (searchText) => {
    dispatch(pictograms.request(searchText))
  },
  toggleShowFilter: () => {
    dispatch(toggleShowFilter())
  },
  requestAutocomplete: (searchText) => {
    dispatch(autocomplete.request(searchText))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PictogramsView))
