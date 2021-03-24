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
import DivSearchBox from 'components/DivSearchBox'
import WarningBox from 'components/WarningBox'
import LanguageSelector from 'components/LanguageSelector'
import Helmet from 'react-helmet'
import SearchField from 'components/SearchField'
import PictogramTags from 'components/PictogramTags'
import languages from 'data/languages'
import muiThemeable from 'material-ui/styles/muiThemeable'
import Divider from 'material-ui/Divider'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Map, Set } from 'immutable'
import PictogramList from 'components/PictogramList'
import P from 'components/P'
import RaisedButton from 'material-ui/RaisedButton'
import { withRouter, Link } from 'react-router'
import SearchIcon from 'material-ui/svg-icons/action/search'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import IconButton from 'material-ui/IconButton'
import withWidth, { SMALL } from 'material-ui/utils/withWidth'
import NewReleasesIcon from 'material-ui/svg-icons/av/new-releases'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'
import ReadMargin from 'components/ReadMargin'
import { addFavorite, deleteFavorite } from 'containers/App/actions'
import { downloadPictogram } from 'services'
import { DEFAULT_LIST } from 'utils'
import {
  makeSelectHasUser,
  makeSelectRootFavorites,
  makeSelectSexPictograms,
  makeSelectViolencePictograms,
  makeSelectColorPictograms,
  makeSelectSearchLanguage,
} from 'containers/App/selectors'
import {
  makeLoadingSelector,
  makeLoadingNewSelector,
  makeSearchResultsSelector,
  makeVisiblePictogramsSelector,
  makeNewPictogramsSelector,
  makeKeywordsSelectorByLocale,
  makeCategoriesSelectorByLocale,
  makeListSelector,
  makeSelectPictogramSearchLanguage,
  // makeFavoritePictogramsSelector
} from './selectors'
import {
  autocomplete,
  pictograms,
  categories,
  // favoritePictograms,
  newPictograms,
  setSearchLanguage,
} from './actions'
import messages from './messages'
import CategoryTree from '../../components/CategoryTree'

const styles = {
  searchBar: {
    flexGrow: 1,
  },
  actionButtons: {
    width: '150px',
  },
}
class PictogramsView extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  state = {
    tab: 0,
    offset: 0,
    listName: '',
    selectedTags: Set(),
    showLanguageWarning: false,
    selectedKey: '',
    selectedSubKey: '',
  }

  title = this.props.intl.formatMessage(messages.pageTitle)
  description = this.props.intl.formatMessage(messages.pageDesc)

  processQuery = (props) => {
    const { location } = props || this.props
    const { search, query } = location
    let parameters = {
      offset: 0,
      tab: 0,
      filters: Set(),
      selectedKey: '',
      selectedSubKey: '',
    }
    parameters = { ...parameters, ...query }
    const validKeys = [
      'offset',
      'tab',
      'filters',
      'selectedKey',
      'selectedSubKey',
    ]
    Object.keys(parameters).forEach(
      (key) => validKeys.includes(key) || delete parameters[key]
    )
    if (query.filters) parameters.selectedTags = Set(JSON.parse(query.filters))
    delete parameters['filters'] //use filter in url  but selectedTags in state
    parameters.offset = parseInt(parameters.offset, 10)
    parameters.tab = parseInt(parameters.tab, 10)
    this.setState(parameters)
  }

  componentDidMount() {
    const {
      requestPictograms,
      searchLanguage,
      defaultSearchLanguage,
    } = this.props
    const language = searchLanguage ? searchLanguage : defaultSearchLanguage

    /* hack to open learning aac menu when visiting from homepage */
    const isOpen = window.document.getElementById('lstsearchpictos')
    if (!isOpen) document.getElementById('lstpictograms').click()

    this.processQuery()
    if (this.props.params.searchText && !this.props.searchResults) {
      requestPictograms(
        language,
        encodeURIComponent(this.props.params.searchText)
      )
    }

    this.loadInitialData(language)

    // if (favorites && token) {
    //   const [...lists] = favorites.keys()
    //   const favoriteIds = lists.map((list) => favorites.get(list).toJS()).flat()
    //   requestFavorites(locale, favoriteIds, token)
    // }
  }

  loadInitialData = (searchLanguage) => {
    const {
      requestCategories,
      requestNewPictograms,
      requestAutocomplete,
      newPictogramsList,
      keywords,
      categories,
    } = this.props
    /* we just ask for new pictograms twice and hour and autocomplete keywords once a day */
    const actualDate = new Date()

    const newPictogramsDate = sessionStorage.getItem(
      `newPictogramsDate_${searchLanguage}`
    )
    let diffSeconds = newPictogramsDate
      ? (actualDate.getTime() - newPictogramsDate) / 1000
      : 0
    if (
      !newPictogramsList ||
      searchLanguage !== this.props.searchLanguage ||
      newPictogramsList.size === 0 ||
      diffSeconds > 1800
    )
      requestNewPictograms(searchLanguage)

    const keywordsDate = sessionStorage.getItem(
      `keywordsDate_${searchLanguage}`
    )
    diffSeconds = keywordsDate
      ? (actualDate.getTime() - keywordsDate) / 1000
      : 0
    if (
      !keywords ||
      searchLanguage !== this.props.searchLanguage ||
      keywords.length === 0 ||
      diffSeconds > 86400
    )
      requestAutocomplete(searchLanguage)

    const categoriesDate = sessionStorage.getItem(
      `categoriesDate_${searchLanguage}`
    )
    diffSeconds = categoriesDate
      ? (actualDate.getTime() - categoriesDate) / 1000
      : 0
    if (
      !categories ||
      searchLanguage !== this.props.searchLanguage ||
      categories.size === 0 ||
      diffSeconds > 86400
    )
      requestCategories(searchLanguage)

    const languageData = languages.find((lang) => lang.code === searchLanguage)
    const { translated, needTranslators } = languageData
    this.setState({ showLanguageWarning: !translated, needTranslators })
  }

  componentWillReceiveProps(nextProps) {
    const { requestPictograms } = this.props
    if (this.props.params.searchText !== nextProps.params.searchText) {
      this.setState({ selectedTags: Set() })
      requestPictograms(
        nextProps.searchLanguage,
        encodeURIComponent(nextProps.params.searchText)
      )
    }
    if (this.props.searchLanguage !== nextProps.searchLanguage) {
      this.loadInitialData(nextProps.searchLanguage)
      requestPictograms(
        nextProps.searchLanguage,
        encodeURIComponent(nextProps.params.searchText)
      )
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

  handleCatClick = (selectedKey) => {
    const { pathname } = this.props.location
    const url = `${pathname}?selectedKey=${selectedKey}`
    this.props.router.push(url)
  }

  handleSubCatClick = (selectedSubKey) => {
    const { selectedKey } = this.state
    const { pathname } = this.props.location
    const url = `${pathname}?selectedKey=${selectedKey}&selectedSubKey=${selectedSubKey}`
    this.props.router.push(url)
  }

  handleLanguageChange = (searchLanguage) => {
    const { setSearchLanguage, router } = this.props
    setSearchLanguage(searchLanguage)
    // if (params.searchText) requestPictograms(searchLanguage, encodeURIComponent(params.searchText))
  }

  handlePageClick = (offset) => {
    // fix bug if offset is not number, click comes from picto link, should not be processed here
    if (typeof offset === 'number') {
      const { tab } = this.state
      const { pathname } = this.props.location
      const url = `${pathname}?offset=${offset}&tab=${tab}`
      this.props.router.push(url)
    }
  }

  handleReset = () => this.props.router.push('/pictograms/search')

  handleUpdateTags = (tag) => {
    const { selectedTags } = this.state
    const { pathname } = this.props.location
    let filterURI
    if (selectedTags.has(tag)) {
      filterURI = encodeURIComponent(JSON.stringify(selectedTags.remove(tag)))
    } // this.setState({selectedTags: })
    else {
      // this.setState({selectedTags: selectedTags.add(tag)})
      filterURI = encodeURIComponent(JSON.stringify(selectedTags.add(tag)))
    }
    // filter set offset to 0 and default tab is 0, where filters are used, so we remove these  parameters
    const url = `${pathname}?filters=${filterURI}`
    this.props.router.push(url)
  }

  handleAddFavorite = (fileName) => {
    const { addFavorite, token } = this.props
    addFavorite(fileName, DEFAULT_LIST, token)
  }

  handleDeleteFavorite = (fileName) => {
    const { deleteFavorite, token } = this.props
    deleteFavorite(fileName, DEFAULT_LIST, token)
  }

  handleDownload = (idPictogram, keyword) => {
    const id = idPictogram.toString().replace('aac', '')
    const color = idPictogram.toString() !== id ? false : this.props.color
    const location = downloadPictogram(id, keyword, color)
    window.location = location
  }

  handleRemoveWarning = () => this.setState({ showLanguageWarning: false })

  /* also used from PictogramTags */
  handleSubmit = (nextValue) => {
    this.setState({
      tab: 0,
    })
    if (this.props.params.searchText !== nextValue) {
      this.props.router.push(
        `/pictograms/search/${encodeURIComponent(nextValue)}`
      )
    }
  }

  render() {
    const {
      visiblePictograms,
      newPictogramsList,
      loading,
      loadingNew,
      muiTheme,
      keywords,
      rootFavorites,
      width,
      categories,
      sex,
      violence,
      color,
      searchLanguage,
    } = this.props
    const searchText = this.props.params.searchText || ''
    const {
      offset,
      tab,
      selectedTags,
      selectedKey,
      selectedSubKey,
      showLanguageWarning,
      needTranslators,
    } = this.state
    const hideIconText = width === SMALL
    let gallery, pictogramsCounter
    const filterVisiblePictograms = visiblePictograms.filter((pictogram) =>
      selectedTags.every((tag) => pictogram.tags.indexOf(tag) !== -1)
    )
    if (tab === 0) {
      pictogramsCounter = filterVisiblePictograms.length
      gallery = loading ? (
        <ReadMargin>
          <P>{<FormattedMessage {...messages.loadingPictograms} />}</P>
        </ReadMargin>
      ) : pictogramsCounter ? (
        <PictogramList
          pictograms={filterVisiblePictograms}
          locale={searchLanguage}
          searchText={searchText}
          onAddFavorite={this.handleAddFavorite}
          onDeleteFavorite={this.handleDeleteFavorite}
          onDownload={this.handleDownload}
          favorites={rootFavorites}
          rtl={muiTheme.direction === 'rtl'}
          offset={offset}
          onPageClick={this.handlePageClick}
          sex={sex}
          violence={violence}
          color={color}
        />
      ) : (
        <ReadMargin>
          {searchText && (
            <P>{<FormattedMessage {...messages.pictogramsNotFound} />}</P>
          )}
        </ReadMargin>
      )
    } else {
      pictogramsCounter = newPictogramsList.length
      gallery = loadingNew ? (
        <ReadMargin>
          <P>{<FormattedMessage {...messages.loadingPictograms} />}</P>
        </ReadMargin>
      ) : (
        pictogramsCounter && (
          <PictogramList
            pictograms={newPictogramsList}
            locale={searchLanguage}
            searchText={searchText}
            onAddFavorite={this.handleAddFavorite}
            onDeleteFavorite={this.handleDeleteFavorite}
            onDownload={this.handleDownload}
            favorites={rootFavorites}
            rtl={muiTheme.direction === 'rtl'}
            offset={offset}
            onPageClick={this.handlePageClick}
            sex={sex}
            violence={violence}
            color={color}
          />
        )
      )
    }

    const renderSearchBox = (
      <div>
        <DivSearchBox id="searchBox">
          <SearchField
            value={searchText}
            dataSource={keywords}
            onSubmit={this.handleSubmit}
            filterFromStart={true}
            style={{ flexGrow: 1 }}
          />
        </DivSearchBox>
        <ReadMargin>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'baseline',
            }}
          >
            <LanguageSelector
              value={searchLanguage}
              onChange={this.handleLanguageChange}
              shortOption={true}
              toolTip={this.props.intl.formatMessage(
                messages['languageSearch']
              )}
            />
            <RaisedButton
              label={<FormattedMessage {...messages.searchByCategory} />}
              onClick={this.handleReset}
              disabled={!searchText}
              style={{ maxHeight: '36px', marginBottom: '20px' }}
              secondary={true}
            />
          </div>
        </ReadMargin>
      </div>
    )
    return (
      <div>
        <Helmet>
          <title>{this.title}</title>
          <meta name="description" content={this.description} />
        </Helmet>

        <Tabs onChange={this.handleChange} value={tab}>
          <Tab
            label={
              hideIconText ? '' : <FormattedMessage {...messages.search} />
            }
            icon={<SearchIcon />}
            value={0}
          >
            <div>
              <View
                left={true}
                right={true}
                style={{
                  backgroundColor: muiTheme.palette.accent2Color,
                  paddingBottom: '2em',
                }}
              >
                {renderSearchBox}
              </View>
              <Divider />
              <View left={true} right={true} top={1}>
                {showLanguageWarning && (
                  <WarningBox>
                    <IconButton
                      onClick={this.handleRemoveWarning}
                      tooltip={<FormattedMessage {...messages.closeWarning} />}
                      style={{ position: 'absolute', right: -10, top: -10 }}
                    >
                      <CloseIcon />
                    </IconButton>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        maxWidth: '700px',
                      }}
                    >
                      <P>
                        {<FormattedMessage {...messages.translationsWarning} />}{' '}
                        &nbsp;{' '}
                        <Link to="/translators">
                          {<FormattedMessage {...messages.translationStatus} />}
                        </Link>
                        <br />
                        {needTranslators && (
                          <span>
                            {<FormattedMessage {...messages.needTranslators} />}{' '}
                            &nbsp;
                            <Link to="/contact-us">
                              {
                                <FormattedMessage
                                  {...messages.contactTranslators}
                                />
                              }
                            </Link>
                          </span>
                        )}
                      </P>
                    </div>
                  </WarningBox>
                )}
                {!!pictogramsCounter && tab !== 1 && (
                  <PictogramTags
                    searchText={searchText}
                    selectedTags={selectedTags}
                    pictograms={filterVisiblePictograms}
                    categories={categories}
                    locale={searchLanguage}
                    onUpdateTags={this.handleUpdateTags}
                    onCategoryClick={this.handleSubmit}
                  />
                )}
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
                {!pictogramsCounter && tab !== 1 && !!categories.size && (
                  <CategoryTree
                    categories={categories}
                    locale={searchLanguage}
                    onCatChange={this.handleCatClick}
                    onSubCatChange={this.handleSubCatClick}
                    selectedKey={selectedKey}
                    selectedSubKey={selectedSubKey}
                  />
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
              <View
                left={true}
                right={true}
                style={{
                  backgroundColor: muiTheme.palette.accent2Color,
                  paddingBottom: '2em',
                }}
              >
                {renderSearchBox}
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
  searchText: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  loadingNew: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  filters: PropTypes.instanceOf(Map),
  muiTheme: PropTypes.object,
  visiblePictograms: PropTypes.arrayOf(PropTypes.object),
  newPictogramsList: PropTypes.arrayOf(PropTypes.object),
  // Injected by React Router
  router: PropTypes.any.isRequired,
  locale: PropTypes.string.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.number),
  addFavorite: PropTypes.func.isRequired,
  deleteFavorite: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  rootFavorites: ImmutablePropTypes.list.isRequired,
  width: PropTypes.number.isRequired,
}

PictogramsView.contextTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state, ownProps) => ({
  locale: makeSelectLocale()(state),
  loading: makeLoadingSelector()(state),
  loadingNew: makeLoadingNewSelector()(state),
  searchResults: makeSearchResultsSelector()(state, ownProps),
  visiblePictograms: makeVisiblePictogramsSelector()(state, ownProps),
  newPictogramsList: makeNewPictogramsSelector()(state),
  keywords: makeKeywordsSelectorByLocale()(state),
  categories: makeCategoriesSelectorByLocale()(state),
  token: makeSelectHasUser()(state),
  rootFavorites: makeSelectRootFavorites()(state),
  selectedList: makeListSelector()(state),
  sex: makeSelectSexPictograms()(state),
  violence: makeSelectViolencePictograms()(state),
  color: makeSelectColorPictograms()(state),
  searchLanguage: makeSelectPictogramSearchLanguage()(state),
  defaultSearchLanguage: makeSelectSearchLanguage()(state),
  // favoritePictograms: makeFavoritePictogramsSelector()(state)
})
// const pictoList = state.getIn(['pictogramView', 'search', ownProps.params.searchText]) || []

const mapDispatchToProps = (dispatch) => ({
  requestPictograms: (locale, searchText) => {
    dispatch(pictograms.request(locale, searchText))
  },
  requestCategories: (locale) => {
    dispatch(categories.request(locale))
  },
  requestNewPictograms: (locale) => {
    dispatch(newPictograms.request(locale))
  },
  // requestFavorites: (locale, idFavorites, token) => {
  //   dispatch(favoritePictograms.request(locale, idFavorites, token))
  // },
  requestAutocomplete: (locale) => {
    dispatch(autocomplete.request(locale))
  },
  addFavorite: (fileName, listName, token) => {
    dispatch(addFavorite.request(fileName, listName, token))
  },
  deleteFavorite: (fileName, listName, token) => {
    dispatch(deleteFavorite.request(fileName, listName, token))
  },
  setSearchLanguage: (language) => {
    dispatch(setSearchLanguage(language))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(muiThemeable()(withWidth()(injectIntl(PictogramsView)))))
