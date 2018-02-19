/*
 *
 * LoginView
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import View from 'components/View'
import { LoginForm } from 'components/Login'
import Paper from 'material-ui/Paper'
import SocialLogin from 'components/SocialLogin'
import Separator from 'components/Separator'
import Logo from 'components/Logo'
import ErrorWindow from 'components/ErrorWindow'
import { login, resetError } from './actions'

const styles = {
  paper: {
    padding: 20,
    width: 400,
    margin: '0 auto'
  }
}

const handleSubmit = (requestLogin, formData) => {
  // this.props.login.request('pepito', 'password')
  const user = formData.get('username')
  const password = formData.get('password')
  requestLogin(user, password)
}


class LoginView extends Component {
  
  render() {
    const { error, requestLogin, resetError } = this.props
    let showError = null
    if (error) showError = <ErrorWindow title='Autenticación' desc='Usuario no válido' onReset={resetError} />
    return (
      <View>
        {showError}
        <Paper zDepth={2} style={styles.paper}>
          <Logo />
          <SocialLogin />
          <Separator />
          <LoginForm onSubmit={(formData) => (handleSubmit(requestLogin, formData))} message={error} />
        </Paper>
      </View>
    )
  }
}

/*
const LoginView = ({ requestLogin, error }) => (
  <View>
    <Paper zDepth={2} style={styles.paper}>
      <Logo />
      <SocialLogin />
      <Separator />
      <LoginForm onSubmit={(formData) => (handleSubmit(requestLogin, formData))} error={error} />
    </Paper>
  </View>
)
*/

LoginView.propTypes = {
  requestLogin: PropTypes.func.isRequired,
  error: PropTypes.number,
  resetError: PropTypes.func.isRequired
}


const mapStateToProps = (state) => ({
  error: state.getIn(['auth', 'error'])
})


const mapDispatchToProps = (dispatch) => ({
  requestLogin: (username, password) => {
    dispatch(login.request(username, password))
  },
  resetError: () => {
    dispatch(resetError())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
