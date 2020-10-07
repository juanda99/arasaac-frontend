/*
 *
 * MaterialsView
 *
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import Joyride, { STATUS } from 'react-joyride'
import muiThemeable from 'material-ui/styles/muiThemeable'
import View from 'components/View'
import Helmet from 'react-helmet'
import SearchField from 'components/SearchField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import DivSearchBox from './DivSearchBox'
import SearchIcon from 'material-ui/svg-icons/action/search'
import PendingIcon from 'material-ui/svg-icons/action/visibility-Off'
import NotPublishedIcon from 'material-ui/svg-icons/action/thumb-down'
import withWidth, { SMALL } from 'material-ui/utils/withWidth'
import NewReleasesIcon from 'material-ui/svg-icons/av/new-releases'
import Divider from 'material-ui/Divider'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Map } from 'immutable'
import FilterList from 'components/Filters'
import MaterialList from 'components/MaterialList'
import P from 'components/P'
import ReadMargin from 'components/ReadMargin'
import { withRouter } from 'react-router'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'
import { makeSelectHasUser, makeSelectRole } from 'containers/App/selectors'
import ActionButtons from './ActionButtons'
import {
  makeFiltersSelector,
  makeShowFiltersSelector,
  makeShowSettingsSelector,
  makeLoadingSelector,
  makeSearchResultsSelector,
  makeVisibleMaterialsSelector,
  makeNewVisibleMaterialsSelector,
  makePendingSelector,
  makeNotPublishedSelector,
  makeAuthorsNameSelector
} from './selectors'

import { materials, newMaterials, authors, notPublishedMaterials, toggleShowSettings, toggleShowFilter, setFilterItems, publishMaterial, removeMaterial, showFilters, showSettings } from './actions'
import languages from 'data/languages'
import activities from 'data/activities'
import areas from 'data/areas'
import messages from './messages'
import messagesFilters from 'components/Filters/messages'

const filtersData = { areas, activities, languages }


class MaterialsView extends PureComponent {


  state = {
    tab: 0,
    offset: 0,
    getNewMaterials: false,
    getUnpublished: false,
    searchType: 'content',
    /* running, step and steps for Joyride */
    running: false,
    step: 0,
    steps: [
      {
        title: <FormattedMessage {...messages.wordSearch} />,
        content: (
          <div>
            <p dir={this.props.direction}><FormattedMessage {...messages.searchHint1} /></p>
            <p dir={this.props.direction}><FormattedMessage {...messages.searchHint2} /></p>
          </div>


        ),
        target: "#searchBox",
        placement: "bottom",
        disableBeacon: true
      },
      {
        title: <FormattedMessage {...messages.filterResults} />,
        content: <p dir={this.props.direction}><FormattedMessage {...messages.filtersBtn} /></p>,
        target: "#filtersBtn",
        placement: "bottom",
        disableBeacon: true
      },
      {
        title: <FormattedMessage {...messages.filters} />,
        content: <p dir={this.props.direction}><FormattedMessage {...messages.filtersHint} /></p>,
        target: "#filtersArea",
        placement: "bottom",
        disableBeacon: true,
      },
      {
        title: <FormattedMessage {...messages.disableFilters} />,
        content: <p dir={this.props.direction}><FormattedMessage {...messages.disableFiltersHint} /></p>,
        target: ".btnDeleteFilter:first-of-type",
        placement: "bottom",
        disableBeacon: true,
      },
      {
        title: <FormattedMessage {...messages.advancedSearch} />,
        content: <p dir={this.props.direction}><FormattedMessage {...messages.advSearchBtn} /></p>,
        target: "#advSearchBtn",
        placement: "bottom",
        disableBeacon: true
      },
      {
        title: <FormattedMessage {...messages.advancedSearch} />,
        content: <p dir={this.props.direction}><FormattedMessage {...messages.advSearchHint} /></p>,
        target: "#advSearchField",
        placement: "bottom",
        disableBeacon: true
      },
    ]
  }

  customActivities = activities.map(selectItem => {
    const { formatMessage } = this.props.intl
    const value = parseInt(selectItem.code, 10)
    let text = formatMessage(messagesFilters[selectItem.text])
    switch (value) {
      case 1:
      case 15:
      case 21:
      case 27:
      case 31:
        text = `${formatMessage(messagesFilters['software'])} / ${text}`
        break;
      case 4:
      case 5:
      case 8:
      case 17:
      case 20:
      case 28:
        text = `${formatMessage(messagesFilters['communication'])} / ${text}`
        break;
      case 6:
      case 11:
      case 12:
      case 13:
      case 16:
        text = `${formatMessage(messagesFilters['game'])} / ${text}`
        break;
      default:
        break;
    }
    return { value, text }
  })

  customAreas = areas.map(selectItem => {
    const { formatMessage } = this.props.intl
    const value = parseInt(selectItem.code, 10)
    let text = formatMessage(messagesFilters[selectItem.text])
    switch (value) {
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 31:
        text = `${formatMessage(messagesFilters['language'])} / ${text}`
        break;
      case 13:
      case 14:
      case 15:
      case 16:
      case 29:
      case 30:
        text = `${formatMessage(messagesFilters['math'])} / ${text}`
        break;
      case 1:
      case 2:
      case 27:
        text = `${formatMessage(messagesFilters['priorSkills'])} / ${text}`
        break;
      default:
        break;
    }
    return { value, text }
  })


  areasKeywords = this.customAreas.map(area => area.text).sort()
  activitiesKeywords = this.customActivities.map(activity => activity.text).sort()

  processQuery = props => {
    const { location } = props || this.props
    const { search, query } = location
    let parameters = { offset: 0, tab: 0 }
    if (search) {
      parameters = { ...parameters, ...query }
      const validKeys = ['offset', 'tab', 'searchType']
      Object.keys(parameters).forEach(key => validKeys.includes(key) || delete parameters[key])
      parameters.offset = parseInt(parameters.offset, 10) || 0
      parameters.tab = parseInt(parameters.tab, 10) || 0
      parameters.searchType = parameters.searchType || 'content'
    }
    const needUpdate = Object.keys(parameters).some(key => parameters[key] !== this.state[key])
    if (needUpdate) this.setState(parameters)
  }

  getCodeText = (searchType, searchText) => {
    const { formatMessage } = this.props.intl
    if (!searchText) return ''
    if (searchType === 'activity') return this.customActivities.filter(item => item.text === searchText).map(item => item.value)[0]
    else if (searchType === 'area') return this.customAreas.filter(item => item.text === searchText).map(item => item.value)[0]
    return searchText
  }

  getSearchText = (searchType, searchText) => {
    const { formatMessage } = this.props.intl
    if (!searchText) return ''
    if (searchType === 'activity') return this.customActivities.filter(item => item.value === parseInt(searchText)).map(item => item.text)[0]
    else if (searchType === 'area') return this.customAreas.filter(item => item.value === parseInt(searchText)).map(item => item.text)[0]
    return searchText
  }

  async componentDidMount() {
    const { requestMaterials, requestNewMaterials, requestNotPublishedMaterials, locale, token, role, authorsName, requestAuthors, newVisibleMaterialsList } = this.props
    await this.processQuery()
    if (this.props.params.searchText && !this.props.searchResults) {
      requestMaterials(locale, this.props.params.searchText, this.state.searchType, token)
    }
    /* we just ask for new Materials once an hour */
    const newMaterialsDate = sessionStorage.getItem('newMaterialsDate')
    const actualDate = new Date()
    const diffSeconds = newMaterialsDate ? (actualDate.getTime() - newMaterialsDate) / 1000 : 0
    const numItems = role === 'admin' ? 10000 : 100
    if (newVisibleMaterialsList.size === 0 || diffSeconds > 1800) requestNewMaterials(numItems, token)
    if (role === 'admin') requestNotPublishedMaterials(token)
    if (!authorsName.length) requestAuthors()
  }

  componentWillReceiveProps(nextProps) {
    const { token } = nextProps
    if (this.props.location.search !== nextProps.location.search) {
      this.processQuery(nextProps)
    }
    if (nextProps.params.searchText && this.props.params.searchText !== nextProps.params.searchText && !nextProps.searchResults) {
      this.props.requestMaterials(nextProps.locale, nextProps.params.searchText, this.state.searchType, token)
    }

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

  handlePageClick = offset => {
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
      tab: 0
    })
    const newValue = this.getCodeText(this.state.searchType, nextValue)
    if (this.props.params.searchText !== newValue) {
      this.props.router.push(`/materials/search/${encodeURIComponent(newValue)}?searchType=${this.state.searchType}`)
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

  // handleDelete = accept => {
  //   const { idPictogram, requestPictogramDelete, token } = this.props
  //   this.setState({ confirmationBoxOpen: false })
  //   if (accept) requestPictogramDelete(idPictogram, token)
  // }

  // handleBeforeDelete = () => this.setState({ confirmationBoxOpen: true })

  handleJoyrideCallback = (data) => {
    const { status, type } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED]

    if (finishedStatuses.includes(status)) {
      this.setState({ running: false })
    }
    if (data.index === 1) {
      this.props.fshowFilters()
    }
    if (data.index === 4) {
      this.props.fshowSettings()
    }
  }

  startHelp = () => this.setState({ running: true })




  render() {
    const { showFilter, showSettings, filters, visibleMaterials, newVisibleMaterialsList, locale, loading, muiTheme, width, role, pendingMaterials, unpublishedMaterials, authorsName } = this.props
    const { tab, offset, searchType, running, steps } = this.state
    const searchText = this.getSearchText(searchType, this.props.params.searchText) || ''
    let materialsCounter
    const hideIconText = width === SMALL

    const localeTour = {
      next: <FormattedMessage {...messages.next} />,
      back: <FormattedMessage {...messages.back} />,
      skip: <FormattedMessage {...messages.skip} />,
      last: <FormattedMessage {...messages.last} />
    }

    // depending on which slide we are, we show one or another list */
    let materialsList
    if (tab === 0) materialsList = visibleMaterials
    else if (tab === 1) materialsList = newVisibleMaterialsList
    else if (tab === 2) materialsList = pendingMaterials
    else if (tab === 3) materialsList = unpublishedMaterials
    let gallery = ''
    if (loading) {
      gallery = <ReadMargin><P>{<FormattedMessage {...messages.loadingMaterials} />}</P></ReadMargin>
    } else if (!searchText && tab === 0) {
      gallery = null
    } else {
      materialsCounter = materialsList.length
      gallery = materialsCounter ? (
        <MaterialList
          materials={materialsList}
          locale={locale}
          filtersMap={filters}
          setFilterItems={this.props.setFilterItems}
          showLabels={showFilter} // show labels if filter is active
          offset={offset}
          onPageClick={this.handlePageClick}
          showActionButtons={role === 'admin'}
          publishMaterial={this.handlePublishMaterial}
          removeMaterial={this.handleRemoveMaterial}
        />
      )
        : <ReadMargin><P>{<FormattedMessage {...messages.materialsNotFound} />}</P></ReadMargin>
    }
    let dataSource
    if (searchType === 'content') dataSource = []
    else if (searchType === 'author') dataSource = authorsName
    else if (searchType === 'area') dataSource = this.areasKeywords
    else dataSource = this.activitiesKeywords

    const renderSearchBox = (
      <div>
        <DivSearchBox id='searchBox'>
          <SearchField value={searchText} dataSource={dataSource} onSubmit={this.handleSubmit} style={{ flexGrow: 1 }} />
          <ActionButtons
            onFilterClick={this.props.toggleShowFilter}
            onSettingsClick={this.props.toggleShowSettings}
            filterActive={showFilter}
            settingsActive={showSettings}
            helpActive={running}
            onHelpClick={this.startHelp}
          />
        </DivSearchBox>
        {showFilter ?
          <FilterList filtersMap={filters} setFilterItems={this.props.setFilterItems} filtersData={filtersData} />
          : null
        }
        {showSettings ?
          <SelectField
            id='advSearchField'
            floatingLabelText={<FormattedMessage {...messages.advancedSearch} />}
            value={searchType}
            onChange={this.handleSearchTypeChange}
          >
            <MenuItem value='content' primaryText={<FormattedMessage {...messages.content} />} />
            <MenuItem value='author' primaryText={<FormattedMessage {...messages.author} />} />
            <MenuItem value='activity' primaryText={<FormattedMessage {...messages.activity} />} />
            <MenuItem value='area' primaryText={<FormattedMessage {...messages.area} />} />
          </SelectField>
          : null
        }

      </div>
    )



    return (
      <div>
        <Helmet title='PictogramsView' meta={[{ name: 'description', content: 'Description of PictogramsView' }]} />
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
            label={hideIconText ? '' : <FormattedMessage {...messages.search} />}
            icon={<SearchIcon />}
            value={0}
          >
            <div>
              <View left={true} right={true} style={{ backgroundColor: muiTheme.palette.accent2Color }}>
                {renderSearchBox}
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
                {renderSearchBox}
              </View>
              <Divider />
              <View left={true} right={true} top={1} >
                {materialsCounter ? <ReadMargin><P> <FormattedMessage {...messages.newMaterialsFound} values={{ materialsCounter }} /> </P> </ReadMargin> : ''}
                {gallery}
              </View>
            </div>
          </Tab>
          {role === 'admin' && (
            <Tab
              label={hideIconText ? '' : <FormattedMessage {...messages.pending} />}
              icon={<PendingIcon />}
              value={2}
            >
              <div>
                <View left={true} right={true} style={{ backgroundColor: muiTheme.palette.accent2Color }}>
                  {renderSearchBox}
                </View>
                <Divider />
                <View left={true} right={true} top={1} >
                  {materialsCounter ? <ReadMargin><P> <FormattedMessage {...messages.newMaterialsFound} values={{ materialsCounter }} /> </P> </ReadMargin> : ''}
                  {gallery}
                </View>
              </div>
            </Tab>
          )}
          {role === 'admin' && (
            <Tab
              label={hideIconText ? '' : <FormattedMessage {...messages.notPublished} />}
              icon={<NotPublishedIcon />}
              value={3}
            >
              <div>
                <View left={true} right={true} style={{ backgroundColor: muiTheme.palette.accent2Color }}>
                  {renderSearchBox}
                </View>
                <Divider />
                <View left={true} right={true} top={1} >
                  {materialsCounter ? <ReadMargin><P> <FormattedMessage {...messages.newMaterialsFound} values={{ materialsCounter }} /> </P> </ReadMargin> : ''}
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
  showFilter: makeShowFiltersSelector()(state),
  showSettings: makeShowSettingsSelector()(state),
  locale: makeSelectLocale()(state),
  loading: makeLoadingSelector()(state),
  searchResults: makeSearchResultsSelector()(state, ownProps),
  visibleMaterials: makeVisibleMaterialsSelector()(state, ownProps),
  newVisibleMaterialsList: makeNewVisibleMaterialsSelector()(state),
  pendingMaterials: makePendingSelector()(state),
  unpublishedMaterials: makeNotPublishedSelector()(state),
  token: makeSelectHasUser()(state),
  role: makeSelectRole()(state)
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
  toggleShowFilter: () => {
    dispatch(toggleShowFilter())
  },
  toggleShowSettings: () => {
    dispatch(toggleShowSettings())
  },
  fshowFilters: () => {
    dispatch(showFilters())
  },
  fshowSettings: () => {
    dispatch(showSettings())
  },
  setFilterItems: (filter, filterItem) => {
    dispatch(setFilterItems(filter, filterItem))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(muiThemeable()(withWidth()(injectIntl(MaterialsView)))))
