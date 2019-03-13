/*
 *
 * CatalogsView
 *
 */
// TODO:  helmet for all components

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { FormattedMessage } from 'react-intl'
import View from 'components/View'
import Catalog from 'components/Catalog'
import Helmet from 'react-helmet'
import P from 'components/P'
import api from 'services'
import LanguageSelector from 'components/LanguageSelector'
import { makeSelectLocale } from '../LanguageProvider/selectors'
import messages from './messages'

class CatalogsView extends PureComponent {
  state = {
    fetching: true,
    catalogs: [],
    language: this.props.locale
  }

  async componentDidMount() {
    const catalogs = await api.CATALOGS_REQUEST()
    this.setState({ catalogs })
  }

  getCatalog = (language) => {
    const { catalogs } = this.state
    return catalogs.filter((catalog) => catalog.language === language)[0]
  }

  handleChange = (language) => {
    this.setState({ language })
  }

  render() {
    const { fetching, language } = this.state
    const catalog = this.getCatalog(language)

    return (
      <View left={true} right={true} top={0}>
        <Helmet
          title='CatalogsView'
          meta={[
            { name: 'description', content: 'Description of PictogramView' }
          ]}
        />
        {fetching ? '' : ''}
        <P>
          <FormattedMessage {...messages.chooseLanguage} />
        </P>
        <LanguageSelector
          value={language}
          shortOption={true}
          showToolTip={false}
          onChange={this.handleChange}
        />
        {catalog && <Catalog catalog={catalog} locale={this.props.locale} />}
      </View>
    )
  }
}

CatalogsView.propTypes = {
  locale: PropTypes.string.isRequired
}

const mapStateToProps = createSelector(
  makeSelectLocale(),
  (locale) => ({ locale })
)

export default connect(
  mapStateToProps,
  {}
)(CatalogsView)
