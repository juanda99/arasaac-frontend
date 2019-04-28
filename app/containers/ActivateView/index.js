/*
 *
 * ActivateView
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import View from 'components/View'
import { injectIntl, intlShape } from 'react-intl'
import { login, resetError } from 'containers/App/actions'
import AlertWindow from 'components/AlertWindow'
import { withRouter } from 'react-router'
import { makeSelectHasUser } from 'containers/App//selectors'
import api from 'services'
import messages from './messages'

class ActivateView extends Component {
  state = { error: null, loading: true, userActive: false }
  async componentDidMount() {
    const { activationCode } = this.props.params
    if (activationCode) {
      //   console.log('asking for data....')
      //   this.props.requestActivation(activationCode)
      // }
      try {
        await api.ACTIVATION_REQUEST({
          code: activationCode
        })
        // all ok:
        this.setState({ loading: false, userActive: true })
      } catch (error) {
        console.log(error.message)
        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({ error: error.message })
      }
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.isAuthenticated === true) {
      this.props.router.push('/')
    }
  }

  handleUserActivated = () => {
    this.props.router.push('/signin')
  }

  showSuccess = () => {
    const { intl } = this.props
    const { formatMessage } = intl
    return (
      <AlertWindow
        title={formatMessage(messages.activateUser)}
        desc={formatMessage(messages.userActivated)}
        onReset={this.handleUserActivated}
      />
    )
  }

  render() {
    const { resetError, intl } = this.props
    const { error, isLoading, userActive } = this.state
    const { formatMessage } = intl
    let showError = null
    if (error === 'INVALID_CODE') {
      showError = (
        <AlertWindow
          title={formatMessage(messages.activateUser)}
          desc={formatMessage(messages.invalidCode)}
          onReset={resetError}
        />
      )
    } else if (error === 'EXPIRED_CODE') {
      showError = (
        <AlertWindow
          title={formatMessage(messages.activateUser)}
          desc={formatMessage(messages.expiredCode)}
          onReset={resetError}
        />
      )
    } else {
      showError = (
        <AlertWindow
          title={formatMessage(messages.activateUser)}
          desc={formatMessage(messages.userNotActivated)}
          onReset={resetError}
        />
      )
    }
    return (
      <View>
        {isLoading && <p>Activating user...</p>}
        {userActive && this.showSuccess()}
        {error && showError}
      </View>
    )
  }
}

ActivateView.propTypes = {
  params: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  resetError: PropTypes.func.isRequired,
  router: PropTypes.any.isRequired,
  intl: intlShape.isRequired
}

const mapStateToProps = (state) => ({
  isAuthenticated: (makeSelectHasUser()(state) && true) || false
})

const mapDispatchToProps = (dispatch) => ({
  loginSuccess: (code) => {
    dispatch(activation.request(code))
  },
  resetError: () => {
    dispatch(resetError())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(injectIntl(ActivateView)))
