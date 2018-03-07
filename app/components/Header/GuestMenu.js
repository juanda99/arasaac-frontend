import React from 'react'
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { Link } from 'react-router'
import { FormattedMessage } from 'react-intl'
import EmailIcon from 'material-ui/svg-icons/action/account-box'
import messages from './messages'


const GuestMenu = (props) => (
  <Link to='/signin'>
    <FlatButton
      style={{ color: props.muiTheme.appBar.textColor, marginTop: 4 }}
      {...this.props}
      label={<FormattedMessage {...messages.signin} />}
      icon={<EmailIcon />}
      href='/signin'
    />
  </Link>
)

GuestMenu.propTypes = {
  muiTheme: PropTypes.object.isRequired
}

export default muiThemeable()(GuestMenu)
