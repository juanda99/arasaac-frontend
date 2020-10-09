import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import View from "components/View";
import { socialLogin } from "containers/App/actions";
import ConditionalPaper from "components/ConditionalPaper";
import SocialLogin from "components/SocialLogin";
import Separator from "components/Separator";
import { RegisterOptions } from "components/Login";
import Logo from "components/Logo";

class SignupOptionsView extends Component {
  render() {
    const { requestAppToken, locale } = this.props;
    return (
      <View>
        <ConditionalPaper>
          <Logo />
          <SocialLogin onSuccess={requestAppToken} locale={locale} />
          <Separator />
          <RegisterOptions onClick={this.handleClick} locale={locale} />
        </ConditionalPaper>
      </View>
    );
  }
}

SignupOptionsView.propTypes = {
  requestAppToken: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const locale = state.getIn(["language", "locale"]);
  return {
    locale,
  };
};

const mapDispatchToProps = (dispatch) => ({
  requestAppToken: (token, socialNetwork, locale) => {
    dispatch(socialLogin.request(token, socialNetwork, locale));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupOptionsView);
