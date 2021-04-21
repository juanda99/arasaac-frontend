/*
 *
 * MaterialsView
 *
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import muiThemeable from 'material-ui/styles/muiThemeable'
import View from 'components/View'
import { Helmet } from 'react-helmet'
import SearchField from 'components/SearchField'
import DivSearchBox from 'components/DivSearchBox'
import SearchIcon from 'material-ui/svg-icons/action/search'
import PendingIcon from 'material-ui/svg-icons/action/visibility-off'
import NotPublishedIcon from 'material-ui/svg-icons/action/thumb-down'
import withWidth, { SMALL } from 'material-ui/utils/withWidth'
import Divider from 'material-ui/Divider'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Map } from 'immutable'
import Toggle from 'material-ui/Toggle'
import FilterList from 'components/Filters'
import MaterialList from 'components/MaterialList'
import P from 'components/P'
import FilterWrapper from './FilterWrapper'
import ReadMargin from 'components/ReadMargin'
import { withRouter } from 'react-router'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'
import { makeSelectHasUser, makeSelectRole } from 'containers/App/selectors'
import {
  makeFiltersSelector,
  makeLoadingSelector,
  makeLoadingNewSelector,
  makeSearchResultsSelector,
  makeVisibleMaterialsSelector,
  makeNewVisibleMaterialsSelector,
  makePendingSelector,
  makeNotPublishedSelector,
  makeAuthorsNameSelector,
  // makeUrlParams,
} from './selectors'

import {
  materials,
  newMaterials,
  authors,
  notPublishedMaterials,
  setFilterItems,
  publishMaterial,
  removeMaterial,
} from './actions'
import languages from 'data/languages'
import activities from 'data/activities'
import areas from 'data/areas'
import messages from './messages'

const filtersData = { area: areas, activity: activities, language: languages }

const homeUrl = '/materials/search'

class MaterialsView extends PureComponent {
  state = {
    tab: 0,
    offset: 0,
    showNewMaterials: true,
    getNewMaterials: false,
    getUnpublished: false,
  }

  processQuery = (props) => {
    const { location, params, searchResults, token, locale, setFilterItems } =
      props || this.props
    const { search, query } = location
    const { loading } = this.state

    /* update offset or tab if  needed */
    let parameters = { offset: 0, tab: 0, searchByAuthor: false }
    const validKeys = Object.keys(parameters)
    parameters = { ...parameters, ...query }
    Object.keys(parameters).forEach(
      (key) => validKeys.includes(key) || delete parameters[key]
    )
    parameters.offset = parseInt(parameters.offset, 10) || 0
    parameters.tab = parseInt(parameters.tab, 10) || 0
    parameters.searchByAuthor = parameters.searchByAuthor == 'true' // move string to boolean
    const { activity, language, area } = { ...location.query }
    if (activity || area || language || params.searchText)
      parameters.showNewMaterials = false
    else {
      parameters.showNewMaterials = true
    }
    const needUpdate = Object.keys(parameters).some(
      (key) => parameters[key] !== this.state[key]
    )
    if (needUpdate) this.setState(parameters)

    /* we set the  state: */
    if (activity) setFilterItems('activity', parseInt(activity))
    if (area) setFilterItems('area', parseInt(area))
    if (languages) setFilterItems('language', language)

    /* if  changes we make ajax call  is not cached */
    if (
      (activity || area || language || params.searchText) &&
      parameters.tab === 0 &&
      !searchResults &&
      !loading
    ) {
      if (params.searchText) {
        const searchType = parameters.searchByAuthor ? 'author' : 'content'
        this.props.requestMaterials(
          language || locale,
          params.searchText,
          searchType,
          token
        )
      } else if (area) {
        this.props.requestMaterials(locale, area, 'area', token)
      } else if (activity) {
        this.props.requestMaterials(locale, activity, 'activity', token)
      } else if (languages) {
        this.props.requestMaterials(locale, language, 'language', token)
      }
    }

    /* if  we  get filters through params we proccess them */
    // const searchType = params.location.search.split('searchType=')[1]
  }

  async componentDidMount() {
    const {
      requestNewMaterials,
      requestNotPublishedMaterials,
      token,
      role,
      authorsName,
      requestAuthors,
      newVisibleMaterialsList,
    } = this.props
    /* hack to open learning aac menu when visiting from homepage */
    const isOpen = window.document.getElementById('lstsearchmaterials')
    if (!isOpen) document.getElementById('lstmaterials').click()

    await this.processQuery()

    /* we just ask for new Materials twice an hour */
    const newMaterialsDate = sessionStorage.getItem('newMaterialsDate')
    const actualDate = new Date()
    const diffSeconds = newMaterialsDate
      ? (actualDate.getTime() - newMaterialsDate) / 1000
      : 0
    const numItems = role === 'admin' ? 100 : 100
    if (newVisibleMaterialsList.size === 0 || diffSeconds > 1800)
      requestNewMaterials(numItems, token)
    if (role === 'admin') requestNotPublishedMaterials(token)
    if (!authorsName.length) requestAuthors()
  }

  componentWillReceiveProps(nextProps) {
    const previousParams = JSON.stringify(this.props.location.query)
    const nextParams = JSON.stringify(nextProps.location.query)
    if (
      this.props.params.searchText !== nextProps.params.searchText ||
      previousParams !== nextParams
    )
      this.processQuery(nextProps)
  }

  handleChange = (tab) => {
    const { params, location } = this.props
    const searchText = params.searchText || ''
    const objParams = { ...location.query, tab }
    let urlParameters = this.getUrlParameters(objParams)
    const url = searchText
      ? `${homeUrl}/${searchText}?${urlParameters}`
      : `${homeUrl}?${urlParameters}`
    this.props.router.push(url)
  }

  handlePageClick = (offset) => {
    // fix bug if offset is not number, click comes from picto link, should not be processed here
    if (typeof offset === 'number') {
      const { params, location } = this.props
      const searchText = params.searchText || ''
      const objParams = { ...location.query, offset }
      let urlParameters = this.getUrlParameters(objParams)
      const url = searchText
        ? `${homeUrl}/${searchText}?${urlParameters}`
        : `${homeUrl}?${urlParameters}`
      this.props.router.push(url)
    }
  }

  handleUrlChange = (filterType, filterValue, searchValue) => {
    const { params, location, setFilterItems } = this.props
    const searchText = searchValue || params.searchText || ''
    const objParams = { ...location.query, offset: 0 }
    if (filterValue) {
      objParams[filterType] = filterValue
      // setFilterItems(filterType, filterValue)
    } else if (filterType) {
      delete objParams[filterType]
      setFilterItems(filterType, '')
    }
    if (searchValue) objParams.tab = 0 //  if searching, we move to first tab
    let urlParameters = this.getUrlParameters(objParams)
    const url = searchText
      ? `${homeUrl}/${searchText}?${urlParameters}`
      : `${homeUrl}?${urlParameters}`
    this.props.router.push(url)
  }

  getUrlParameters = (objParams) =>
    Object.entries(objParams)
      .map((e) => e.join('='))
      .join('&')

  handleSubmit = (nextValue) => {
    /* if new value and not null we get all the info */
    if (this.props.params.searchText !== nextValue && nextValue) {
      this.handleUrlChange(null, null, nextValue)
    }
  }

  handlePublishMaterial = (id, publish) => {
    const { publishMaterial, token } = this.props
    publishMaterial(id, publish, token)
  }

  handleRemoveMaterial = (id) => {
    const { removeMaterial, token } = this.props
    removeMaterial(id, token)
  }

  handleSearchByAuthor = (event, isInputChecked) => {
    const { location } = this.props
    const objParams = {
      ...location.query,
      searchByAuthor: isInputChecked,
      offset: 0,
    }
    let urlParameters = this.getUrlParameters(objParams)
    const url = `${homeUrl}?${urlParameters}`
    this.props.router.push(url)
  }

  render() {
    const {
      filters,
      visibleMaterials,
      newVisibleMaterialsList,
      locale,
      loading,
      loadingNew,
      muiTheme,
      width,
      role,
      pendingMaterials,
      unpublishedMaterials,
      authorsName,
      location,
      params,
    } = this.props
    const { tab, offset, showNewMaterials } = this.state
    const { formatMessage } = this.props.intl
    const searchText = params.searchText

    const searchByAuthor = location.query.searchByAuthor == 'true'

    let materialsCounter
    const hideIconText = width === SMALL

    // depending on which slide we are, we show one or another list */
    let materialsList, gallery
    switch (tab) {
      case 0:
        materialsList = showNewMaterials
          ? newVisibleMaterialsList
          : visibleMaterials
        break
      case 1:
        materialsList = pendingMaterials
        break
      case 2:
        materialsList = unpublishedMaterials
    }

    const loadingState = showNewMaterials ? loadingNew : loading

    let hideMessage = true
    const { activity, language, area } = { ...location.query }
    if (activity || area || language || params.searchText) hideMessage = false
    if (loadingState) {
      gallery = (
        <ReadMargin>
          <P>{<FormattedMessage {...messages.loadingMaterials} />}</P>
        </ReadMargin>
      )
    } else {
      materialsCounter = materialsList.length
      gallery = materialsCounter ? (
        <MaterialList
          materials={materialsList}
          locale={locale}
          filtersMap={filters}
          onFilterChange={this.handleUrlChange}
          showLabels={true} // show labels if filter is active
          offset={offset}
          onPageClick={this.handlePageClick}
          showActionButtons={role === 'admin'}
          publishMaterial={this.handlePublishMaterial}
          removeMaterial={this.handleRemoveMaterial}
        />
      ) : (
        <ReadMargin>
          <P>
            {!hideMessage && (
              <FormattedMessage {...messages.materialsNotFound} />
            )}
          </P>
        </ReadMargin>
      )
    }

    const dataSource = searchByAuthor ? authorsName : []

    const renderSearchBox = (
      <div>
        <DivSearchBox id="searchBox">
          <SearchField
            value={searchText}
            dataSource={dataSource}
            onSubmit={this.handleSubmit}
            style={{ flexGrow: 1 }}
          />
        </DivSearchBox>
        <FilterWrapper>
          <FilterList
            filtersMap={filters}
            filtersData={filtersData}
            onChange={this.handleUrlChange}
          />
          <Toggle
            label={<FormattedMessage {...messages.searchByAuthor} />}
            labelPosition="right"
            style={{ maxWidth: 250, marginLeft: '20px', marginBottom: '10px' }}
            onToggle={this.handleSearchByAuthor}
            toggled={searchByAuthor}
          />
        </FilterWrapper>
      </div>
    )

    const title = searchText
      ? formatMessage(messages.pageTitleSearch, { searchText })
      : formatMessage(messages.pageTitle)

    const description = searchText
      ? formatMessage(messages.pageDescriptionSearch, { searchText })
      : formatMessage(messages.pageDescription)

    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          {/* <link rel="canonical" href="http://mysite.com/example" /> */}
        </Helmet>
        <Tabs onChange={this.handleChange} value={tab}>
          <Tab
            label={
              hideIconText ? '' : <FormattedMessage {...messages.search} />
            }
            icon={<SearchIcon />}
            value={0}
            style={{ height: role === 'admin' ? '' : '0px' }}
          >
            <div>
              <View
                left={true}
                right={true}
                style={{ backgroundColor: muiTheme.palette.accent2Color }}
              >
                {renderSearchBox}
              </View>
              <Divider />
              <View left={true} right={true} top={1}>
                {showNewMaterials && (
                  <P important={true}>
                    <FormattedMessage {...messages.newMaterials} />
                  </P>
                )}
                {materialsCounter ? (
                  <ReadMargin>
                    <P>
                      {' '}
                      {showNewMaterials ? (
                        <FormattedMessage
                          {...messages.newMaterialsFound}
                          values={{ materialsCounter }}
                        />
                      ) : (
                        <FormattedMessage
                          {...messages.materialsFound}
                          values={{ materialsCounter }}
                        />
                      )}{' '}
                    </P>
                  </ReadMargin>
                ) : (
                  ''
                )}
                {gallery}
              </View>
            </div>
          </Tab>
          {role === 'admin' && (
            <Tab
              label={
                hideIconText ? '' : <FormattedMessage {...messages.pending} />
              }
              icon={<PendingIcon />}
              value={1}
            >
              <div>
                <View
                  left={true}
                  right={true}
                  style={{ backgroundColor: muiTheme.palette.accent2Color }}
                >
                  {renderSearchBox}
                </View>
                <Divider />
                <View left={true} right={true} top={1}>
                  {materialsCounter ? (
                    <ReadMargin>
                      <P>
                        {' '}
                        <FormattedMessage
                          {...messages.materialsFound}
                          values={{ materialsCounter }}
                        />{' '}
                      </P>{' '}
                    </ReadMargin>
                  ) : (
                    ''
                  )}
                  {gallery}
                </View>
              </div>
            </Tab>
          )}
          {role === 'admin' && (
            <Tab
              label={
                hideIconText ? (
                  ''
                ) : (
                  <FormattedMessage {...messages.notPublished} />
                )
              }
              icon={<NotPublishedIcon />}
              value={2}
            >
              <div>
                <View
                  left={true}
                  right={true}
                  style={{ backgroundColor: muiTheme.palette.accent2Color }}
                >
                  {renderSearchBox}
                </View>
                <Divider />
                <View left={true} right={true} top={1}>
                  {materialsCounter ? (
                    <ReadMargin>
                      <P>
                        {' '}
                        <FormattedMessage
                          {...messages.materialsFound}
                          values={{ materialsCounter }}
                        />{' '}
                      </P>{' '}
                    </ReadMargin>
                  ) : (
                    ''
                  )}
                  {gallery}
                </View>
              </div>
            </Tab>
          )}
        </Tabs>
      </div>
    )
  }
}

MaterialsView.propTypes = {
  requestMaterials: PropTypes.func.isRequired,
  requestNewMaterials: PropTypes.func.isRequired,
  searchText: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  filters: PropTypes.instanceOf(Map),
  muiTheme: PropTypes.object,
  setFilterItems: PropTypes.func.isRequired,
  visibleMaterials: PropTypes.arrayOf(PropTypes.object),
  newMaterialsList: PropTypes.array.isRequired,
  token: PropTypes.string,
  // Injected by React Router
  router: PropTypes.any.isRequired,
  locale: PropTypes.string.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.number),
  width: PropTypes.number.isRequired,
  role: PropTypes.string,
  publishMaterial: PropTypes.func.isRequired,
  removeMaterial: PropTypes.func.isRequired,
  pendingMaterials: PropTypes.arrayOf(PropTypes.object).isRequired,
  unpublishedMaterials: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  filters: makeFiltersSelector()(state),
  // authors: makeAuthorsSelector()(state),
  authorsName: makeAuthorsNameSelector()(state),
  locale: makeSelectLocale()(state),
  loading: makeLoadingSelector()(state),
  loadingNew: makeLoadingNewSelector()(state),
  searchResults: makeSearchResultsSelector()(state, ownProps),
  visibleMaterials: makeVisibleMaterialsSelector()(state, ownProps),
  newVisibleMaterialsList: makeNewVisibleMaterialsSelector()(state),
  pendingMaterials: makePendingSelector()(state),
  unpublishedMaterials: makeNotPublishedSelector()(state),
  // urlParams: makeUrlParams()(state),
  token: makeSelectHasUser()(state),
  role: makeSelectRole()(state),
})

const mapDispatchToProps = (dispatch) => ({
  requestMaterials: (locale, searchText, searchType, token) => {
    dispatch(materials.request(locale, searchText, searchType, token))
  },
  requestNewMaterials: (numItems, token) => {
    dispatch(newMaterials.request(numItems, token))
  },
  requestAuthors: () => {
    dispatch(authors.request())
  },
  requestNotPublishedMaterials: (token) => {
    dispatch(notPublishedMaterials.request(token))
  },
  publishMaterial: (id, publish, token) => {
    dispatch(publishMaterial.request(id, publish, token))
  },
  removeMaterial: (id, token) => {
    dispatch(removeMaterial.request(id, token))
  },
  setFilterItems: (filter, filterItem) => {
    dispatch(setFilterItems(filter, filterItem))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(muiThemeable()(withWidth()(injectIntl(MaterialsView)))))
