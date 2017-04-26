import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'
import { reduxForm, Field, propTypes } from 'redux-form/immutable'
import { TextField, Checkbox } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import { Row, Col } from 'react-flexbox-grid'
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
  register: {
    position: 'absolute',
    right: 0,
    bottom: 10
  },
  signinButton: {
    width: '100%'
  },
  forgotPassword: {
    marginTop: 0,
    textAlign: 'right'
  }
}

// based on: https://github.com/erikras/redux-form-material-ui/blob/master/example/src/Form.js
/* eslint-disable import/no-mutable-exports */
let LoginForm = class LoginForm extends Component {
  componentDidMount() {
    this.firstField            // the Field
      .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
      .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
      .focus()                // on TextField
  }

  render() {
    const { handleSubmit, submitting, pristine } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Div>
          <Field
            name='username'
            component={TextField}
            ref={(input) => { this.firstField = input }} withRef
            style={styles.text}
            hintText={<FormattedMessage {...messages.email} />}
            floatingLabelText={<FormattedMessage {...messages.user} />}
            validate={[required, email]}
          />
          <Field
            name='password'
            component={TextField}
            type='password'
            style={styles.text}
            hintText={<FormattedMessage {...messages.password} />}
            floatingLabelText={<FormattedMessage {...messages.password} />}
            validate={required}
          />
        </Div>
        <Div>
          <Row>
            <Col xs={6}>
              <Field
                name='remember'
                component={Checkbox}
                label={<FormattedMessage {...messages.remember} />}
                style={styles.checkbox}
                onCheck={(value) => {
                  console.log('onCheck ', value) // eslint-disable-line no-console
                }}
              />
            </Col>
            <Col xs={6}>
              <Link to='http://localhost:3000/register'>
                <p style={styles.forgotPassword}>
                  {<FormattedMessage {...messages.forgotPassword} />}
                </p>
              </Link>
            </Col>
          </Row>
        </Div>
        <Div>
          <RaisedButton
            style={styles.signinButton}
            label='SIGN IN'
            primary={true}
            type='submit'
            disabled={pristine || submitting}
          />
        </Div>
        <Div>
          <p>
            {<FormattedMessage {...messages.offerAccount} />}
          </p>
          <Link to='/register'>
            <RaisedButton
              style={styles.register}
              label={<FormattedMessage {...messages.signup} />}
              secondary={true}
            />
          </Link>
        </Div>
      </form>
    )
  }
}
LoginForm.propTypes = {
  ...propTypes
}
LoginForm = reduxForm({
  form: 'signin',
  touchOnBlur: false,
  touchOnChange: true
  // fields
})(LoginForm)

export default LoginForm
