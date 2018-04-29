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
import TabsHeader from 'components/TabsHeader'
import muiThemeable from 'material-ui/styles/muiThemeable'
import Divider from 'material-ui/Divider'
import SwipeableViews from 'react-swipeable-views'
import { Map } from 'immutable'
import FilterList from 'components/Filters'
import MaterialList from 'components/MaterialList'
import P from 'components/P'
import { withRouter } from 'react-router'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'
import ActionButtons from './ActionButtons'
import {
  makeFiltersSelector,
  makeShowFiltersSelector,
  makeLoadingSelector,
  makeSearchResultsSelector,
  makeVisibleMaterialsSelector,
  makeNewMaterialsSelector
  } from './selectors'

import { materials, newMaterials, toggleShowFilter, setFilterItems } from './actions'
import messages from './messages'

const styles = {
  searchBar: {
    flexGrow: 1
  },
  actionButtons: {
    width: '150px'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  }
}

class MaterialsView extends PureComponent {


  state = {
    visibleSettings: false,
    visibleLabels: false,
    slideIndex: 0
  }

  componentDidMount() {
    const { requestMaterials, requestNewMaterials, locale } = this.props
    if (this.props.params.searchText && !this.props.searchResults) {
      requestMaterials(locale, this.props.params.searchText)
    }
    requestNewMaterials()
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
    // if (value === 1) this.props.requestNewMaterials()
  }

  handleSubmit = (nextValue) => {
    this.setState({
      slideIndex: 0
    })
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
    const { showFilter, filters, visibleMaterials, newMaterialsList, locale, loading, filtersData, muiTheme } = this.props
    const searchText = this.props.params.searchText || ''
    const { visibleLabels, visibleSettings, slideIndex } = this.state
    let materialsCounter
    // depending on which slide we are, we show one or another list */
    let materialsList
    if (slideIndex === 0) materialsList = visibleMaterials
    else materialsList = newMaterialsList
    let gallery
    if (loading) {
      gallery = <p> Loading materials...</p>
    } else if (!searchText && slideIndex === 0) {
      gallery = null
    } else {
      materialsCounter = materialsList.length
      gallery = materialsCounter
      ? (
        <div>
          <MaterialList
            materials={materialsList}
            locale={locale}
            filtersMap={filters}
            setFilterItems={this.props.setFilterItems}
            showLabels={visibleLabels}
          />
        </div>
      )
      : <P>{<FormattedMessage {...messages.materialsNotFound} />}</P>
    }
    return (
      <div>
        <Helmet title='PictogramsView' meta={[{ name: 'description', content: 'Description of PictogramsView' }]} />
        <TabsHeader onChange={this.handleChange} value={slideIndex} />
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
                  style={styles.actionButtons}
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
              {materialsCounter ? <P> <FormattedMessage {...messages.materialsFound} values={{ materialsCounter }} /> </P> : ''}
              {gallery}
            </View>
          </div>
          <div>
            <View left={true} right={true} style={{ backgroundColor: muiTheme.palette.accent2Color }}>
              <div style={styles.container}>
                <SearchField value={searchText} onSubmit={this.handleSubmit} style={styles.searchBar} />
                <ActionButtons
                  onFilterClick={this.props.toggleShowFilter} filterActive={showFilter}
                  onLabelsClick={this.showLabels} labelsActive={visibleLabels}
                  onSettingsClick={this.showSettings} settingsActive={visibleSettings}
                  style={styles.actionButtons}
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
              {materialsCounter ? <p> <FormattedMessage {...messages.newMaterialsFound} values={{ materialsCounter }} /> </p> : ''}
              {gallery}
            </View>
          </div>
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
  requestNewMaterials: PropTypes.func.isRequired,
  toggleShowFilter: PropTypes.func.isRequired,
  searchText: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  filters: PropTypes.instanceOf(Map),
  muiTheme: PropTypes.object,
  showFilter: PropTypes.bool,
  setFilterItems: PropTypes.func.isRequired,
  visibleMaterials: PropTypes.arrayOf(PropTypes.object),
  newMaterialsList: PropTypes.array.isRequired,
  // Injected by React Router
  router: PropTypes.any.isRequired,
  locale: PropTypes.string.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.number),
  filtersData: PropTypes.instanceOf(Map)
}


const mapStateToProps = (state, ownProps) => ({
  filters: makeFiltersSelector()(state),
  showFilter: makeShowFiltersSelector()(state),
  locale: makeSelectLocale()(state),
  loading: makeLoadingSelector()(state),
  searchResults: makeSearchResultsSelector()(state, ownProps),
  visibleMaterials: makeVisibleMaterialsSelector()(state, ownProps),
  filtersData: state.getIn(['configuration', 'filtersData']),
  newMaterialsList: makeNewMaterialsSelector()(state)
})

const mapDispatchToProps = (dispatch) => ({
  requestMaterials: (locale, searchText) => {
    dispatch(materials.request(locale, searchText))
  },
  requestNewMaterials: () => {
    dispatch(newMaterials.request())
  },
  toggleShowFilter: () => {
    dispatch(toggleShowFilter())
  },
  setFilterItems: (filter, filterItem) => {
    dispatch(setFilterItems(filter, filterItem))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(muiThemeable()(MaterialsView)))
