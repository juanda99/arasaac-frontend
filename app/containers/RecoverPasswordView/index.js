/*
 *
 * SignupView
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import api from 'services'
import View from 'components/View'
import { createSelector } from 'reselect'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import { RecoverPasswordForm } from 'components/Login'
import ConditionalPaper from 'components/ConditionalPaper'
import Logo from 'components/Logo'
import P from 'components/P'
import { socialLogin } from 'containers/App/actions'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'
import AlertWindow from 'components/AlertWindow'
import messages from './messages'

class RecoverPasswordView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      error: '',
      sent: false
    }
  }

  resetError = () => {
    this.setState({ error: '' })
  }

  handleSubmit = async (userData) => {
    try {
      const data = { ...userData.toJS(), locale: this.props.locale }
      await api.SIGNUP_REQUEST(data)
      this.setState({ sent: true })
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  render() {
    const { intl } = this.props
    const { email } = this.props.params
    const { error, sent } = this.state
    const { formatMessage } = intl
    let showError = null
    if (error === 'NOT_ACTIVATED_USER') {
      showError = (
        <AlertWindow
          title={formatMessage(messages.resetPassword)}
          desc={formatMessage(messages.userNotActivated)}
          onReset={this.resetError}
        />
      )
    } else if (error === 'NOT_USER') {
      showError = (
        <AlertWindow
          title={formatMessage(messages.resetPassword)}
          desc={formatMessage(messages.userNotExists)}
          onReset={this.resetError}
        />
      )
    } else {
      showError = (
        <AlertWindow
          title={formatMessage(messages.resetPassword)}
          desc={formatMessage(messages.passwordNotReset)}
          onReset={this.resetError}
        />
      )
    }
    const renderView = sent ? (
      <div>
        <Logo src='https://static.arasaac.org/pictograms/5432/5432_300.png' />
        <P>
          <FormattedMessage {...messages.passwordResetSent} />
        </P>
      </div>
    ) : (
      <div>
        <RecoverPasswordForm onSubmit={this.handleSubmit} email={email} />
        {error && showError}
      </div>
    )

    return (
      <View>
        <ConditionalPaper>{renderView}</ConditionalPaper>
      </View>
    )
  }
}

RecoverPasswordView.propTypes = {
  intl: intlShape.isRequired,
  locale: PropTypes.string,
  params: PropTypes.object.isRequired
}

const mapStateToProps = createSelector(
  makeSelectLocale(),
  (locale) => ({ locale })
)

export default connect(mapStateToProps)(injectIntl(RecoverPasswordView))
