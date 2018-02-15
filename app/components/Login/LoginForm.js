import React, { PureComponent } from 'react'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import { AUTH_LOGIN } from 'services/config'
import messages from './messages'

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
  forgotPassword: {
    textAlign: 'right'
  },
  arasaacLogin: {
    width: '100%',
    float: 'left',
    marginBottom: 15,
    marginTop: 25
  }
}


class LoginForm extends PureComponent {

  componentDidMount() {
    const searchParams = new URLSearchParams(this.props.location.hash.substring(1))
    if (searchParams.get('access_token')) {
      // we should ask for user data based on token or just use token with its data
    }
  }

  render() {
    return (
      <div>
        <RaisedButton
          style={styles.arasaacLogin}
          primary={true}
          label={<FormattedMessage {...messages.signin} />}
          href={AUTH_LOGIN}
        // icon={<GoogleIcon />}
        // labelColor='white'
        />
        <Link to='http://localhost:3000/register'>
          <p style={styles.forgotPassword}>
            {<FormattedMessage {...messages.forgotPassword} />}
          </p>
        </Link>
      </div>
    )
  }
}

LoginForm.propTypes = {
  // Injected by React Router
  location: PropTypes.any.isRequired

}

export default withRouter(LoginForm)
