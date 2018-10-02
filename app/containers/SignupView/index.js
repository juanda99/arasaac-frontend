/*
 *
 * SignupView
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import View from 'components/View'
import { createSelector } from 'reselect'
import { injectIntl, intlShape } from 'react-intl'
import { RegisterForm, RegisterOptions } from 'components/Login'
import ConditionalPaper from 'components/ConditionalPaper'
import SocialLogin from 'components/SocialLogin'
import Separator from 'components/Separator'
import Logo from 'components/Logo'
import { socialLogin } from 'containers/App/actions'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'
import ErrorWindow from 'components/ErrorWindow'
import messages from './messages'
import { signup, resetError } from './actions'
import {
  makeSelectName,
  makeSelectEmail,
  makeSelectSend,
  makeSelectError,
  makeSelectLoading
} from './selectors'


class SignupView extends Component {
  constructor(props) {
    super(props)
    this.state = { showOptions: true }
  }
  handleClick = () => {
    this.setState({ showOptions: !this.state.showOptions })
  }
  handleSubmit = (userData) => {
    // we add locale so we send the message in the proper language
    this.props.requestSignup({ ...userData.toJS(), locale: this.props.locale })
  }

  render() {
    // const { name, email, send, error, lo  intl: intlShape.isRequired,ading, locale } = this.props
    const { error, intl } = this.props
    const { formatMessage } = intl
    let showError = null
    if (error === 403) showError = <ErrorWindow title={formatMessage(messages.createUser)} desc={formatMessage(messages.userNotActivated)} onReset={resetError} />
    else if (error === 409) showError = <ErrorWindow title={formatMessage(messages.createUser)} desc={formatMessage(messages.userConflict)} onReset={resetError} />
    else if (error === 500) showError = <ErrorWindow title={formatMessage(messages.createUser)} desc={formatMessage(messages.userNotCreated)} onReset={resetError} />
    let renderView
    if (this.state.showOptions) {
      renderView = (
        <div>
          <Logo />
          <SocialLogin onSuccess={this.props.requestAppToken} />
          <Separator />
          <RegisterOptions onClick={this.handleClick} />
        </div>
      )
    } else {
      renderView = (
        <div>
          <SocialLogin onSuccess={this.props.requestAppToken} />
          <Separator />
          <RegisterForm onSubmit={this.handleSubmit} />
          { this.props.error === 403 ? <p>El usuario ya existe en la base de datos</p> : '' }
        </div>
      )
    }
    return (

      <View>
        {showError}
        <ConditionalPaper>
          {renderView}
        </ConditionalPaper>
      </View>
    )
  }
}


SignupView.propTypes = {
  intl: intlShape.isRequired,
  requestSignup: PropTypes.func.isRequired,
  requestAppToken: PropTypes.func.isRequired,
  name: PropTypes.string,
  email: PropTypes.string,
  send: PropTypes.bool,
  error: PropTypes.string,
  loading: PropTypes.string,
  locale: PropTypes.string
}


const mapStateToProps = createSelector(
  makeSelectLocale(), makeSelectName(), makeSelectEmail(), makeSelectSend(), makeSelectError(), makeSelectLoading(),
  (locale, name, email, send, error, loading) => ({ locale, name, email, send, error, loading })
)


const mapDispatchToProps = (dispatch) => ({
  requestSignup: (userData) => {
    dispatch(signup.request(userData))
  },
  requestAppToken: (token, socialNetwork) => {
    dispatch(socialLogin.request(token, socialNetwork))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SignupView))
