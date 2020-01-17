import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import View from 'components/View'
import LanguageSelector from 'components/LanguageSelector'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'
import {
  makeSelectName,
  makeSelectRole,
} from 'containers/App/selectors'
import TranslationStatus from 'containers/TranslationStatus'
import { IMAGES_URL } from 'services/config'
import messages from './messages'
import H2 from 'components/H2'
import P from 'components/P'

class CollaboratorsView extends Component {
  state = {
    locale: this.props.locale
  }

  handleLanguageChange = (locale) => this.setState({ locale })


  render() {
    const { locale } = this.state
    return (
      <View left={true} right={true}>
        <P>
          <FormattedMessage {...messages.buildArasaac} />
        </P>
        <P>
          <FormattedMessage {...messages.wantToCollaborate} />
        </P>
        <P>
          <FormattedMessage {...messages.howToCollaborate} />
        </P>


        <H2 primary={true}>Translation Status</H2>
        <LanguageSelector value={locale} onChange={this.handleLanguageChange} />
        <TranslationStatus language={locale} />

      </View >
    )
  }
}

const mapStateToProps = (state) => ({
  locale: makeSelectLocale()(state),
  role: makeSelectRole()(state),
  name: makeSelectName()(state)
})

export default connect(
  mapStateToProps
)(CollaboratorsView)

