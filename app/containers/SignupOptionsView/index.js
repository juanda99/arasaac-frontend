import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import View from 'components/View'
import { socialLogin } from 'containers/App/actions'
import ConditionalPaper from 'components/ConditionalPaper'
import SocialLogin from 'components/SocialLogin'
import Separator from 'components/Separator'
import { RegisterOptions } from 'components/Login'
import Logo from 'components/Logo'
import { Link } from 'react-router'

class SignupOptionsView extends Component {
  render() {
    return (
      <View>
        <ConditionalPaper>
          <Logo />
          <SocialLogin onSuccess={this.props.requestAppToken} />
          <Separator />
          <RegisterOptions onClick={this.handleClick} />
        </ConditionalPaper>
      </View>
    )
  }
}

SignupOptionsView.propTypes = {
  requestAppToken: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  requestAppToken: (token, socialNetwork) => {
    dispatch(socialLogin.request(token, socialNetwork))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(SignupOptionsView)
