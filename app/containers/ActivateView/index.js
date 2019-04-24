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
import { activation, resetError } from 'containers/App/actions'
import ErrorWindow from 'components/ErrorWindow'
import { withRouter } from 'react-router'
import {
  makeSelectHasUser,
  makeSelectLoading,
  makeSelectError
} from 'containers/App//selectors'
import messages from './messages'

class ActivateView extends Component {
  componentDidMount() {
    const { activationCode } = this.props.params
    if (activationCode) {
      this.props.requestActivation(activationCode)
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.isAuthenticated === true) {
      this.props.router.push('/')
    }
  }

  render() {
    const { isLoading, isAuthenticated, error, resetError, intl } = this.props
    const { formatMessage } = intl
    let showError = null
    if (error === 'INVALID_CODE') {
      showError = (
        <ErrorWindow
          title={formatMessage(messages.activateUser)}
          desc={formatMessage(messages.invalidCode)}
          onReset={resetError}
        />
      )
    } else if (error === 'EXPIRED_CODE') {
      showError = (
        <ErrorWindow
          title={formatMessage(messages.activateUser)}
          desc={formatMessage(messages.expiredCode)}
          onReset={resetError}
        />
      )
    } else {
      showError = (
        <ErrorWindow
          title={formatMessage(messages.activateUser)}
          desc={formatMessage(messages.userNotActivated)}
          onReset={resetError}
        />
      )
    }
    return (
      <View>
        {isLoading && <p>Activating user...</p>}
        {isAuthenticated && <p>¡Usuario autenticado!</p>}
        {error && showError}
      </View>
    )
  }
}

ActivateView.propTypes = {
  params: PropTypes.object.isRequired,
  requestActivation: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isLoading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  resetError: PropTypes.func.isRequired,
  router: PropTypes.any.isRequired,
  intl: intlShape.isRequired
}

const mapStateToProps = (state) => ({
  isAuthenticated: (makeSelectHasUser()(state) && true) || false,
  isLoading: makeSelectLoading()(state),
  error: makeSelectError()(state)
})

const mapDispatchToProps = (dispatch) => ({
  requestActivation: (code) => {
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
