import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import EmailIcon from 'material-ui/svg-icons/communication/email'
import { Link } from 'react-router'
import { FormattedMessage } from 'react-intl'
import Div from './Div'
import messages from './messages'
import SocialLogin from './SocialLogin'
import Logo from './Logo'
import Separator from './Separator'

const styles = {
  paper: {
    padding: 20,
    width: 400,
    margin: '0 auto'
  },
  text: {
    textAlign: 'left',
    marginLeft: 5
  },
  signupButton: {
    width: '100%'
  },
  signin: {
    position: 'absolute',
    right: 0,
    bottom: 10
  }
}

const RegisterOptions = () => (
  <Paper zDepth={2} style={styles.paper}>
    <Logo />
    <SocialLogin />
    <Separator />
    <Div>
      <Link to='/register'>
        <RaisedButton
          style={styles.signupButton}
          onClick={this.handleClick}
          label={<FormattedMessage {...messages.signup} />}
          primary={true}
          icon={<EmailIcon />}
        />
      </Link>
    </Div>
    <Div style={{ position: 'relative' }}>
      <p style={styles.text}>
        {<FormattedMessage {...messages.offerSignin} />}
      </p>
      <Link to='/signin'>
        <RaisedButton
          style={styles.signin}
          label={<FormattedMessage {...messages.signin} />}
          secondary={true}
        />
      </Link>
    </Div>
  </Paper>
)

export default RegisterOptions
