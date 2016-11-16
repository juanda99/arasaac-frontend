/**
*
* Header
*
*/
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

const Header = (props) => {
  const handleTouchTapLeftIconButton = () => {
    props.touchTapLeftIconButton()
  }
  const { isAuthenticated, showMenuIconButton, title } = props
  return (
    <div>
      {(!isAuthenticated)
      ? <AppBar
        onLeftIconButtonTouchTap={handleTouchTapLeftIconButton}
        title={title}
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
        title={title}
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
            <MenuItem primaryText={<FormattedMessage {...messages.uploadMaterial} />} containerElement={<Link to='/upload' />} />
            <MenuItem primaryText={<FormattedMessage {...messages.translateArasaac} />} containerElement={<Link to='/translate' />} />
            <MenuItem primaryText={<FormattedMessage {...messages.signout} />} href='/signout' />
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
  touchTapLeftIconButton: PropTypes.func.isRequired
}

export default Header
