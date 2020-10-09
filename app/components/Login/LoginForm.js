import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router";
import {
  reduxForm,
  Field,
  propTypes,
  formValueSelector,
} from "redux-form/immutable";
import { connect } from "react-redux";
import { TextField } from "redux-form-material-ui";
import EmailIcon from "material-ui/svg-icons/communication/email";
import RaisedButton from "material-ui/RaisedButton";
import { Row, Col } from "react-flexbox-grid";
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
  signinButton: {
    width: "100%",
  },
  forgotPassword: {
    marginTop: 0,
    textAlign: "right",
  },
};

// based on: https://github.com/erikras/redux-form-material-ui/blob/master/example/src/Form.js
/* eslint-disable import/no-mutable-exports */
let LoginForm = class LoginForm extends Component {
  componentDidMount() {
    this.firstField // the Field
      .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
      .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
      .focus(); // on TextField
  }

  email = (value) =>
    email(value) ? "" : <FormattedMessage {...messages.invalidEmail} />;

  required = (value) =>
    value == null ? <FormattedMessage {...messages.required} /> : "";

  render() {
    const { handleSubmit, submitting, pristine, username } = this.props;
    // const emailLink = email(username) !== 'Invalid'
    const recoverLink = email(username)
      ? `/recoverpassword/${username}`
      : "/recoverpassword/";
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Div top={2}>
            <Field
              name="username"
              component={TextField}
              ref={(input) => {
                this.firstField = input;
              }}
              withRef
              style={styles.text}
              hintText={<FormattedMessage {...messages.email} />}
              floatingLabelText={<FormattedMessage {...messages.user} />}
              validate={[this.required, this.email]}
            />
            <Field
              name="password"
              component={TextField}
              type="password"
              style={styles.text}
              hintText={<FormattedMessage {...messages.password} />}
              floatingLabelText={<FormattedMessage {...messages.password} />}
              validate={this.required}
            />
          </Div>
          <Div top={2}>
            <RaisedButton
              style={styles.signinButton}
              label={<FormattedMessage {...messages.signin} />}
              primary={true}
              type="submit"
              disabled={pristine || submitting}
            />
          </Div>

          <Div top={2}>
            <Row>
              <Col xs={6} />
              <Col xs={6}>
                <Link to={recoverLink}>
                  <p style={styles.forgotPassword}>
                    {<FormattedMessage {...messages.forgotPassword} />}
                  </p>
                </Link>
              </Col>
            </Row>
          </Div>

          <Div top={2} style={{ position: "relative" }}>
            <p>{<FormattedMessage {...messages.offerAccount} />}</p>

            <Link to="/register">
              <RaisedButton
                style={styles.register}
                label={<FormattedMessage {...messages.signup} />}
                secondary={true}
                icon={<EmailIcon />}
              />
            </Link>
          </Div>
        </form>
      </div>
    );
  }
};

LoginForm.propTypes = {
  ...propTypes,
};
LoginForm = reduxForm({
  form: "signin",
  touchOnBlur: false,
  touchOnChange: true,
  // fields
})(LoginForm);

const selector = formValueSelector("signin");

LoginForm = connect((state) => ({
  // can select values individually
  username: selector(state, "username"),
}))(LoginForm);

export default LoginForm;
