/*
 *
 * LoginView
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import View from 'components/View'
import { LoginForm, RegisterOptions, RegisterForm } from 'components/Login'
import { login } from './actions'

export class LoginView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  handleClick = () => {
    // this.props.login.request('pepito', 'password')
    this.props.requestLogin('pepito', 'password')
  }

  render() {
    let loginComponent
    if ((this.props.location.pathname).toLowerCase() === '/signin') {
      loginComponent = <LoginForm />
    } else if ((this.props.location.pathname).toLowerCase() === '/register') {
      loginComponent = <RegisterForm />
    } else {
      loginComponent = <RegisterOptions />
    }

    return (
      <View>
        {loginComponent}
      </View>
    )
  }
}

LoginView.propTypes = {
  requestLogin: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
}


const mapDispatchToProps = (dispatch) => ({
  requestLogin: (username, password) => {
    dispatch(login.request(username, password))
  }
})

export default connect(null, mapDispatchToProps)(LoginView)
