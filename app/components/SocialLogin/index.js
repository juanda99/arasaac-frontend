import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Div from 'components/Div'
import GoogleLogin from './GoogleLogin'
import FacebookLogin from './FacebookLogin'

class SocialLogin extends PureComponent {
  /* eslint-disable no-console */
  responseFacebook = (response) => {
    // one we get facebook token we ask for our app token
    const token = response.accessToken
    this.props.onSuccess(token, 'facebook')
  }

  success = (response) => {
    console.log(response)
  }

  error = (response) => {
    console.error(response)
  }

  render() {
    return (
      <Div top={2} >
        <GoogleLogin
          clientId={'856321241205-djlltqe6cpo9vm3hp392giboofdp44ha.apps.googleusercontent.com'}
          onSuccess={this.success}
          onFailure={this.error}
          offline={false}
        />
        <FacebookLogin
          appId='1687810071473822'
          fields='name,email'
          callback={this.responseFacebook}
        />
      </Div>
    )
  }
}

SocialLogin.propTypes = {
  onSuccess: PropTypes.func.isRequired
}

export default SocialLogin
