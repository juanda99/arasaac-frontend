/*
 *
 * LoginView
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { login } from './actions'


export class LoginView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  handleClick = () => {
    // this.props.login.request('pepito', 'password')
    this.props.requestLogin('pepito', 'password')
  }
  render() {
    return (
      <div>
        <button style={{ margin: '200' }} onClick={this.handleClick}>Pulsar</button>
      </div>
    )
  }
}

LoginView.propTypes = {
  requestLogin: PropTypes.func.isRequired
}


const mapDispatchToProps = (dispatch) => ({
  requestLogin: (username, password) => {
    dispatch(login.request(username, password))
  }
})

export default connect(null, mapDispatchToProps)(LoginView)
