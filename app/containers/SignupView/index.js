/*
 *
 * SignupView
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import api from 'services'
import View from 'components/View'
import { createSelector } from 'reselect'
import { withRouter } from 'react-router'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import { RegisterForm } from 'components/Login'
import ConditionalPaper from 'components/ConditionalPaper'
import SocialLogin from 'components/SocialLogin'
import Separator from 'components/Separator'
import Logo from 'components/Logo'
import P from 'components/P'
import H3 from 'components/H3'
import { socialLogin } from 'containers/App/actions'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'
import AlertWindow from 'components/AlertWindow'
import messages from './messages'

class SignupView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showOptions: true,
      loading: false,
      error: '',
      registered: false
    }
  }

  resetError = () => {
    const { router } = this.props
    this.setState({ error: '' })
    router.push('signin/')
  }

  recoverPassword = () => {
    const { router } = this.props
    router.push('recoverpassword/')
  }

  handleSubmit = async (userData) => {
    const { showProgressBar, hideProgressBar } = this.props
    try {
      this.setState({ loading: true })
      showProgressBar()
      const data = { ...userData.toJS(), locale: this.props.locale, searchLanguage: this.props.locale }
      await api.SIGNUP_REQUEST(data)
      hideProgressBar()
      this.setState({ registered: true, loading: false })
    } catch (error) {
      hideProgressBar()
      this.setState({ error: error.message, loading: false })
    }
  }

  render() {
    const { intl, locale } = this.props
    const { error, registered, loading } = this.state
    const { formatMessage } = intl
    let showError = null
    if (error === 'NOT_ACTIVATED_USER') {
      showError = (
        <AlertWindow
          title={formatMessage(messages.createUser)}
          desc={formatMessage(messages.userNotActivated)}
          onReset={this.resetError}
        />
      )
    } else if (error === 'ALREADY_USER') {
      showError = (
        <AlertWindow
          title={formatMessage(messages.createUser)}
          desc={formatMessage(messages.userConflict)}
          onSolution={this.recoverPassword}
          onSolutionText={formatMessage(messages.recoverPassword)}
          onReset={this.resetError}
        />
      )
    } else {
      showError = (
        <AlertWindow
          title={formatMessage(messages.createUser)}
          desc={formatMessage(messages.userNotCreated)}
          onReset={this.resetError}
        />
      )
    }
    const renderView = registered ? (
      <div>
        <Logo src='https://static.arasaac.org/pictograms/5432/5432_300.png' />
        <P>
          <FormattedMessage {...messages.userCreated} />
        </P>
      </div>
    ) : (
      <div>
        <SocialLogin onSuccess={this.props.requestAppToken} locale={locale} />
        <Separator />
        {loading ? (
          <H3>
            <FormattedMessage {...messages.creatingUser} />
          </H3>
        ) : (
          <RegisterForm onSubmit={this.handleSubmit} />
        )}

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

SignupView.propTypes = {
  intl: intlShape.isRequired,
  requestAppToken: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  router: PropTypes.any.isRequired,
  showProgressBar: PropTypes.func.isRequired,
  hideProgressBar: PropTypes.func.isRequired
}

const mapStateToProps = createSelector(
  makeSelectLocale(),
  (locale) => ({ locale })
)

const mapDispatchToProps = (dispatch) => ({
  requestAppToken: (token, socialNetwork) => {
    dispatch(socialLogin.request(token, socialNetwork))
  },
  showProgressBar: () => dispatch(showLoading()),
  hideProgressBar: () => dispatch(hideLoading())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(withRouter(SignupView)))
