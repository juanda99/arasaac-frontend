import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router'
import { reduxForm, Field, propTypes } from 'redux-form/immutable'
import { TextField } from 'redux-form-material-ui'
import FlatButton from 'material-ui/FlatButton'
import Div from 'components/Div'
import messages from './messages'
import { required, email } from './validate'

const styles = {
  checkbox: {
    left: 0
  },
  text: {
    width: '100%'
  },
  signup: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10
  }
}


/* eslint-disable import/no-mutable-exports */
let RegisterForm = class RegisterForm extends Component {

  handleSubmit() {
    // ?????
  }

  componentDidMount() {
    this.firstField            // the Field
      .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
      .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
      .focus()                // on TextField
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props
    /* en las propiedades estaba resetForm y submitting*/
    return (
      <div>
        <Div top={2}>
          <form onSubmit={handleSubmit}>
            <Field
              name='name'
              component={TextField}
              ref={(input) => { this.firstField = input }} withRef
              hintText='What is your name?'
              value=''
              floatingLabelText='Name'
              style={{ width: '100%' }}
              validate={required}
              autoComplete='name'
            />
            <Field
              name='email'
              component={TextField}
              hintText='What is your email?'
              value=''
              floatingLabelText='Email'
              style={{ width: '100%' }}
              validate={[required, email]}
              autoComplete='email'
            />
            <Field
              name='password'
              component={TextField}
              type='password'
              hintText='What is your password?'
              value=''
              floatingLabelText='Password'
              style={{ width: '100%' }}
              validate={required}
              autoComplete='new-password'
            />
            <Field
              name='company'
              component={TextField}
              hintText='What is your company?'
              value=''
              floatingLabelText='Company (optional)'
              style={{ width: '100%' }}
              autoComplete='organization'
            />
            <Field
              name='website'
              component={TextField}
              hintText='http://www.example.com'
              value=''
              floatingLabelText='Website (optional)'
              style={{ width: '100%' }}
            />
            <RaisedButton
              type='submit'
              label='Sign up'
              primary={true}
              style={styles.signup}
              disabled={pristine || submitting}
            />
          </form>
        </Div>
        <Div top={2}>
          <Link to='/signin'>
            <FlatButton label={<FormattedMessage {...messages.offerSignin} />} secondary={true} fullWidth={true} />
          </Link>
        </Div>
      </div>
    )
  }
}
RegisterForm.propTypes = {
  ...propTypes
  // resetForm: PropTypes.func.isRequired,
  // submitting: PropTypes.bool.isRequired
}

RegisterForm = reduxForm({
  form: 'signup',
  touchOnBlur: false,
  touchOnChange: true
})(RegisterForm)

export default RegisterForm

