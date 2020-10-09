import React from "react";
import PropTypes from "prop-types";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import MenuItem from "material-ui/MenuItem";
import muiThemeable from "material-ui/styles/muiThemeable";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router";
import messages from "./messages";

/* eslint-disable jsx-a11y/anchor-has-content */

const UserMenu = ({ isTranslating, changeLocale, muiTheme, signout, role }) => (
  <span id="userMenu" dir="rtl">
    <IconMenu
      iconButtonElement={
        <IconButton>
          <MoreVertIcon color={muiTheme.appBar.textColor} />
        </IconButton>
      }
      targetOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
    >
      <MenuItem
        primaryText={
          <p dir={muiTheme.direction}>
            <FormattedMessage {...messages.userProfile} />
          </p>
        }
        containerElement={<Link to="/profile" />}
      />
      {/* <MenuItem
        primaryText={<FormattedMessage {...messages.userMaterial} />}
        containerElement={<Link to='/usermaterial' />}
      /> */}
      {(role === "admin" || role === "translator") &&
        (!isTranslating ? (
          <MenuItem
            primaryText={
              <p dir={muiTheme.direction}>
                <FormattedMessage {...messages.translateArasaac} />
              </p>
            }
            onClick={changeLocale}
          />
        ) : (
          <MenuItem
            primaryText={
              <p dir={muiTheme.direction}>
                <FormattedMessage {...messages.stopTranslateArasaac} />
              </p>
            }
            onClick={changeLocale}
          />
        ))}
      <MenuItem
        primaryText={
          <p dir={muiTheme.direction}>
            <FormattedMessage {...messages.signout} />
          </p>
        }
        onClick={signout}
      />
    </IconMenu>
  </span>
);

UserMenu.propTypes = {
  isTranslating: PropTypes.bool.isRequired,
  changeLocale: PropTypes.func.isRequired,
  signout: PropTypes.func.isRequired,
  muiTheme: PropTypes.object.isRequired,
  role: PropTypes.string,
};

export default muiThemeable()(UserMenu);
