/*
 *
 * SignupView
 *
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import api from "services";
import { withRouter } from "react-router";
import View from "components/View";
import { injectIntl, intlShape, FormattedMessage } from "react-intl";
import { RecoverPasswordForm } from "components/Login";
import ConditionalPaper from "components/ConditionalPaper";
import Logo from "components/Logo";
import P from "components/P";
import AlertWindow from "components/AlertWindow";
import messages from "./messages";

class RecoverPasswordView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      sent: false,
    };
  }

  resetError = () => {
    this.setState({ error: "" });
  };

  handleSubmit = async (formData) => {
    const { showProgressBar, hideProgressBar } = this.props;
    try {
      const data = { ...formData.toJS() };
      showProgressBar();
      await api.RESET_USER_PASSWORD(data);
      hideProgressBar();
      this.setState({ sent: true });
    } catch (error) {
      hideProgressBar();
      this.setState({ sent: false, error: error.message });
    }
  };

  render() {
    const { intl } = this.props;
    const { email } = this.props.params;
    const { error, sent } = this.state;
    const { formatMessage } = intl;
    let showError = null;
    if (error === "USER_NOT_EXISTS") {
      showError = (
        <AlertWindow
          title={formatMessage(messages.resetPassword)}
          desc={formatMessage(messages.userNotExists)}
          onReset={this.resetError}
        />
      );
    } else {
      showError = (
        <AlertWindow
          title={formatMessage(messages.resetPassword)}
          desc={formatMessage(messages.passwordNotReset)}
          onReset={this.resetError}
        />
      );
    }
    const renderView = sent ? (
      <div>
        <Logo src="https://static.arasaac.org/pictograms/5432/5432_300.png" />
        <P>
          <FormattedMessage {...messages.passwordResetSend} />
        </P>
      </div>
    ) : (
      <div>
        <RecoverPasswordForm onSubmit={this.handleSubmit} email={email} />
        {error && showError}
      </div>
    );

    return (
      <View>
        <ConditionalPaper>{renderView}</ConditionalPaper>
      </View>
    );
  }
}

RecoverPasswordView.propTypes = {
  intl: intlShape.isRequired,
  params: PropTypes.object.isRequired,
  showProgressBar: PropTypes.func.isRequired,
  hideProgressBar: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  showProgressBar: () => dispatch(showLoading()),
  hideProgressBar: () => dispatch(hideLoading()),
});

export default connect(
  null,
  mapDispatchToProps
)(injectIntl(withRouter(RecoverPasswordView)));
