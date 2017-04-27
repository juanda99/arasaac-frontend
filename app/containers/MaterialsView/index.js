/*
 *
 * PictogramsView
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import SearchBox from 'components/SearchBox'
import View from 'components/View'
import { withRouter } from 'react-router'
import { materials, toggleShowFilter } from './actions'

import messages from './messages'

class MaterialsView extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    if (this.props.params.searchText) {
      this.props.requestMaterials(this.props.params.searchText)
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.params.searchText !== nextProps.params.searchText) {
      this.props.requestMaterials(nextProps.params.searchText)
    }
  }

  handleSubmit = (nextValue) => {
    if (this.props.params.searchText !== nextValue) {
      this.props.router.push(`/materials/search/${nextValue}`)
    }
  }

  render() {
    const { children, showFilter, filters, pictoList } = this.props
    const searchText = this.props.params.searchText
    const gallery = pictoList.length ? React.cloneElement(children, { data: pictoList }) : null
    return (
      <View>
        <Helmet
          title='Materials View'
          meta={[
            { name: 'description', content: 'Description of PictogramsView' }
          ]}
        />
        <SearchBox
          value={searchText}
          dataSource={keywords}
          onSubmit={this.handleSubmit}
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
  // Injected by React Redux
  // loadAutocomplete: PropTypes.func.isRequired,
  requestMaterials: PropTypes.func.isRequired,
  toggleShowFilter: PropTypes.func.isRequired,
  searchText: PropTypes.string,
  params: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  showFilter: PropTypes.bool,
  // Injected by React Router
  children: PropTypes.node,
  router: PropTypes.any.isRequired,
  pictoList: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = (state, ownProps) => {
  const filters = state.getIn(['configuration', 'filters'])
  // const filters = createSelector(selectFilters(), (fltrs) => (fltrs))(state)
  // console.log (filters.toJS())
  const showFilter = state.getIn(['pictogramsView', 'showFilter'])
  // const showFilter = createSelector(selectShowFilter(), (shwFltrs) => (shwFltrs))(state)
  const pictoList = state.getIn(['pictogramView', 'search', ownProps.params.searchText]) || []
  // const pictoList = createSelector(selectPictogramsBySearchKey(), (pctLst) => (pctLst))(state, ownProps)
  return ({
    filters,
    showFilter,
    pictoList,
    keywords: ['prueba1', 'prueba2', 'prueba3']
  })
}

const mapDispatchToProps = (dispatch) => ({
  requestMaterials: (searchText) => {
    dispatch(pictograms.request(searchText))
  },
  toggleShowFilter: () => {
    dispatch(toggleShowFilter())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MaterialsView))
