/*
 *
 * PictogramsView
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
import PictogramList from 'components/PictogramList'
import P from 'components/P'
import { withRouter, Link } from 'react-router'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'
import ActionButtons from 'containers/MaterialsView/ActionButtons'
import {
  makeFiltersSelector,
  makeShowFiltersSelector,
  makeLoadingSelector,
  makeSearchResultsSelector,
  makeVisiblePictogramsSelector,
  makeNewPictogramsSelector,
  makeKeywordsSelectorByLocale
} from './selectors'
import {
  autocomplete,
  pictograms,
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
    slideIndex: 0
  }

  componentDidMount() {
    const {
      requestPictograms,
      requestNewPictograms,
      requestAutocomplete,
      locale
    } = this.props
    if (this.props.params.searchText && !this.props.searchResults) {
      requestPictograms(locale, this.props.params.searchText)
    }
    requestNewPictograms(locale)
    requestAutocomplete(locale)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.params.searchText !== nextProps.params.searchText) {
      const { requestPictograms, locale } = this.props
      requestPictograms(locale, nextProps.params.searchText)
    }
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value
    })
  }

  handleSubmit = (nextValue) => {
    this.setState({
      slideIndex: 0
    })
    if (this.props.params.searchText !== nextValue) {
      this.props.router.push(`/pictograms/search/${nextValue}`)
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
    const {
      showFilter,
      filters,
      visiblePictograms,
      newPictogramsList,
      locale,
      loading,
      filtersData,
      muiTheme,
      keywords
    } = this.props

    const { isAuthenticated } = this.context
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
              left={true}
              right={true}
              style={{ backgroundColor: muiTheme.palette.accent2Color }}
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
          <View left={true} right={true}>
            {isAuthenticated ? (
              <p>Autenticado!</p>
            ) : (
              <Link to='/signin'>
                <FormattedMessage
                  {...messages.contentNotAvailableWithoutAuth}
                />
                <p>No autenticado!</p>
              </Link>
            )}
          </View>
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
  filtersData: PropTypes.instanceOf(Map)
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
  keywords: makeKeywordsSelectorByLocale()(state)
})
// const pictoList = state.getIn(['pictogramView', 'search', ownProps.params.searchText]) || []

const mapDispatchToProps = (dispatch) => ({
  requestPictograms: (locale, searchText) => {
    dispatch(pictograms.request(locale, searchText))
  },
  requestNewPictograms: (locale) => {
    dispatch(newPictograms.request(locale))
  },
  toggleShowFilter: () => {
    dispatch(toggleShowFilter())
  },
  setFilterItems: (filter, filterItem) => {
    dispatch(setFilterItems(filter, filterItem))
  },
  requestAutocomplete: (locale) => {
    dispatch(autocomplete.request(locale))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(muiThemeable()(PictogramsView)))
