/*
 *
 * SignupView
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import View from 'components/View'
import { RegisterForm, RegisterOptions } from 'components/Login'
import ConditionalPaper from 'components/ConditionalPaper'
import SocialLogin from 'components/SocialLogin'
import Separator from 'components/Separator'
import Logo from 'components/Logo'
import { signup } from './actions'
import { socialLogin } from 'containers/App/actions'
// import selectRegisterView from './selectors'

const styles = {
  paper: {
    padding: 20,
    width: 400,
    margin: '0 auto'
  }
}

class SignupView extends Component {
  constructor(props) {
    super(props)
    this.state = { showOptions: true }
  }
  handleClick = () => {
    this.setState({ showOptions: !this.state.showOptions })
  }
  handleSubmit = (userData) => {
    this.props.requestSignup(userData.toJS())
  }

  render() {
    let logo
    let form
    if (this.state.showOptions) {
      form = <RegisterOptions onClick={this.handleClick} />
      logo = <Logo />
    } else {
      form = <RegisterForm onSubmit={this.handleSubmit} />
      logo = null
    }
    return (
      <View>
        <ConditionalPaper>
          {logo}
          <SocialLogin onSuccess={this.props.requestAppToken} />
          <Separator />
          {form}
        </ConditionalPaper>
      </View>
    )
  }
}

/*
const mapStateToProps = selectRegisterView();
*/

SignupView.propTypes = {
  requestSignup: PropTypes.func.isRequired,
  requestAppToken: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const loading = state.getIn(['register', 'loading'])
  const error = state.getIn(['register', 'error'])
  return ({ loading, error })
}

const mapDispatchToProps = (dispatch) => ({
  requestSignup: (userData) => {
    dispatch(signup.request(userData))
  },
  requestAppToken: (token, socialNetwork) => {
    dispatch(socialLogin.request(token, socialNetwork))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupView)
