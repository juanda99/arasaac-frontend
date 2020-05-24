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
import muiThemeable from 'material-ui/styles/muiThemeable'
import Divider from 'material-ui/Divider'
import { Map } from 'immutable'
import PictogramList from 'components/PictogramList'
import P from 'components/P'
import { withRouter } from 'react-router'
import withWidth, { SMALL } from 'material-ui/utils/withWidth'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'
import ReadMargin from 'components/ReadMargin'
import {
  makeSelectHasUser,
} from 'containers/App/selectors'
import {
  makeLoadingSelector,
  makeSearchResultsSelector,
  makeVisiblePictogramsSelector,
  makeKeywordsSelectorByLocale,
} from 'containers/PictogramsView/selectors'
import {
  autocomplete,
  pictograms,
} from 'containers/PictogramsView/actions'
import messages from 'containers/PictogramsView/messages'

const styles = {
  searchBar: {
    flexGrow: 1
  },
  actionButtons: {
    width: '150px'
  },
}
class TranslatorView extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  state = {
    searchText: ''
  }

  componentDidMount() {
    const {
      locale,
      requestAutocomplete
    } = this.props
    requestAutocomplete(locale)
  }

  handleSubmit = (searchText) => {
    this.setState({ searchText })
  }


  render() {
    const { muiTheme, keywords } = this.props
    const { searchText } = this.state
    console.log(keywords, '*********')
    return (
      <div>
        <Helmet
          title='TranslatorsView'
          meta={[
            { name: 'description', content: 'Description of PictogramsView' }
          ]}
        />
        <View left={true} right={true} style={{ backgroundColor: muiTheme.palette.accent2Color }}>
          <SearchField
            value={searchText}
            onSubmit={this.handleSubmit}
            style={styles.searchBar}
            dataSource={keywords}
          />
        </View>
        <Divider />
      </div>
    )
  }
}

TranslatorView.propTypes = {
  requestAutocomplete: PropTypes.func.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string),
  requestPictograms: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  filters: PropTypes.instanceOf(Map),
  muiTheme: PropTypes.object,
  visiblePictograms: PropTypes.arrayOf(PropTypes.object),
  // Injected by React Router
  router: PropTypes.any.isRequired,
  locale: PropTypes.string.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.number),
  token: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired
}

TranslatorView.contextTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => ({
  locale: makeSelectLocale()(state),
  loading: makeLoadingSelector()(state),
  searchResults: makeSearchResultsSelector()(state, ownProps),
  visiblePictograms: makeVisiblePictogramsSelector()(state, ownProps),
  keywords: makeKeywordsSelectorByLocale()(state),
  token: makeSelectHasUser()(state),
})

const mapDispatchToProps = (dispatch) => ({
  requestPictograms: (locale, searchText) => {
    dispatch(pictograms.request(locale, searchText))
  },
  requestAutocomplete: (locale) => {
    dispatch(autocomplete.request(locale))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(muiThemeable()(withWidth()(TranslatorView))))
