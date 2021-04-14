/*
 *
 * MaterialsView
 *
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import Joyride, { STATUS } from 'react-joyride'
import muiThemeable from 'material-ui/styles/muiThemeable'
import View from 'components/View'
import { Helmet } from 'react-helmet'
import SearchField from 'components/SearchField'
import DivSearchBox from 'components/DivSearchBox'
import HelpButton from 'components/HelpButton'
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
  makeUrlParams,
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

const filtersData = { areas, activities, languages }

class MaterialsView extends PureComponent {
  state = {
    tab: 0,
    offset: 0,
    getNewMaterials: false,
    getUnpublished: false,
    searchType: 'content',
    showNotFound: false,
    /* running, step and steps for Joyride */
    running: false,
    step: 0,
    steps: [
      {
        title: <FormattedMessage {...messages.wordSearch} />,
        content: (
          <div>
            <p dir={this.props.direction}>
              <FormattedMessage {...messages.searchHint1} />
            </p>
            <p dir={this.props.direction}>
              <FormattedMessage {...messages.searchHint2} />
            </p>
          </div>
        ),
        target: '#searchBox',
        placement: 'bottom',
        disableBeacon: true,
      },
      {
        title: <FormattedMessage {...messages.filterResults} />,
        content: (
          <p dir={this.props.direction}>
            <FormattedMessage {...messages.filtersBtn} />
          </p>
        ),
        target: '#filtersBtn',
        placement: 'bottom',
        disableBeacon: true,
      },
      {
        title: <FormattedMessage {...messages.filters} />,
        content: (
          <p dir={this.props.direction}>
            <FormattedMessage {...messages.filtersHint} />
          </p>
        ),
        target: '#filtersArea',
        placement: 'bottom',
        disableBeacon: true,
      },
      {
        title: <FormattedMessage {...messages.disableFilters} />,
        content: (
          <p dir={this.props.direction}>
            <FormattedMessage {...messages.disableFiltersHint} />
          </p>
        ),
        target: '.btnDeleteFilter:first-of-type',
        placement: 'bottom',
        disableBeacon: true,
      },
      {
        title: <FormattedMessage {...messages.advancedSearch} />,
        content: (
          <p dir={this.props.direction}>
            <FormattedMessage {...messages.advSearchBtn} />
          </p>
        ),
        target: '#advSearchBtn',
        placement: 'bottom',
        disableBeacon: true,
      },
      {
        title: <FormattedMessage {...messages.advancedSearch} />,
        content: (
          <p dir={this.props.direction}>
            <FormattedMessage {...messages.advSearchHint} />
          </p>
        ),
        target: '#advSearchField',
        placement: 'bottom',
        disableBeacon: true,
      },
    ],
  }

  processQuery = (props) => {
    const { location } = props || this.props
    const { search, query } = location
    let parameters = { offset: 0, tab: 0 }
    if (search) {
      parameters = { ...parameters, ...query }
      const validKeys = ['offset', 'tab', 'searchType']
      Object.keys(parameters).forEach(
        (key) => validKeys.includes(key) || delete parameters[key]
      )
      parameters.offset = parseInt(parameters.offset, 10) || 0
      parameters.tab = parseInt(parameters.tab, 10) || 0
      parameters.searchType = parameters.searchType || 'content'
    }
    const needUpdate = Object.keys(parameters).some(
      (key) => parameters[key] !== this.state[key]
    )
    if (needUpdate) this.setState(parameters)
  }

  getCodeText = (searchType, searchText) => {
    const { formatMessage } = this.props.intl
    if (!searchText) return ''
    if (searchType === 'activity')
      return this.customActivities
        .filter((item) => item.text === searchText)
        .map((item) => item.value)[0]
    else if (searchType === 'area')
      return this.customAreas
        .filter((item) => item.text === searchText)
        .map((item) => item.value)[0]
    return searchText
  }

  getSearchText = (searchType, searchText) => {
    const { formatMessage } = this.props.intl
    if (!searchText) return ''
    if (searchType === 'activity')
      return this.customActivities
        .filter((item) => item.value === parseInt(searchText))
        .map((item) => item.text)[0]
    else if (searchType === 'area')
      return this.customAreas
        .filter((item) => item.value === parseInt(searchText))
        .map((item) => item.text)[0]
    return searchText
  }

  async componentDidMount() {
    const {
      requestMaterials,
      requestNewMaterials,
      requestNotPublishedMaterials,
      locale,
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
    if (this.props.params.searchText && !this.props.searchResults) {
      requestMaterials(
        locale,
        this.props.params.searchText,
        this.state.searchType,
        token
      )
    }
    /* we just ask for new Materials twice an hour */
    const newMaterialsDate = sessionStorage.getItem('newMaterialsDate')
    const actualDate = new Date()
    const diffSeconds = newMaterialsDate
      ? (actualDate.getTime() - newMaterialsDate) / 1000
      : 0
    const numItems = role === 'admin' ? 10000 : 100
    if (newVisibleMaterialsList.size === 0 || diffSeconds > 1800)
      requestNewMaterials(numItems, token)
    if (role === 'admin') requestNotPublishedMaterials(token)
    if (!authorsName.length) requestAuthors()
  }

  componentWillReceiveProps(nextProps) {
    const { token, filters } = nextProps
    this.setState({ showNotFound: false })
    if (this.props.location.search !== nextProps.location.search) {
      this.processQuery(nextProps)
    }
    if (
      nextProps.params.searchText &&
      this.props.params.searchText !== nextProps.params.searchText &&
      !nextProps.searchResults
    ) {
      this.props.requestMaterials(
        nextProps.locale,
        nextProps.params.searchText,
        this.state.searchType,
        token
      )
    }

    console.log(
      this.props.filters,
      nextProps.filters,
      this.props.params.searchType,
      this.props.params.searchText,
      '********************+**********************'
    )
  }

  handleChange = (tab) => {
    const { pathname } = this.props.location
    const url = `${pathname}?tab=${tab}&searchType=${this.state.searchType}`
    this.props.router.push(url)
  }

  handleSearchTypeChange = (event, index, value) => {
    const url = `/materials/search?tab=${this.state.tab}&searchType=${value}`
    this.props.router.push(url)
  }

  handlePageClick = (offset) => {
    // fix bug if offset is not number, click comes from picto link, should not be processed here
    if (typeof offset === 'number') {
      const { tab, searchType } = this.state
      const { pathname } = this.props.location
      const url = `${pathname}?offset=${offset}&tab=${tab}&searchType=${searchType}`
      this.props.router.push(url)
    }
  }

  handleSubmit = (nextValue) => {
    this.setState({
      tab: 0,
    })
    /* depending on searchType or searchText we render  a route or another */
    const newValue = this.getCodeText(this.state.searchType, nextValue)
    if (this.props.params.searchText !== newValue && newValue) {
      this.props.router.push(
        `/materials/search/${encodeURIComponent(newValue)}?searchType=${
          this.state.searchType
        }`
      )
    }
    /* hack if getCodeText returns  undefined, to render no found  materials */
    if (!newValue) this.setState({ showNotFound: true })
  }

  handlePublishMaterial = (id, publish) => {
    const { publishMaterial, token } = this.props
    publishMaterial(id, publish, token)
  }

  handleRemoveMaterial = (id) => {
    const { removeMaterial, token } = this.props
    removeMaterial(id, token)
  }

  // handleDelete = accept => {
  //   const { idPictogram, requestPictogramDelete, token } = this.props
  //   this.setState({ confirmationBoxOpen: false })
  //   if (accept) requestPictogramDelete(idPictogram, token)
  // }

  // handleBeforeDelete = () => this.setState({ confirmationBoxOpen: true })

  handleJoyrideCallback = (data) => {
    const { status } = data
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED]

    if (finishedStatuses.includes(status)) {
      this.setState({ running: false })
    }
  }

  startHelp = () => this.setState({ running: true })

  searchByAuthor = (event, isInputChecked) => {
    const searchType = isInputChecked ? 'author' : 'content'
    this.setState({ searchType })
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
    } = this.props
    const { tab, offset, searchType, running, steps, showNotFound } = this.state
    const { formatMessage } = this.props.intl
    const searchText =
      this.getSearchText(searchType, this.props.params.searchText) || ''

    let materialsCounter
    const hideIconText = width === SMALL

    const localeTour = {
      next: <FormattedMessage {...messages.next} />,
      back: <FormattedMessage {...messages.back} />,
      skip: <FormattedMessage {...messages.skip} />,
      last: <FormattedMessage {...messages.last} />,
    }

    // depending on which slide we are, we show one or another list */
    let materialsList
    console.log(`searchText: ${searchText}`, newVisibleMaterialsList)
    if (tab === 0)
      materialsList = searchText ? visibleMaterials : newVisibleMaterialsList
    // TODO: also for tab  0: materialsList = newVisibleMaterialsList
    else if (tab === 1) materialsList = pendingMaterials
    else if (tab === 2) materialsList = unpublishedMaterials
    let gallery = ''
    // TODO: change message:
    // const loadingState = tab === 1 ? loadingNew : loading
    const loadingState = loadingNew
    if (showNotFound) {
      gallery = (
        <ReadMargin>
          <P>{<FormattedMessage {...messages.materialsNotFound} />}</P>
        </ReadMargin>
      )
    } else if (loadingState) {
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
          setFilterItems={this.props.setFilterItems}
          showLabels={true} // show labels if filter is active
          offset={offset}
          onPageClick={this.handlePageClick}
          showActionButtons={role === 'admin'}
          publishMaterial={this.handlePublishMaterial}
          removeMaterial={this.handleRemoveMaterial}
        />
      ) : (
        <ReadMargin>
          <P>{<FormattedMessage {...messages.materialsNotFound} />}</P>
        </ReadMargin>
      )
    }

    const dataSource = searchType === 'author' ? authorsName : []

    const renderSearchBox = (
      <div>
        <DivSearchBox id="searchBox">
          <SearchField
            value={searchText}
            dataSource={dataSource}
            onSubmit={this.handleSubmit}
            style={{ flexGrow: 1 }}
          />
          <HelpButton helpActive={running} onHelpClick={this.startHelp} />
        </DivSearchBox>
        <div style={{ display: 'flex', wrap: 'wrap', alignItems: 'baseline' }}>
          <FilterList
            filtersMap={filters}
            setFilterItems={this.props.setFilterItems}
            filtersData={filtersData}
            onChange={this.handleSubmit}
          />
          <Toggle
            label="Buscar por autor"
            labelPosition="right"
            style={{ maxWidth: 250, marginLeft: '20px', marginBottom: '10px' }}
            onToggle={this.searchByAuthor}
          />
        </div>
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
        {/* TODO: remove joyride? */}
        <Joyride
          callback={this.handleJoyrideCallback}
          continuous={true}
          floaterProps={{ disableAnimation: true }}
          // // getHelpers={this.getHelpers}
          run={running}
          showSkipButton={true}
          steps={steps}
          // styles={{
          //   options: {
          //     zIndex: 10000,
          //   },
          // }}
          locale={localeTour}
        />
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
                {materialsCounter ? (
                  <ReadMargin>
                    <P>
                      {' '}
                      <FormattedMessage
                        {...messages.materialsFound}
                        values={{ materialsCounter }}
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
          {role === 'admin' && (
            <Tab
              label={
                hideIconText ? '' : <FormattedMessage {...messages.pending} />
              }
              icon={<PendingIcon />}
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
                          {...messages.newMaterialsFound}
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
              value={3}
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
                          {...messages.newMaterialsFound}
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
  urlParams: makeUrlParams()(state),
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
