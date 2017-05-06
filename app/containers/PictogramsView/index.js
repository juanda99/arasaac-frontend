/*
 *
 * PictogramsView
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import View from 'components/View'
import Helmet from 'react-helmet'
import SearchField from 'components/SearchField'
import Toggle from 'material-ui/Toggle'
import FilterList from 'components/Filters'
// import { createSelector } from 'reselect'
import { withRouter } from 'react-router'
import messages from './messages'
// import { selectFilters } from 'containers/ToggleFilter/selectors'
import { autocomplete, pictograms, toggleShowFilter } from './actions'
// import { selectShowFilter, selectPictogramsBySearchKey } from './selectors'

// import selectPictogramsView from './selectors'
// import messages from './messages'

class PictogramsView extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.requestAutocomplete(this.props.locale)
    if (this.props.params.searchText) {
      this.props.requestPictograms(this.props.params.searchText)
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.params.searchText !== nextProps.params.searchText) {
      this.props.requestPictograms(nextProps.params.searchText)
    }
  }

  handleSubmit = (nextValue) => {
    if (this.props.params.searchText !== nextValue) {
      this.props.router.push(`/pictograms/search/${nextValue}`)
    }
  }

  // handleChange = (searchText) => {
    // this.props.requestAutocomplete(searchText)
  // }

  render() {
    const { children, showFilter, filters, keywords, pictoList } = this.props
    const searchText = this.props.params.searchText
    // console.log(pictoList.length)
    const gallery = pictoList.length ? React.cloneElement(children, { data: pictoList }) : null
    // const gallery = React.cloneElement(children, { data: pictograms })
    return (
      <View>
        <Helmet
          title='PictogramsView'
          meta={[
            { name: 'description', content: 'Description of PictogramsView' }
          ]}
        />
        <Toggle
          label={<FormattedMessage {...messages.advancedSearch} />}
          onToggle={this.props.toggleShowFilter}
          defaultToggled={showFilter}
          style={{ width: '200px', float: 'right' }}
        />
        <SearchField
          value={searchText}
          dataSource={keywords}
          onSubmit={this.handleSubmit}
        />
        {showFilter ? <FilterList types={filters} /> : null}
        {gallery}
      </View>
    )
  }
}

PictogramsView.propTypes = {
  // Injected by React Redux
  // loadAutocomplete: PropTypes.func.isRequired,
  requestPictograms: PropTypes.func.isRequired,
  toggleShowFilter: PropTypes.func.isRequired,
  requestAutocomplete: PropTypes.func.isRequired,
  searchText: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  params: PropTypes.object.isRequired,
  filters: PropTypes.instanceOf(Map),
  showFilter: PropTypes.bool,
  // Injected by React Router
  children: PropTypes.node,
  router: PropTypes.any.isRequired,
  pictoList: PropTypes.arrayOf(PropTypes.object),
  locale: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const filters = state.getIn(['configuration', 'filters', 'pictograms'])
  // const filters = createSelector(selectFilters(), (fltrs) => (fltrs))(state)
  // console.log (filters.toJS())
  const showFilter = state.getIn(['pictogramsView', 'showFilter'])
  const locale = state.get('language').get('locale')
  // const locale = store.getState().get('language').get('locale')
  // const showFilter = createSelector(selectShowFilter(), (shwFltrs) => (shwFltrs))(state)
  const pictoList = state.getIn(['pictogramView', 'search', ownProps.params.searchText]) || []
  // const pictoList = createSelector(selectPictogramsBySearchKey(), (pctLst) => (pctLst))(state, ownProps)
  return ({
    filters,
    showFilter,
    pictoList,
    locale,
    keywords: state.getIn(['pictogramsView', 'words', locale])
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
