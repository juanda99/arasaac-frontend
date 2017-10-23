/*
 *
 * MaterialsView
 *
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import View from 'components/View'
import Helmet from 'react-helmet'
import SearchField from 'components/SearchField'
import Toggle from 'material-ui/Toggle'
import { Tabs, Tab } from 'material-ui/Tabs'
import FavoriteIcon from 'material-ui/svg-icons/action/favorite'
import SearchIcon from 'material-ui/svg-icons/action/search'
import muiThemeable from 'material-ui/styles/muiThemeable'
import NewReleasesIcon from 'material-ui/svg-icons/av/new-releases'
import Divider from 'material-ui/Divider'
import SwipeableViews from 'react-swipeable-views'
import { Map } from 'immutable'
import FilterList from 'components/Filters'
import MaterialList from 'components/MaterialList'
import { withRouter } from 'react-router'
import ActionButtons from './ActionButtons'
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


const styles = {
  searchBar: {
    flexGrow: 1
  },
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    width: '100%'
  }
}

class MaterialsView extends PureComponent {


  state = {
    visibleSettings: false,
    visibleLabels: false
  }

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

  handleChange = (value) => {
    this.setState({
      slideIndex: value
    })
  }

  handleSubmit = (nextValue) => {
    if (this.props.params.searchText !== nextValue) {
      this.props.router.push(`/materials/search/${nextValue}`)
    }
  }

  showSettings = () => {
    this.setState({
      visibleSettings: !this.state.visibleSettings
    })
  }

  showLabels = () => {
    this.setState({
      visibleLabels: !this.state.visibleLabels
    })
  }

  render() {
    const { showFilter, filters, visibleMaterials, locale, loading, filtersData, muiTheme } = this.props
    const searchText = this.props.params.searchText || ''
    const { visibleLabels, visibleSettings, slideIndex } = this.state
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
          filtersMap={filters}
          setFilterItems={this.props.setFilterItems}
          filtersData={filtersData}
          showLabels={visibleLabels}
        />
      )
      : <p>{<FormattedMessage {...messages.materialsNotFound} />}</p>
    }

    return (
      <div>
        <Helmet title='PictogramsView' meta={[{ name: 'description', content: 'Description of PictogramsView' }]} />
        <Tabs onChange={this.handleChange} value={slideIndex} >
          <Tab label='Buscar' icon={<SearchIcon />} value={0} />
          <Tab label='Novedades' icon={<NewReleasesIcon />} value={1} />
          <Tab label='Favoritos' icon={<FavoriteIcon />} value={2} />
        </Tabs>
        <Divider />
        <SwipeableViews index={slideIndex} onChangeIndex={this.handleChange} >
          <div>
            <View left={true} right={true} style={{ backgroundColor: muiTheme.palette.accent2Color }}>
              <div style={styles.container}>
                <SearchField value={searchText} onSubmit={this.handleSubmit} style={styles.searchBar} />
                <ActionButtons
                  onFilterClick={this.props.toggleShowFilter} filterActive={showFilter}
                  onLabelsClick={this.showLabels} labelsActive={visibleLabels}
                  onSettingsClick={this.showSettings} settingsActive={visibleSettings}
                />
              </div>
              {visibleSettings ?
                <div>
                  <Toggle
                    label={<FormattedMessage {...messages.advancedSearch} />}
                    onToggle={this.props.toggleShowFilter}
                    defaultToggled={showFilter}
                    style={{ width: '200px' }}
                  />
                </div>
                : null
              }
              {showFilter ?
                <FilterList filtersMap={filters} setFilterItems={this.props.setFilterItems} filtersData={filtersData} />
                : null
              }
            </View>
            <Divider />
            <View left={true} right={true} top={1} >
              {gallery}
            </View>
          </div>
          <View left={true} right={true}>
            Sin implementardddd
          </View>
          <View left={true} right={true}>
            También sin implementar
          </View>
        </SwipeableViews>
      </div>
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
  muiTheme: PropTypes.object,
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(muiThemeable()(MaterialsView)))
