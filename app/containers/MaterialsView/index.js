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
import { denormalize } from 'normalizr'
import { searchMaterialSchema } from 'services/schemas'
import { getFilteredItems } from 'utils'
import { materials, toggleShowFilter, setFilterItems } from './actions'
import messages from './messages'

class MaterialsView extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
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

  viewMaterial = (idMaterial) => {
    this.props.router.push(`/materials/${idMaterial}`)
  }


  render() {
    const { children, showFilter, filters, visibleMaterials, locale, loading } = this.props
    const searchText = this.props.params.searchText || ''
    let gallery
    if (loading || !searchText) {
      gallery = null
    } else {
      gallery = visibleMaterials.length > 0
        ? React.cloneElement(children, { key: 'materialList', materials: visibleMaterials, locale, viewMaterial: this.viewMaterial })
        : <p>{<FormattedMessage {...messages.materialsNotFound} />}</p>
    }
    // const gallery = visibleMaterials.length > 0 ? React.cloneElement(children, { materials: visibleMaterials, locale, viewMaterial: this.viewMaterial }) : null
    // this code in return is not so good if children changes (search, categories...)
    //  {visibleMaterials.length > 0 && <MaterialList materials={visibleMaterials} />}
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
        {showFilter ? <FilterList filtersMap={filters} setFilterItems={this.props.setFilterItems} filtersData={this.props.filtersData} /> : null}
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
  filtersData: PropTypes.instanceOf(Map),
  showFilter: PropTypes.bool,
  setFilterItems: PropTypes.func.isRequired,
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
  const loading = state.getIn(['materialsView', 'loading'])
  const filtersData = state.getIn(['configuration', 'filtersData'])
  // const activeFilters = state.getIn(['materialsView', 'filters'])
  // denormalize: https://github.com/paularmstrong/normalizr/blob/master/docs/api.md#denormalizeinput-schema-entities
  // const materialSchema = new schema.Entity('materials', {}, { idAttribute: 'idMaterial' })
  // const searchMaterialSchema = [materialSchema]
  const searchResults = state.getIn(['materialsView', 'search', locale, ownProps.params.searchText]) || []
  const entities = {}
  entities.materials = state.getIn(['materialsView', 'materials']).toJS()
  const materialList = denormalize(searchResults, searchMaterialSchema, entities)
  const visibleMaterials = getFilteredItems(materialList, filters.toJS())
  // const visibleMaterials = materialList

  return ({
    filters,
    showFilter,
    visibleMaterials,
    locale,
    loading,
    filtersData
  })
}

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
