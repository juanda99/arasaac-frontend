import React from 'react'
import Div from 'components/Div'
import GoogleLogin from './GoogleLogin'
import FacebookLogin from './FacebookLogin'

const responseFacebook = (response) => {
  console.log(response)
}

const success = (response) => {
  console.log(response)
}

const error = (response) => {
  console.error(response)
}

const SocialLogin = () => (
  <Div>
    <GoogleLogin
      clientId={'321241205-djlltqe6cpo9vm3hp392giboofdp44ha.apps.googleusercontent.com'}
      onSuccess={success}
      onFailure={error}
      offline={false}
    />
    <FacebookLogin
      appId='1687810071473822'
      fields='name,email,picture'
      callback={responseFacebook}
    />
  </Div>
)

export default SocialLogin
