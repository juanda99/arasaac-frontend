import React, { Component, PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'
import { reduxForm, Field } from 'redux-form/immutable'
import { TextField, Checkbox } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import { Row, Col } from 'react-flexbox-grid'
import Div from './Div'
import SocialLogin from './SocialLogin'
import Separator from './Separator'
import Logo from './Logo'
import messages from './messages'
import { required, email } from './validate'

const styles = {
  paper: {
    padding: 20,
    width: 400,
    margin: '0 auto'
  },
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
    this.refs.username            // the Field
      .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
      .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
      .focus()                // on TextField
  }

  render() {
    const { handleSubmit, submitting, pristine } = this.props
    return (
      <Paper zDepth={2} style={styles.paper}>
        <Logo />
        <SocialLogin />
        <Separator />
        <form onSubmit={handleSubmit}>
          <Div>
            <Field
              name='username'
              component={TextField}
              ref='username' withRef
              style={styles.text}
              hintText={<FormattedMessage {...messages.email} />}
              floatingLabelText={<FormattedMessage {...messages.user} />}
              validate={[required, email]}
            />
            <Field
              name='password'
              component={TextField}
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
          <button type="submit" disabled={submitting}>Submit</button>
            <RaisedButton
              style={styles.signinButton}
              label='SIGN IN'
              primary={true}
              type='submit'
              disabled={pristine || submitting}
            />
          </Div>
        </form>
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
      </Paper>
    )
  }
}
LoginForm.propTypes = {
  // onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool
}
LoginForm = reduxForm({
  form: 'signin'
  // touchOnBlur: false,
  // touchOnChange: true
  // fields
})(LoginForm)

export default LoginForm
