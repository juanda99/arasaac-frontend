import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Div from "components/Div";
import RaisedButton from "material-ui/RaisedButton";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FormattedMessage } from "react-intl";
import { blue500, white } from "material-ui/styles/colors";
import GoogleLogin from "./GoogleLogin";
import messages from "./messages";
import FacebookIcon from "./icons/FacebookIcon";

const styles = {
  facebookButton: {
    float: "right",
    width: "100%",
    marginBottom: 10,
    top: -10,
  },
};

class SocialLogin extends PureComponent {
  /* eslint-disable no-console */
  responseFacebook = (response) => {
    // one we get facebook token we ask for our app token
    const token = response.accessToken;
    this.props.onSuccess(token, "facebook", this.props.locale);
  };

  success = (response) => {
    const token = response.accessToken;
    this.props.onSuccess(token, "google", this.props.locale);
  };

  error = (response) => {
    console.error(response);
  };

  render() {
    return (
      <Div top={2}>
        <FacebookLogin
          appId="1687810071473822"
          autoLoad={false}
          fields="name,email,picture"
          callback={this.responseFacebook}
          render={(renderProps) => (
            <RaisedButton
              onClick={renderProps.onClick}
              style={styles.facebookButton}
              backgroundColor={blue500}
              label={<FormattedMessage {...messages.facebook} />}
              icon={<FacebookIcon />}
              labelColor={white}
            />
          )}
        ></FacebookLogin>
        <GoogleLogin
          clientId={
            "856321241205-djlltqe6cpo9vm3hp392giboofdp44ha.apps.googleusercontent.com"
          }
          onSuccess={this.success}
          onFailure={this.error}
          offline={false}
        />
      </Div>
    );
  }
}

SocialLogin.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

export default SocialLogin;
