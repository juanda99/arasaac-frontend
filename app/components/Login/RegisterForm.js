import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router'
import { reduxForm, Field, propTypes } from 'redux-form/immutable'
import { TextField } from 'redux-form-material-ui'
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
  },
  signinButton: {
    position: 'absolute',
    right: 0,
    bottom: 10
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
        <Div>
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
            />
            <Field
              name='surname'
              component={TextField}
              hintText='What is your surname?'
              value=''
              floatingLabelText='Surname'
              style={{ width: '100%' }}
              validate={required}
            />
            <Field
              name='email'
              component={TextField}
              hintText='What is your email?'
              value=''
              floatingLabelText='Email'
              style={{ width: '100%' }}
              validate={[required, email]}
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
            />
            <Field
              name='company'
              component={TextField}
              hintText='What is your company?'
              value=''
              floatingLabelText='Company (optional)'
              style={{ width: '100%' }}
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
        <Div>
          <Link to='/signin'>
            <p>
              {<FormattedMessage {...messages.offerSignin} />}
            </p>
          </Link>
          <Link to='/signin'>
            <RaisedButton
              style={styles.signinButton}
              label={<FormattedMessage {...messages.signin} />}
              secondary={true}
              onTouchTap={this.handleSubmit}
            />
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

