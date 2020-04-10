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
import PendingIcon from 'material-ui/svg-icons/action/visibility-Off'
import NotPublishedIcon from 'material-ui/svg-icons/action/thumb-down'
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
import { makeSelectHasUser, makeSelectRole } from 'containers/App/selectors'
import ActionButtons from './ActionButtons'
import {
  makeFiltersSelector,
  makeShowFiltersSelector,
  makeLoadingSelector,
  makeSearchResultsSelector,
  makeVisibleMaterialsSelector,
  makeNewVisibleMaterialsSelector,
  makePendingSelector,
  makeNotPublishedSelector
} from './selectors'

import { materials, newMaterials, notPublishedMaterials, toggleShowFilter, setFilterItems, publishMaterial, removeMaterial } from './actions'
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
    tab: 0,
    offset: 0,
    getNewMaterials: false,
    getUnpublished: false
  }

  processQuery = props => {
    const { location } = props || this.props
    const { search, query } = location
    let parameters = { offset: 0, tab: 0 }
    if (search) {
      parameters = { ...parameters, ...query }
      const validKeys = ['offset', 'tab']
      Object.keys(parameters).forEach(key => validKeys.includes(key) || delete parameters[key])
      parameters.offset = parseInt(parameters.offset, 10) || 0
      parameters.tab = parseInt(parameters.tab, 10) || 0
    }
    const needUpdate = Object.keys(parameters).some(key => parameters[key] !== this.state[key])
    if (needUpdate) this.setState(parameters)
  }

  componentDidMount() {
    const { requestMaterials, requestNewMaterials, requestNotPublishedMaterials, locale, token, role } = this.props
    this.processQuery()
    if (this.props.params.searchText && !this.props.searchResults) {
      requestMaterials(locale, this.props.params.searchText, token)
    }
    requestNewMaterials(token)
    // if (role === 'admin') requestNotPublishedMaterials(token)
  }

  componentWillReceiveProps(nextProps) {
    const { token } = nextProps
    if (this.props.params.searchText !== nextProps.params.searchText) {
      this.props.requestMaterials(this.props.locale, nextProps.params.searchText, token)
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

  render() {
    const { showFilter, filters, visibleMaterials, newVisibleMaterialsList, locale, loading, muiTheme, width, role, pendingMaterials, unpublishedMaterials } = this.props
    const searchText = this.props.params.searchText || ''
    const { tab, offset } = this.state
    let materialsCounter
    const hideIconText = width === SMALL
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
          {role === 'admin' && (
            <Tab
              label={hideIconText ? '' : <FormattedMessage {...messages.pending} />}
              icon={<PendingIcon />}
              value={2}
            >
              <div>
                <View left={true} right={true} style={{ backgroundColor: muiTheme.palette.accent2Color }}>
                  <div style={styles.container}>
                    <SearchField value={searchText} onSubmit={this.handleSubmit} style={styles.searchBar} />
                    <ActionButtons
                      onFilterClick={this.props.toggleShowFilter} filterActive={showFilter}
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
          )}
          {role === 'admin' && (
            <Tab
              label={hideIconText ? '' : <FormattedMessage {...messages.notPublished} />}
              icon={<NotPublishedIcon />}
              value={3}
            >
              <div>
                <View left={true} right={true} style={{ backgroundColor: muiTheme.palette.accent2Color }}>
                  <div style={styles.container}>
                    <SearchField value={searchText} onSubmit={this.handleSubmit} style={styles.searchBar} />
                    <ActionButtons
                      onFilterClick={this.props.toggleShowFilter} filterActive={showFilter}
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
  showFilter: makeShowFiltersSelector()(state),
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
  requestMaterials: (locale, searchText, token) => {
    dispatch(materials.request(locale, searchText, token))
  },
  requestNewMaterials: (token) => {
    dispatch(newMaterials.request(token))
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
  setFilterItems: (filter, filterItem) => {
    dispatch(setFilterItems(filter, filterItem))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(muiThemeable()(withWidth()(MaterialsView))))
