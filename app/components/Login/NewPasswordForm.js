import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { reduxForm, Field, propTypes } from "redux-form/immutable";
import { TextField } from "redux-form-material-ui";
import KeyIcon from "material-ui/svg-icons/communication/vpn-key";
import RaisedButton from "material-ui/RaisedButton";
import P from "components/P";
import Div from "components/Div";
import messages from "./messages";
import { email } from "./validate";

const styles = {
  checkbox: {
    left: 0,
  },
  text: {
    width: "100%",
  },
  register: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  signinButton: {},
  forgotPassword: {
    marginTop: 0,
    textAlign: "right",
  },
};

/* eslint-disable import/no-mutable-exports */
let NewPasswordForm = class NewPasswordForm extends Component {
  state = { errors: false };

  componentWillReceiveProps(nextProps) {
    if (nextProps.invalid) {
      this.setState({ errors: true });
    } else {
      this.setState({ errors: false });
    }
  }

  email = (value) =>
    email(value) ? "" : <FormattedMessage {...messages.invalidEmail} />;

  required = (value) =>
    value == null ? <FormattedMessage {...messages.required} /> : "";

  render() {
    const { handleSubmit, submitting, pristine, email } = this.props;
    this.firstField = email;
    return (
      <div>
        <P>{<FormattedMessage {...messages.changePasswordInfo} />}</P>
        <form onSubmit={handleSubmit}>
          <Div>
            <Field
              name="password"
              component={TextField}
              type="password"
              hintText={<FormattedMessage {...messages.hintNewPassword} />}
              value=""
              floatingLabelText={
                <FormattedMessage {...messages.labelPassword} />
              }
              style={{ width: "100%" }}
              validate={this.required}
              autoComplete="new-password"
            />
          </Div>
          <Div top={2}>
            <RaisedButton
              style={styles.signinButton}
              label={<FormattedMessage {...messages.changePassword} />}
              primary={true}
              icon={<KeyIcon />}
              type="submit"
              disabled={this.state.errors || submitting}
            />
          </Div>
        </form>
      </div>
    );
  }
};

NewPasswordForm.propTypes = {
  ...propTypes,
};
NewPasswordForm = reduxForm({
  form: "newPassword",
  touchOnBlur: false,
  touchOnChange: true,
  // enableReinitialize: true
  // fields
})(NewPasswordForm);

export default NewPasswordForm;
