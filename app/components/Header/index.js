/**
 *
 * Header
 *
 */
import React from "react";
import PropTypes from "prop-types";
import AppBar from "material-ui/AppBar";
import styles from "./styles";
import Title from "./Title";
import UserMenu from "./UserMenu";
import GuestMenu from "./GuestMenu";

const Header = (props) => {
  const handleTouchTapLeftIconButton = () => {
    props.touchTapLeftIconButton();
  };
  const {
    isAuthenticated,
    showMenuIconButton,
    title,
    isTranslating,
    changeLocale,
    signout,
    isMobile,
    role,
  } = props;
  return (
    <div style={{ position: "relative" }}>
      <AppBar
        onLeftIconButtonTouchTap={handleTouchTapLeftIconButton}
        title={<Title docked={props.docked}>{title}</Title>}
        zDepth={0}
        id="header"
        style={styles.appBar}
        showMenuIconButton={showMenuIconButton}
        iconElementRight={
          isAuthenticated ? (
            <UserMenu
              isTranslating={isTranslating}
              changeLocale={changeLocale}
              signout={signout}
              role={role}
            />
          ) : (
            <GuestMenu isMobile={isMobile} />
          )
        }
      />
      {/* <div style={{ position: 'absolute', margin: 10, left: '50px', color: 'white', top: 0, zIndex: 14000 }}>
          <h1 style={{ display: 'inline' }}>ARASAAC</h1>
        </div> */}
    </div>
  );
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  // we use it both for menu icon and for
  showMenuIconButton: PropTypes.bool.isRequired,
  // será un string
  title: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
  ]),
  docked: PropTypes.bool.isRequired,
  changeLocale: PropTypes.func.isRequired,
  signout: PropTypes.func.isRequired,
  touchTapLeftIconButton: PropTypes.func.isRequired,
  isTranslating: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  role: PropTypes.string,
};

export default Header;
