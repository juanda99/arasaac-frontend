// based on: https://github.com/anthonyjgrove/react-google-login
import React, { Component } from "react";
import PropTypes from "prop-types";
import { red500, white } from "material-ui/styles/colors";
import { FormattedMessage } from "react-intl";
import RaisedButton from "material-ui/RaisedButton";
import messages from "./messages";
import GoogleIcon from "./icons/GoogleIcon";

/* eslint no-param-reassign: 0 */
// TODO refactor code so no eslint  needed

const styles = {
  googleLogin: {
    width: "100%",
    float: "left",
    marginBottom: 5,
  },
};

class GoogleLogin extends Component {
  static propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onFailure: PropTypes.func.isRequired,
    clientId: PropTypes.string.isRequired,
    offline: PropTypes.bool,
    scope: PropTypes.string,
    redirectUri: PropTypes.string,
    cookiePolicy: PropTypes.string,
    loginHint: PropTypes.string,
    hostedDomain: PropTypes.string,
  };

  static defaultProps = {
    buttonText: "Login with Google",
    scope: "profile email",
    redirectUri: "postmessage",
    cookiePolicy: "single_host_origin",
  };

  constructor(props) {
    super(props);
    this.onBtnClick = this.onBtnClick.bind(this);
    this.state = {
      disabled: true,
    };
  }

  componentDidMount() {
    const {
      clientId,
      scope,
      cookiePolicy,
      loginHint,
      hostedDomain,
    } = this.props;
    ((d, s, id, cb) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      js = d.createElement(s);
      js.id = id;
      js.src = "//apis.google.com/js/client:platform.js";
      fjs.parentNode.insertBefore(js, fjs);
      js.onload = cb;
    })(document, "script", "google-login", () => {
      const params = {
        client_id: clientId,
        cookiepolicy: cookiePolicy,
        login_hint: loginHint,
        hosted_domain: hostedDomain,
        scope,
      };
      window.gapi.load("auth2", () => {
        this.setState({
          disabled: false,
        });
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init(params);
        }
      });
    });
  }

  onBtnClick() {
    const auth2 = window.gapi.auth2.getAuthInstance();
    const { offline, redirectUri, onSuccess, onFailure } = this.props;
    if (offline) {
      const options = {
        redirect_uri: redirectUri,
      };
      auth2.grantOfflineAccess(options).then(
        (res) => {
          onSuccess(res);
        },
        (err) => {
          onFailure(err);
        }
      );
    } else {
      auth2.signIn().then(
        (res) => {
          /*
            offer renamed response keys to names that match use
          */
          const basicProfile = res.getBasicProfile();
          const authResponse = res.getAuthResponse();
          res.googleId = basicProfile.getId();
          res.tokenObj = authResponse;
          res.tokenId = authResponse.id_token;
          res.accessToken = authResponse.access_token;
          res.profileObj = {
            googleId: basicProfile.getId(),
            imageUrl: basicProfile.getImageUrl(),
            email: basicProfile.getEmail(),
            name: basicProfile.getName(),
            givenName: basicProfile.getGivenName(),
            familyName: basicProfile.getFamilyName(),
          };
          onSuccess(res);
        },
        (err) => {
          onFailure(err);
        }
      );
    }
  }

  render() {
    return (
      <RaisedButton
        style={styles.googleLogin}
        backgroundColor={red500}
        label={<FormattedMessage {...messages.google} />}
        icon={<GoogleIcon />}
        labelColor={white}
        onClick={this.onBtnClick}
        disabled={this.state.disabled}
      />
    );
  }
}

export default GoogleLogin;
