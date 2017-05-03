import React from 'react'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import MenuItem from 'material-ui/MenuItem'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'

/* eslint-disable jsx-a11y/anchor-has-content */

import messages from './messages'
const GuestMenu = () => (
  <IconMenu iconButtonElement={<IconButton><MoreVertIcon color={'white'} /></IconButton>} targetOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'top' }} >
    <MenuItem primaryText={<FormattedMessage {...messages.signin} />} containerElement={<Link to='/signin' />} />
    <MenuItem primaryText={<FormattedMessage {...messages.register} />} containerElement={<Link to='/register' />} />
    <MenuItem primaryText={<FormattedMessage {...messages.appConfiguration} />} containerElement={<Link to='/configuration' />} />
    <MenuItem primaryText={<FormattedMessage {...messages.uploadMaterial} />} containerElement={<Link to='/uploadmaterial' />} />
  </IconMenu>
)

export default GuestMenu
