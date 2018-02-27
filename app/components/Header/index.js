/**
*
* Header
*
*/
import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import styles from './styles'
import Title from './Title'
import UserMenu from './UserMenu'
import GuestMenu from './GuestMenu'

const Header = (props) => {
  const handleTouchTapLeftIconButton = () => {
    props.touchTapLeftIconButton()
  }
  const { isAuthenticated, showMenuIconButton, title, isTranslating, changeLocale, signout } = props
  return (
    <AppBar
      onLeftIconButtonTouchTap={handleTouchTapLeftIconButton}
      title={<Title docked={props.docked}>{title}</Title>}
      zDepth={0}
      id='header'
      style={styles.appBar}
      showMenuIconButton={showMenuIconButton}
      iconElementRight={isAuthenticated ? <UserMenu isTranslating={isTranslating} changeLocale={changeLocale} signout={signout} /> : <GuestMenu />}
    />
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
  signout: PropTypes.func.isRequired,
  touchTapLeftIconButton: PropTypes.func.isRequired,
  isTranslating: PropTypes.bool.isRequired
}

export default Header
