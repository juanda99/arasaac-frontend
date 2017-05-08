/*
 *
 * MaterialsView
 *
 */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import View from 'components/View'
import Helmet from 'react-helmet'
import SearchField from 'components/SearchField'
import Toggle from 'material-ui/Toggle'
import { Map } from 'immutable'
import FilterList from 'components/Filters'
import { withRouter } from 'react-router'
import { materials, toggleShowFilter, addFilter, removeFilter } from './actions'
import messages from './messages'

class MaterialsView extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    if (this.props.params.searchText) {
      this.props.requestMaterials(this.props.locale, this.props.params.searchText)
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.params.searchText !== nextProps.params.searchText) {
      this.props.requestMaterials(this.props.locale, nextProps.params.searchText)
    }
  }

  handleSubmit = (nextValue) => {
    if (this.props.params.searchText !== nextValue) {
      this.props.router.push(`/materials/search/${nextValue}`)
    }
  }


  render() {
    const { children, showFilter, filters, visibleMaterials } = this.props
    const searchText = this.props.params.searchText || ''
    const gallery = visibleMaterials.length > 0 ? React.cloneElement(children, { materials: visibleMaterials }) : null
    console.log(filters.toJS())
    // this code in return is not so good if children changes (search, categories...)
    //  {visibleMaterials.length > 0 && <MaterialList materials={visibleMaterials} />}
    // {showFilter ? <FilterList filters={filters} /> : null}
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
        <SearchField value={searchText} onSubmit={this.handleSubmit} />
        {showFilter ? <FilterList filtersMap={filters} /> : null}
        {gallery}
      </View>
    )
  }
}

MaterialsView.propTypes = {
  requestMaterials: PropTypes.func.isRequired,
  toggleShowFilter: PropTypes.func.isRequired,
  searchText: PropTypes.string,
  params: PropTypes.object.isRequired,
  filters: PropTypes.instanceOf(Map),
  showFilter: PropTypes.bool,
  visibleMaterials: PropTypes.arrayOf(PropTypes.object),
  // Injected by React Router
  children: PropTypes.node,
  router: PropTypes.any.isRequired,
  locale: PropTypes.string.isRequired
}


const mapStateToProps = (state, ownProps) => {
  const filters = state.getIn(['materialsView', 'filters'])
  const showFilter = state.getIn(['materialsView', 'showFilter'])
  const locale = state.get('language').get('locale')
  // const activeFilters = state.getIn(['materialsView', 'filters'])
  const materialList = state.getIn(['materialsView', 'search', locale, ownProps.params.searchText]) || []
  const visibleMaterials = materialList
  // const visibleMaterials = activeFilters && activeFilters.size > 0 ? getFilteredItems(materialList, activeFilters.toJS()) : materialList

  return ({
    filters,
    showFilter,
    visibleMaterials,
    locale
  })
}

const mapDispatchToProps = (dispatch) => ({
  requestMaterials: (locale, searchText) => {
    dispatch(materials.request(locale, searchText))
  },
  toggleShowFilter: () => {
    dispatch(toggleShowFilter())
  },
  addFilter: (type, filterItem) => {
    dispatch(addFilter(type, filterItem))
  },
  removeFilter: (type, filterItem) => {
    dispatch(removeFilter(type, filterItem))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MaterialsView))
