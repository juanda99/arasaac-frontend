/*
 *
 * ActivateView
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import View from 'components/View'
import { activation, resetError } from 'containers/App/actions'
import ErrorWindow from 'components/ErrorWindow'
import { withRouter } from 'react-router'
import {
  makeSelectHasUser,
  makeSelectLoading,
  makeSelectError
} from 'containers/App//selectors'

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
    const { isLoading, isAuthenticated, error, resetError } = this.props
    let showError = null
    if (error) {
      showError = (
        <ErrorWindow
          title='Activación de usuario'
          desc='Usuario no válido'
          onReset={resetError}
        />
      )
    }
    return (
      <View>
        {showError}
        {isLoading && <p>Cargando usuario...</p>}
        {isAuthenticated && <p>¡Usuario autenticado!</p>}
        {error && error === 'INVALID_CODE' && <p>El código es inválido</p>}
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
  router: PropTypes.any.isRequired
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
)(withRouter(ActivateView))
