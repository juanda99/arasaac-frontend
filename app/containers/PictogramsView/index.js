/*
 *
 * PictogramsView
 *
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import View from 'components/View'
import Helmet from 'react-helmet'
import SearchField from 'components/SearchField'
import muiThemeable from 'material-ui/styles/muiThemeable'
import Divider from 'material-ui/Divider'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Map } from 'immutable'
import FilterList from 'components/Filters'
import PictogramList from 'components/PictogramList'
import P from 'components/P'
import { withRouter } from 'react-router'
import SearchIcon from 'material-ui/svg-icons/action/search'
import withWidth, { SMALL } from 'material-ui/utils/withWidth'
import NewReleasesIcon from 'material-ui/svg-icons/av/new-releases'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'
import ReadMargin from 'components/ReadMargin'
import { addFavorite, deleteFavorite } from 'containers/App/actions'
import { downloadPictogram } from 'services'
import { DEFAULT_LIST } from 'utils'
import {
  makeSelectHasUser,
  makeSelectRootFavorites
} from 'containers/App/selectors'
import {
  makeFiltersSelector,
  makeShowFiltersSelector,
  makeLoadingSelector,
  makeLoadingNewSelector,
  makeSearchResultsSelector,
  makeVisiblePictogramsSelector,
  makeNewPictogramsSelector,
  makeKeywordsSelectorByLocale,
  makeListSelector
  // makeFavoritePictogramsSelector
} from './selectors'
import {
  autocomplete,
  pictograms,
  // favoritePictograms,
  newPictograms,
  toggleShowFilter,
  setFilterItems
} from './actions'
import messages from './messages'

const styles = {
  searchBar: {
    flexGrow: 1
  },
  actionButtons: {
    width: '150px'
  },
}
class PictogramsView extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  state = {
    visibleSettings: false,
    visibleLabels: false,
    tab: 0,
    offset: 0,
    listName: ''
  };

  title = this.props.intl.formatMessage(messages.pageTitle)
  description = this.props.intl.formatMessage(messages.pageDesc)

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
    const {
      requestPictograms,
      requestNewPictograms,
      requestAutocomplete,
      locale,
      newPictogramsList,
      keywords
    } = this.props

    /* hack to open learning aac menu when visiting from homepage */
    const isOpen = window.document.getElementById("lstsearchpictos")
    if (!isOpen) document.getElementById('lstpictograms').click()

    this.processQuery()
    if (this.props.params.searchText && !this.props.searchResults) {
      requestPictograms(locale, encodeURIComponent(this.props.params.searchText))
    }

    /* we just ask for new pictograms twice and hour and autocomplete keywords once a day */
    const actualDate = new Date()

    const newPictogramsDate = sessionStorage.getItem(`newPictogramsDate_${locale}`)
    let diffSeconds = newPictogramsDate ? (actualDate.getTime() - newPictogramsDate) / 1000 : 0
    if (!newPictogramsList || newPictogramsList.size === 0 || diffSeconds > 1800) requestNewPictograms(locale)

    const keywordsDate = sessionStorage.getItem(`keywordsDate_${locale}`)
    diffSeconds = keywordsDate ? (actualDate.getTime() - keywordsDate) / 1000 : 0 
    if (!keywords || keywords.length === 0 || diffSeconds > 86400) requestAutocomplete(locale)
    
    // if (favorites && token) {
    //   const [...lists] = favorites.keys()
    //   const favoriteIds = lists.map((list) => favorites.get(list).toJS()).flat()
    //   requestFavorites(locale, favoriteIds, token)
    // }

  }
  componentWillReceiveProps(nextProps) {
    if (this.props.params.searchText !== nextProps.params.searchText) {
      const { requestPictograms, locale } = this.props
      requestPictograms(locale, encodeURIComponent(nextProps.params.searchText))
    }
    if (this.props.location.search !== nextProps.location.search) {
      this.processQuery(nextProps)
    }

    // if (this.props.favorites !== nextProps.favorites) {
    //   if (nextProps.favorites && nextProps.token) {
    //     const [...lists] = nextProps.favorites.keys()
    //     const favoriteIds = lists
    //       .map((list) => nextProps.favorites.get(list).toJS())
    //       .flat()
    //     this.props.requestFavorites(
    //       nextProps.locale,
    //       favoriteIds,
    //       nextProps.token
    //     )
    //   }
    // }
  }

  // handleChange = (value) =>
  //   this.setState({
  //     tab: value
  //   });

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

  handleAddFavorite = (fileName) => {
    const { addFavorite, token } = this.props
    addFavorite(fileName, DEFAULT_LIST, token)
  };

  handleDeleteFavorite = (fileName) => {
    const { deleteFavorite, token } = this.props
    deleteFavorite(fileName, DEFAULT_LIST, token)
  };

  handleDownload = (idPictogram, keyword) => {
    const location = downloadPictogram(idPictogram, keyword)
    window.location = location
  }

  handleSubmit = (nextValue) => {
    this.setState({
      tab: 0
    })
    if (this.props.params.searchText !== nextValue) {
      this.props.router.push(`/pictograms/search/${encodeURIComponent(nextValue)
        }`)
    }
  };

  showSettings = () => {
    this.setState({
      visibleSettings: !this.state.visibleSettings
    })
  };

  showLabels = () => {
    this.setState({
      visibleLabels: !this.state.visibleLabels
    })
  };

  render() {
    const {
      showFilter,
      filters,
      visiblePictograms,
      newPictogramsList,
      locale,
      loading,
      loadingNew,
      filtersData,
      muiTheme,
      keywords,
      rootFavorites,
      width
    } = this.props
    const searchText = this.props.params.searchText || ''
    const { visibleLabels, visibleSettings, offset, tab } = this.state
    const hideIconText = width === SMALL
    let gallery,  pictogramsCounter
    if (tab === 0) {
      pictogramsCounter = visiblePictograms.length
      gallery = loading ? 
        <ReadMargin><P>{<FormattedMessage {...messages.loadingPictograms} />}</P></ReadMargin>
        : pictogramsCounter ?
          <PictogramList
            pictograms={visiblePictograms}
            locale={locale}
            filtersMap={filters}
            setFilterItems={this.props.setFilterItems}
            showLabels={visibleLabels}
            searchText={searchText}
            onAddFavorite={this.handleAddFavorite}
            onDeleteFavorite={this.handleDeleteFavorite}
            onDownload={this.handleDownload}
            favorites={rootFavorites}
            rtl={muiTheme.direction === 'rtl'}
            offset={offset}
            onPageClick={this.handlePageClick}
          />
          : (
            <ReadMargin>
              {searchText && <P>{<FormattedMessage {...messages.pictogramsNotFound} />}</P>}
            </ReadMargin>
          ) 
    } else {
      pictogramsCounter = newPictogramsList.length
      gallery = loadingNew ? 
        <ReadMargin><P>{<FormattedMessage {...messages.loadingPictograms} />}</P></ReadMargin>
        : pictogramsCounter &&
          <PictogramList
            pictograms={newPictogramsList}
            locale={locale}
            filtersMap={filters}
            setFilterItems={this.props.setFilterItems}
            showLabels={visibleLabels}
            searchText={searchText}
            onAddFavorite={this.handleAddFavorite}
            onDeleteFavorite={this.handleDeleteFavorite}
            onDownload={this.handleDownload}
            favorites={rootFavorites}
            rtl={muiTheme.direction === 'rtl'}
            offset={offset}
            onPageClick={this.handlePageClick}
          />
    }

    return (
      <div>
        <Helmet>
          <title>{this.title}</title>
          <meta name="description" content={this.description} />
        </Helmet>
        <Tabs onChange={this.handleChange} value={tab}>
          <Tab
            label={hideIconText ? '' : <FormattedMessage {...messages.search} />}
            icon={<SearchIcon />}
            value={0}
          >
            <div>
              <View left={true} right={true} style={{ backgroundColor: muiTheme.palette.accent2Color }}>
                <SearchField
                  value={searchText}
                  onSubmit={this.handleSubmit}
                  style={styles.searchBar}
                  dataSource={keywords}
                  filterFromStart={true}
                />
                {visibleSettings ? (
                  <div>
                    <p>todo</p>
                  </div>
                ) : null}
                {showFilter ? (
                  <FilterList
                    filtersMap={filters}
                    setFilterItems={this.props.setFilterItems}
                    filtersData={filtersData}
                  />
                ) : null}
              </View>
              <Divider />
              <View left={true} right={true} top={1}>
                {pictogramsCounter ? (
                  <ReadMargin>
                    <P>
                      {' '}
                      <FormattedMessage
                        {...messages.pictogramsFound}
                        values={{ pictogramsCounter }}
                      />{' '}
                    </P>
                  </ReadMargin>

                ) : (
                    ''
                  )}
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
                <SearchField
                  value={searchText}
                  onSubmit={this.handleSubmit}
                  style={styles.searchBar}
                  dataSource={keywords}
                />
                {visibleSettings ? (
                  <div>
                    <p>todo</p>
                  </div>
                ) : null}
                {showFilter ? (
                  <FilterList
                    filtersMap={filters}
                    setFilterItems={this.props.setFilterItems}
                    filtersData={filtersData}
                  />
                ) : null}
              </View>
              <Divider />
              <View left={true} right={true} top={1}>
                {pictogramsCounter ? (
                  <ReadMargin>
                    <P>
                      {' '}
                      <FormattedMessage
                        {...messages.newPictogramsFound}
                        values={{ pictogramsCounter }}
                      />{' '}
                    </P>

                  </ReadMargin>

                ) : (
                    ''
                  )}
                {gallery}
              </View>
            </div>

          </Tab>
        </Tabs>
      </div>
    )
  }
}

PictogramsView.propTypes = {
  requestAutocomplete: PropTypes.func.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string),
  requestPictograms: PropTypes.func.isRequired,
  requestNewPictograms: PropTypes.func.isRequired,
  toggleShowFilter: PropTypes.func.isRequired,
  searchText: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  loadingNew: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  filters: PropTypes.instanceOf(Map),
  muiTheme: PropTypes.object,
  showFilter: PropTypes.bool,
  setFilterItems: PropTypes.func.isRequired,
  visiblePictograms: PropTypes.arrayOf(PropTypes.object),
  newPictogramsList: PropTypes.arrayOf(PropTypes.object),
  // Injected by React Router
  router: PropTypes.any.isRequired,
  locale: PropTypes.string.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.number),
  filtersData: PropTypes.instanceOf(Map),
  addFavorite: PropTypes.func.isRequired,
  deleteFavorite: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  rootFavorites: ImmutablePropTypes.list.isRequired,
  width: PropTypes.number.isRequired
}

PictogramsView.contextTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => ({
  filters: makeFiltersSelector()(state),
  showFilter: makeShowFiltersSelector()(state),
  locale: makeSelectLocale()(state),
  loading: makeLoadingSelector()(state),
  loadingNew: makeLoadingNewSelector()(state),
  searchResults: makeSearchResultsSelector()(state, ownProps),
  visiblePictograms: makeVisiblePictogramsSelector()(state, ownProps),
  filtersData: state.getIn(['configuration', 'filtersData']),
  newPictogramsList: makeNewPictogramsSelector()(state),
  keywords: makeKeywordsSelectorByLocale()(state),
  token: makeSelectHasUser()(state),
  rootFavorites: makeSelectRootFavorites()(state),
  selectedList: makeListSelector()(state)
  // favoritePictograms: makeFavoritePictogramsSelector()(state)
})
// const pictoList = state.getIn(['pictogramView', 'search', ownProps.params.searchText]) || []

const mapDispatchToProps = (dispatch) => ({
  requestPictograms: (locale, searchText) => {
    dispatch(pictograms.request(locale, searchText))
  },
  requestNewPictograms: (locale) => {
    dispatch(newPictograms.request(locale))
  },
  // requestFavorites: (locale, idFavorites, token) => {
  //   dispatch(favoritePictograms.request(locale, idFavorites, token))
  // },
  toggleShowFilter: () => {
    dispatch(toggleShowFilter())
  },
  setFilterItems: (filter, filterItem) => {
    dispatch(setFilterItems(filter, filterItem))
  },
  requestAutocomplete: (locale) => {
    dispatch(autocomplete.request(locale))
  },
  addFavorite: (fileName, listName, token) => {
    dispatch(addFavorite.request(fileName, listName, token))
  },
  deleteFavorite: (fileName, listName, token) => {
    dispatch(deleteFavorite.request(fileName, listName, token))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(muiThemeable()(withWidth()(injectIntl(PictogramsView)))))
