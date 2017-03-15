/*
 *
 * LoginView
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import View from 'components/View'
import { LoginForm } from 'components/Login'
import Paper from 'material-ui/Paper'
import SocialLogin from 'components/SocialLogin'
import Separator from 'components/Separator'
import Logo from 'components/Logo'
import { login } from './actions'

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

const LoginView = ({ requestLogin }) => (
  <View>
    <Paper zDepth={2} style={styles.paper}>
      <Logo />
      <SocialLogin />
      <Separator />
      <LoginForm onSubmit={(formData) => (handleSubmit(requestLogin, formData))} />
    </Paper>
  </View>
)

LoginView.propTypes = {
  requestLogin: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  requestLogin: (username, password) => {
    dispatch(login.request(username, password))
  }
})

export default connect(null, mapDispatchToProps)(LoginView)
