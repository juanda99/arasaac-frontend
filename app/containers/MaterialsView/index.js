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
import SearchIcon from 'material-ui/svg-icons/action/search'
import withWidth, { SMALL } from 'material-ui/utils/withWidth'
import NewReleasesIcon from 'material-ui/svg-icons/av/new-releases'
import muiThemeable from 'material-ui/styles/muiThemeable'
import Divider from 'material-ui/Divider'
import { Tabs, Tab } from 'material-ui/Tabs'
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
import languages from 'data/languages'
import activities from 'data/activities'
import areas from 'data/areas'
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

const filtersData = { areas, activities, languages }


class MaterialsView extends PureComponent {


  state = {
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

  showLabels = () => {
    this.setState({
      visibleLabels: !this.state.visibleLabels
    })
  }

  render() {
    const { showFilter, filters, visibleMaterials, newMaterialsList, locale, loading, muiTheme, width } = this.props
    const searchText = this.props.params.searchText || ''
    const { visibleLabels, slideIndex } = this.state
    let materialsCounter
    const hideIconText = width === SMALL
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
        <Tabs onChange={this.handleChange} value={slideIndex}>
          <Tab
            label={hideIconText ? '' : <FormattedMessage {...messages.search} />}
            icon={<SearchIcon />}
            value={0}
          >
            <div>
              <View left={true} right={true} style={{ backgroundColor: muiTheme.palette.accent2Color }}>
                <div style={styles.container}>
                  <SearchField value={searchText} onSubmit={this.handleSubmit} style={styles.searchBar} />
                  <ActionButtons
                    onFilterClick={this.props.toggleShowFilter} filterActive={showFilter}
                    onLabelsClick={this.showLabels} labelsActive={visibleLabels}
                    style={styles.actionButtons}
                  />
                </div>
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
          </Tab>
          <Tab
            label={hideIconText ? '' : <FormattedMessage {...messages.new} />}
            icon={<NewReleasesIcon />}
            value={1}
          >
            <div>
              <View left={true} right={true} style={{ backgroundColor: muiTheme.palette.accent2Color }}>
                <div style={styles.container}>
                  <SearchField value={searchText} onSubmit={this.handleSubmit} style={styles.searchBar} />
                  <ActionButtons
                    onFilterClick={this.props.toggleShowFilter} filterActive={showFilter}
                    onLabelsClick={this.showLabels} labelsActive={visibleLabels}
                    style={styles.actionButtons}
                  />
                </div>
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
          </Tab>
        </Tabs>

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
  width: PropTypes.number.isRequired
}


const mapStateToProps = (state, ownProps) => ({
  filters: makeFiltersSelector()(state),
  showFilter: makeShowFiltersSelector()(state),
  locale: makeSelectLocale()(state),
  loading: makeLoadingSelector()(state),
  searchResults: makeSearchResultsSelector()(state, ownProps),
  visibleMaterials: makeVisibleMaterialsSelector()(state, ownProps),
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(muiThemeable()(withWidth()(MaterialsView))))
