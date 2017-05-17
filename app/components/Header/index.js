/**
*
* Header
*
*/
import React, { PropTypes } from 'react'
import AppBar from 'material-ui/AppBar'
import styles from './styles'
import Title from './Title'
import UserMenu from './UserMenu'
import GuestMenu from './GuestMenu'

const Header = (props) => {
  const handleTouchTapLeftIconButton = () => {
    props.touchTapLeftIconButton()
  }
  const { isAuthenticated, showMenuIconButton, title, isTranslating, changeLocale } = props
  return (
    <AppBar
      onLeftIconButtonTouchTap={handleTouchTapLeftIconButton}
      title={<Title docked={props.docked}>{title}</Title>}
      zDepth={0}
      style={styles.appBar}
      showMenuIconButton={showMenuIconButton}
      iconElementRight={isAuthenticated ? <UserMenu isTranslating={isTranslating} changeLocale={changeLocale} /> : <GuestMenu />}
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
  touchTapLeftIconButton: PropTypes.func.isRequired,
  isTranslating: PropTypes.bool.isRequired
}

export default Header
