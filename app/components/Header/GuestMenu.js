import React from 'react'
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { FormattedMessage } from 'react-intl'
import messages from './messages'


const GuestMenu = (props) => (
  <FlatButton style={{ color: props.muiTheme.appBar.textColor, marginTop: 4 }} {...this.props} label={<FormattedMessage {...messages.signin} />} />
)

GuestMenu.propTypes = {
  muiTheme: PropTypes.object.isRequired
}

export default muiThemeable()(GuestMenu)
