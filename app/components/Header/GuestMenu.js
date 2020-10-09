import React from "react";
import PropTypes from "prop-types";
import FlatButton from "material-ui/FlatButton";
import muiThemeable from "material-ui/styles/muiThemeable";
import { Link } from "react-router";
import { FormattedMessage } from "react-intl";
import UserIcon from "material-ui/svg-icons/action/account-box";
import IconButton from "material-ui/IconButton";
import messages from "./messages";

const GuestMenu = (props) => {
  if (props.isMobile) {
    return (
      <div id="loginMenu">
        <Link to="/signin">
          <IconButton
            style={{
              color: props.muiTheme.appBar.textColor,
              marginTop: 0,
              padding: 0,
            }}
            {...this.props}
            tooltip={<FormattedMessage {...messages.signin} />}
          >
            <UserIcon color={"white"} />
          </IconButton>
        </Link>
      </div>
    );
  }
  return (
    <div id="loginMenu">
      <Link to="/signin">
        <FlatButton
          style={{ color: props.muiTheme.appBar.textColor, marginTop: 4 }}
          label={<FormattedMessage {...messages.signin} />}
          {...this.props}
        />
      </Link>
      <Link to="/register">
        <FlatButton
          style={{ color: props.muiTheme.appBar.textColor, marginTop: 4 }}
          label={<FormattedMessage {...messages.register} />}
          {...this.props}
        />
      </Link>
    </div>
  );
};

GuestMenu.propTypes = {
  muiTheme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default muiThemeable()(GuestMenu);
