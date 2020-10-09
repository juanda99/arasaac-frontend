/*
 *
 * LoginView
 *
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import View from "components/View";
import { LoginForm } from "components/Login";
import SocialLogin from "components/SocialLogin";
import Separator from "components/Separator";
import Logo from "components/Logo";
import AlertWindow from "components/AlertWindow";
import { injectIntl, intlShape } from "react-intl";
import { login, socialLogin, resetError } from "containers/App/actions";
import ConditionalPaper from "components/ConditionalPaper";
import messages from "./messages";

const handleSubmit = (requestLogin, formData) => {
  // this.props.login.request('pepito', 'password')
  const user = formData.get("username");
  const password = formData.get("password");
  requestLogin(user, password);
};

class LoginView extends Component {
  render() {
    const {
      error,
      requestLogin,
      resetError,
      requestAppToken,
      intl,
      locale,
    } = this.props;
    const { formatMessage } = intl;
    let showError = null;
    if (error === "Failed to fetch") {
      showError = (
        <AlertWindow
          title={formatMessage(messages.authentication)}
          desc={formatMessage(messages.communicationError)}
          onReset={resetError}
        />
      );
    } else if (error) {
      showError = (
        <AlertWindow
          title={formatMessage(messages.authentication)}
          desc={formatMessage(messages.invalidUser)}
          onReset={resetError}
        />
      );
    }
    return (
      <View>
        {showError}
        <ConditionalPaper>
          <Logo />
          <SocialLogin onSuccess={requestAppToken} locale={locale} />
          <Separator />
          <LoginForm
            onSubmit={(formData) => handleSubmit(requestLogin, formData)}
            message={error}
          />
        </ConditionalPaper>
      </View>
    );
  }
}

LoginView.propTypes = {
  requestLogin: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  resetError: PropTypes.func.isRequired,
  requestAppToken: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  locale: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const error = state.getIn(["auth", "error"]);
  const locale = state.getIn(["language", "locale"]);
  return {
    error,
    locale,
  };
};

const mapDispatchToProps = (dispatch) => ({
  requestLogin: (username, password) => {
    dispatch(login.request(username, password));
  },
  resetError: () => {
    dispatch(resetError());
  },
  requestAppToken: (token, socialNetwork, locale) => {
    dispatch(socialLogin.request(token, socialNetwork, locale));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(LoginView));
