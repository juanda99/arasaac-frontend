/*
 *
 * PictogramsView
 *
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
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
import PictogramList from 'components/PictogramList'
import P from 'components/P'
import { withRouter } from 'react-router'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'
import ActionButtons from 'containers/MaterialsView/ActionButtons'
import { addFavorite, deleteFavorite } from 'containers/App/actions'
import { DEFAULT_LIST } from 'utils'
import {
  makeSelectHasUser,
  makeSelectRootFavorites
} from 'containers/App/selectors'
import {
  makeFiltersSelector,
  makeShowFiltersSelector,
  makeLoadingSelector,
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
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  }
}
class PictogramsView extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  state = {
    visibleSettings: false,
    visibleLabels: false,
    slideIndex: 0,
    listName: ''
  };

  componentDidMount() {
    const {
      requestPictograms,
      requestNewPictograms,
      requestAutocomplete,
      locale
    } = this.props
    if (this.props.params.searchText && !this.props.searchResults) {
      requestPictograms(locale, encodeURIComponent(this.props.params.searchText))
    }
    //  TODO: just ask once this stuff, once the app is open, depending on locale!!!
    requestNewPictograms(locale)
    requestAutocomplete(locale)
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

  handleChange = (value) =>
    this.setState({
      slideIndex: value
    });

  handleAddFavorite = (fileName) => {
    const { addFavorite, token } = this.props
    addFavorite(fileName, DEFAULT_LIST, token)
  };

  handleDeleteFavorite = (fileName) => {
    const { deleteFavorite, token } = this.props
    deleteFavorite(fileName, DEFAULT_LIST, token)
  };

  handleSubmit = (nextValue) => {
    this.setState({
      slideIndex: 0
    })
    if (this.props.params.searchText !== nextValue) {
      this.props.router.push(`/pictograms/search/${encodeURIComponent(nextValue)}`)
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
      filtersData,
      muiTheme,
      keywords,
      rootFavorites
    } = this.props
    const searchText = this.props.params.searchText || ''
    const { visibleLabels, visibleSettings, slideIndex } = this.state
    let pictogramsCounter
    let pictogramsList
    if (slideIndex === 0) pictogramsList = visiblePictograms
    else if (slideIndex === 1) pictogramsList = newPictogramsList
    let gallery
    if ((loading && searchText) || (loading && slideIndex !== 0)) {
      gallery = <p> Loading pictograms...</p>
    } else if (!searchText && slideIndex !== 1) {
      gallery = null
    } else {
      pictogramsCounter = pictogramsList.length
      gallery = pictogramsCounter ? (
        <PictogramList
          pictograms={pictogramsList}
          locale={locale}
          filtersMap={filters}
          setFilterItems={this.props.setFilterItems}
          showLabels={visibleLabels}
          searchText={searchText}
          onAddFavorite={this.handleAddFavorite}
          onDeleteFavorite={this.handleDeleteFavorite}
          favorites={rootFavorites}
        />
      ) : (
          <P>{<FormattedMessage {...messages.pictogramsNotFound} />}</P>
        )
    }

    return (
      <div>
        <Helmet
          title='PictogramsView'
          meta={[
            { name: 'description', content: 'Description of PictogramsView' }
          ]}
        />
        <TabsHeader onChange={this.handleChange} value={slideIndex} />
        <Divider />
        <SwipeableViews index={slideIndex} onChangeIndex={this.handleChange}>
          <div>
            <View
              style={{ backgroundColor: muiTheme.palette.accent2Color }}
            >
              <div style={styles.container}>
                <SearchField
                  value={searchText}
                  onSubmit={this.handleSubmit}
                  style={styles.searchBar}
                  dataSource={keywords}
                />
                {/* <ActionButtons
                  onFilterClick={this.props.toggleShowFilter}
                  filterActive={showFilter}
                  onLabelsClick={this.showLabels}
                  labelsActive={visibleLabels}
                  onSettingsClick={this.showSettings}
                  settingsActive={visibleSettings}
                  style={styles.actionButtons}
                /> */}
              </div>
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
                <P>
                  {' '}
                  <FormattedMessage
                    {...messages.pictogramsFound}
                    values={{ pictogramsCounter }}
                  />{' '}
                </P>
              ) : (
                  ''
                )}
              {gallery}
            </View>
          </div>
          <div>
            <View
              left={true}
              right={true}
              style={{ backgroundColor: 'muiTheme.palette.accent2Color' }}
            >
              <div style={styles.container}>
                <SearchField
                  value={searchText}
                  onSubmit={this.handleSubmit}
                  style={styles.searchBar}
                  dataSource={keywords}
                />
                <ActionButtons
                  onFilterClick={this.props.toggleShowFilter}
                  filterActive={showFilter}
                  onLabelsClick={this.showLabels}
                  labelsActive={visibleLabels}
                  onSettingsClick={this.showSettings}
                  settingsActive={visibleSettings}
                  style={styles.actionButtons}
                />
              </div>
              {visibleSettings ? (
                <div>
                  <Toggle
                    label={<FormattedMessage {...messages.advancedSearch} />}
                    onToggle={this.props.toggleShowFilter}
                    defaultToggled={showFilter}
                    style={{ width: '200px' }}
                  />
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
                <p>
                  {' '}
                  <FormattedMessage
                    {...messages.newPictogramsFound}
                    values={{ pictogramsCounter }}
                  />{' '}
                </p>
              ) : (
                  ''
                )}
              {gallery}
            </View>
          </div>
        </SwipeableViews>
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
  rootFavorites: ImmutablePropTypes.list.isRequired
}

PictogramsView.contextTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => ({
  filters: makeFiltersSelector()(state),
  showFilter: makeShowFiltersSelector()(state),
  locale: makeSelectLocale()(state),
  loading: makeLoadingSelector()(state),
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
)(withRouter(muiThemeable()(PictogramsView)))
