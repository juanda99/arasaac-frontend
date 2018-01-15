import React from 'react'
import Div from 'components/Div'
import GoogleLogin from './GoogleLogin'
import FacebookLogin from './FacebookLogin'

/* eslint-disable no-console */
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
  <Div top={2} >
    <GoogleLogin
      clientId={'856321241205-djlltqe6cpo9vm3hp392giboofdp44ha.apps.googleusercontent.com'}
      onSuccess={success}
      onFailure={error}
      offline={false}
    />
    <FacebookLogin
      appId='1687810071473822'
      fields='name,email'
      callback={responseFacebook}
    />
  </Div>
)

export default SocialLogin
