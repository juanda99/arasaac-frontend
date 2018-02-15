import { defineMessages } from 'react-intl'
const messages = defineMessages({
  or: {
    id: 'signin.or',
    description: 'Or, because it offers two posibilities',
    defaultMessage: 'or'
  },
  forgotPassword: {
    id: 'signin.forgotPassword',
    description: 'Link for password reset if passwords is forgotten',
    defaultMessage: 'Forgot password?'
  },
  offerAccount: {
    id: 'signin.offerAccount',
    description: 'Text inviting for creating an account',
    defaultMessage: 'Don\'t have an account?'
  },
  signup: {
    id: 'signin.signup',
    description: 'Button for creating a new account',
    defaultMessage: 'Sign up'
  },
  offerSignin: {
    id: 'signin.offerUseAccount',
    description: 'Text inviting for creating an account',
    defaultMessage: 'Already an Arasaac user?'
  },
  signin: {
    id: 'signup.signin',
    description: 'Button for going to sign in view',
    defaultMessage: 'Sign in with ARASAAC'
  },
  agreement: {
    id: 'signup.agreement',
    description: 'Link to the use conditions and the privacy policy',
    defaultMessage: 'By clicking on Sign up, you agree to {useConditions} and {privacyPolicy}'
  },
  useConditions: {
    id: 'signup.useConditions',
    description: 'Arasaac use conditions',
    defaultMessage: 'Arasaac\'s use conditions'
  },
  privacyPolicy: {
    id: 'signup.privacyPolicy',
    description: 'Arasaac privacy policy',
    defaultMessage: 'privacy policy'
  }
})

export default messages
