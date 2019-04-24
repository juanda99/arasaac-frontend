import { defineMessages } from 'react-intl'
const messages = defineMessages({
  or: {
    id: 'signin.or',
    description: 'Or, because it offers two posibilities',
    defaultMessage: 'or'
  },
  user: {
    id: 'user.signin',
    description: 'Username field default text for login',
    defaultMessage: 'User'
  },
  email: {
    id: 'email.signin',
    description: 'Hint for username login field',
    defaultMessage: 'e-mail'
  },
  invalidEmail: {
    id: 'Login.invalidEmail',
    description: 'Error message',
    defaultMessage: 'Invalid email'
  },
  required: {
    id: 'Login.required',
    description: 'Error message',
    defaultMessage: 'Required'
  },
  password: {
    id: 'password.signin',
    description: 'Password field for login, default text',
    defaultMessage: 'Password'
  },
  forgotPassword: {
    id: 'signin.forgotPassword',
    description: 'Text for password reset if passwords is forgotten',
    defaultMessage: 'Forgot password?'
  },
  recoverPassword: {
    id: 'signin.recoverPassword',
    description: 'Button text for password reset if passwords is forgotten',
    defaultMessage: 'Recover password'
  },
  recoverPasswordInfo: {
    id: 'signin.recoverPassword',
    description: 'Instructions if passwords is forgotten',
    defaultMessage: 'Fill your email to receive a link to change your password'
  },
  offerAccount: {
    id: 'signin.offerAccount',
    description: 'Text inviting for creating an account',
    defaultMessage: "Don't have an account?"
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
    defaultMessage: 'Sign in'
  },
  agreement: {
    id: 'signup.agreement',
    description: 'Link to the use conditions and the privacy policy',
    defaultMessage:
      'By clicking on Sign up, you agree to {useConditions} and {privacyPolicy}'
  },
  useConditions: {
    id: 'signup.useConditions',
    description: 'Arasaac use conditions',
    defaultMessage: "Arasaac's use conditions"
  },
  privacyPolicy: {
    id: 'signup.privacyPolicy',
    description: 'Arasaac privacy policy',
    defaultMessage: 'privacy policy'
  }
})

export default messages
