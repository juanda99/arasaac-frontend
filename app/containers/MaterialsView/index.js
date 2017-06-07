/*
 *
 * MaterialsView
 *
 */
import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import View from 'components/View'
import Helmet from 'react-helmet'
import SearchField from 'components/SearchField'
import Toggle from 'material-ui/Toggle'
import { Map } from 'immutable'
import FilterList from 'components/Filters'
import MaterialList from 'components/MaterialList'
import { withRouter } from 'react-router'
import {
  filtersSelector,
  showFiltersSelector,
  localeSelector,
  loadingSelector,
  searchResultsSelector,
  visibleMaterialsSelector
  } from './selectors'
import { materials, toggleShowFilter, setFilterItems } from './actions'
import messages from './messages'

class MaterialsView extends PureComponent {

  componentDidMount() {
    if (this.props.params.searchText && !this.props.searchResults) {
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

  viewMaterial = (idMaterial) => {
    this.props.router.push(`/materials/${idMaterial}`)
  }


  render() {
    const { showFilter, filters, visibleMaterials, locale, loading, filtersData } = this.props
    const searchText = this.props.params.searchText || ''
    let gallery
    if (loading) {
      gallery = <p> Searching materials...</p>
    } else if (!searchText) {
      gallery = null
    } else {
      gallery = visibleMaterials.length > 0
      ? (
        <MaterialList
          materials={visibleMaterials}
          locale={locale}
          viewMaterial={this.viewMaterial}
          filtersMap={filters}
          setFilterItems={this.props.setFilterItems}
          filtersData={filtersData}
        />
      )
      : <p>{<FormattedMessage {...messages.materialsNotFound} />}</p>
    }
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
        {showFilter ? <FilterList filtersMap={filters} setFilterItems={this.props.setFilterItems} filtersData={filtersData} /> : null}
        {gallery}
      </View>
    )
  }
}

MaterialsView.propTypes = {
  requestMaterials: PropTypes.func.isRequired,
  toggleShowFilter: PropTypes.func.isRequired,
  searchText: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  filters: PropTypes.instanceOf(Map),
  showFilter: PropTypes.bool,
  setFilterItems: PropTypes.func.isRequired,
  visibleMaterials: PropTypes.arrayOf(PropTypes.object),
  // Injected by React Router
  router: PropTypes.any.isRequired,
  locale: PropTypes.string.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.number),
  filtersData: PropTypes.instanceOf(Map)
}


const mapStateToProps = (state, ownProps) => ({
  filters: filtersSelector(state),
  showFilter: showFiltersSelector(state),
  locale: localeSelector(state),
  loading: loadingSelector(state),
  searchResults: searchResultsSelector(state, ownProps),
  visibleMaterials: visibleMaterialsSelector(state, ownProps),
  filtersData: state.getIn(['configuration', 'filtersData'])
})

const mapDispatchToProps = (dispatch) => ({
  requestMaterials: (locale, searchText) => {
    dispatch(materials.request(locale, searchText))
  },
  toggleShowFilter: () => {
    dispatch(toggleShowFilter())
  },
  setFilterItems: (filter, filterItem) => {
    dispatch(setFilterItems(filter, filterItem))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MaterialsView))
