import React, { PropTypes } from 'react'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import MenuItem from 'material-ui/MenuItem'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'

/* eslint-disable jsx-a11y/anchor-has-content */

import messages from './messages'
const UserMenu = ({ isTranslating, changeLocale }) => (
  <IconMenu
    iconButtonElement={
      <IconButton><MoreVertIcon color={'white'} /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem primaryText={<FormattedMessage {...messages.appConfiguration} />} containerElement={<Link to='/configuration' />} />
    <MenuItem primaryText={<FormattedMessage {...messages.userProfile} />} containerElement={<Link to='/profile' />} />
    <MenuItem primaryText={<FormattedMessage {...messages.userMaterial} />} containerElement={<Link to='/usermaterial' />} />
    {(!isTranslating)
    ? <MenuItem primaryText={<FormattedMessage {...messages.translateArasaac} />} onClick={changeLocale} />
    : <MenuItem primaryText={<FormattedMessage {...messages.stopTranslateArasaac} />} onClick={changeLocale} /> }
    <MenuItem primaryText={<FormattedMessage {...messages.signout} />} href='/signout' />
    <MenuItem primaryText={<FormattedMessage {...messages.signin} />} containerElement={<Link to='/signin' />} />
    <MenuItem primaryText={<FormattedMessage {...messages.register} />} containerElement={<Link to='/register' />} />
  </IconMenu>
)

UserMenu.propTypes = {
  isTranslating: PropTypes.bool.isRequired,
  changeLocale: PropTypes.func.isRequired
}

export default UserMenu
