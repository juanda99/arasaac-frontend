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
import ReadMargin from 'components/ReadMargin'
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
    tab: 0,
    offset: 0
  }

  processQuery = props => {
    const { location } = props || this.props
    const { search, query } = location
    let parameters = { offset: 0, tab: 0 }
    if (search) {
      parameters = { ...parameters, ...query }
      const validKeys = ['offset', 'tab']
      Object.keys(parameters).forEach(key => validKeys.includes(key) || delete parameters[key])
      parameters.offset = parseInt(parameters.offset, 10)
      parameters.tab = parseInt(parameters.tab, 10)
    }
    const needUpdate = Object.keys(parameters).some(key => parameters[key] !== this.state[key])
    if (needUpdate) this.setState(parameters)
  }

  componentDidMount() {
    const { requestMaterials, requestNewMaterials, locale } = this.props
    this.processQuery()
    if (this.props.params.searchText && !this.props.searchResults) {
      requestMaterials(locale, this.props.params.searchText)
    }
    requestNewMaterials()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.searchText !== nextProps.params.searchText) {
      this.props.requestMaterials(this.props.locale, nextProps.params.searchText)
    }
    if (this.props.location.search !== nextProps.location.search) {
      this.processQuery(nextProps)
    }
  }

  handleChange = (tab) => {
    const { pathname } = this.props.location
    const url = `${pathname}?tab=${tab}`
    this.props.router.push(url)
  }

  handlePageClick = offset => {
    // fix bug if offset is not number, click comes from picto link, should not be processed here
    if (typeof offset === 'number') {
      const { tab } = this.state
      const { pathname } = this.props.location
      const url = `${pathname}?offset=${offset}&tab=${tab}`
      this.props.router.push(url)
    }
  }

  handleSubmit = (nextValue) => {
    this.setState({
      tab: 0
    })
    if (this.props.params.searchText !== nextValue) {
      this.props.router.push(`/materials/search/${encodeURIComponent(nextValue)}`)
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
    const { visibleLabels, tab, offset } = this.state
    let materialsCounter
    const hideIconText = width === SMALL
    // depending on which slide we are, we show one or another list */
    let materialsList
    if (tab === 0) materialsList = visibleMaterials
    else materialsList = newMaterialsList

    let gallery = ''
    if (loading) {
      gallery = <ReadMargin><P>{<FormattedMessage {...messages.loadingMaterials} />}</P></ReadMargin>
    } else if (!searchText && tab === 0) {
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
              offset={offset}
              onPageClick={this.handlePageClick}
            />
          </div>
        )
        : <ReadMargin><P>{<FormattedMessage {...messages.materialsNotFound} />}</P></ReadMargin>
    }
    return (
      <div>
        <Helmet title='PictogramsView' meta={[{ name: 'description', content: 'Description of PictogramsView' }]} />
        <Tabs onChange={this.handleChange} value={tab}>
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
                {materialsCounter ? <ReadMargin><P> <FormattedMessage {...messages.materialsFound} values={{ materialsCounter }} /> </P></ReadMargin> : ''}
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
                {materialsCounter ? <ReadMargin><P> <FormattedMessage {...messages.newMaterialsFound} values={{ materialsCounter }} /> </P> </ReadMargin> : ''}
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
