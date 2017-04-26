/**
*
* Header
*
*/

/* eslint-disable jsx-a11y/anchor-has-content */

import React, { PropTypes } from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import styles from './styles'
import Title from './Title'

const Header = (props) => {
  const handleTouchTapLeftIconButton = () => {
    props.touchTapLeftIconButton()
  }
  const { isAuthenticated, showMenuIconButton, title, isTranslating, changeLocale } = props
  return (
    <div>
      {(!isAuthenticated)
      ? <AppBar
        onLeftIconButtonTouchTap={handleTouchTapLeftIconButton}
        title={<Title docked={props.docked}>{title}</Title>}
        zDepth={0}
        style={styles.appBar}
        showMenuIconButton={showMenuIconButton}
        iconElementRight={
          <IconMenu
            iconButtonElement={
              <IconButton><MoreVertIcon /></IconButton>
            }
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem primaryText={<FormattedMessage {...messages.signin} />} containerElement={<Link to='/signin' />} />
            <MenuItem primaryText={<FormattedMessage {...messages.register} />} containerElement={<Link to='/register' />} />
            <MenuItem primaryText={<FormattedMessage {...messages.appConfiguration} />} containerElement={<Link to='/configuration' />} />
            <MenuItem primaryText={<FormattedMessage {...messages.uploadMaterial} />} containerElement={<Link to='/uploadmaterial' />} />
          </IconMenu>
          }
      />
      : <AppBar
        onLeftIconButtonTouchTap={handleTouchTapLeftIconButton}
        title={<Title docked={props.docked}>{title}</Title>}
        zDepth={0}
        style={styles.appBar}
        showMenuIconButton={showMenuIconButton}
        iconElementRight={
          <IconMenu
            iconButtonElement={
              <IconButton><MoreVertIcon /></IconButton>
            }
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem primaryText={<FormattedMessage {...messages.appConfiguration} />} containerElement={<Link to='/configuration' />} />
            <MenuItem primaryText={<FormattedMessage {...messages.userProfile} />} containerElement={<Link to='/profile' />} />
            <MenuItem primaryText={<FormattedMessage {...messages.userMaterial} />} containerElement={<Link to='/usermaterial' />} />
            {(!isTranslating)
            ? <MenuItem primaryText={<FormattedMessage {...messages.translateArasaac} />} onClick={changeLocale} />
            : <MenuItem primaryText='Dejar de traducir' onClick={changeLocale} /> }
            <MenuItem primaryText={<FormattedMessage {...messages.signout} />} href='/signout' />
            <MenuItem primaryText={<FormattedMessage {...messages.signin} />} containerElement={<Link to='/signin' />} />
            <MenuItem primaryText={<FormattedMessage {...messages.register} />} containerElement={<Link to='/register' />} />
          </IconMenu>
          }
      />
      }
    </div>
  )
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  showMenuIconButton: PropTypes.bool.isRequired,
  // será un string
  title: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired
  ]),
  docked: PropTypes.bool.isRequired,
  changeLocale: PropTypes.func.isRequired,
  touchTapLeftIconButton: PropTypes.func.isRequired,
  isTranslating: PropTypes.bool.isRequired
}

export default Header
