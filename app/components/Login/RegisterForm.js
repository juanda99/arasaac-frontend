import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import RaisedButton from "material-ui/RaisedButton";
import { Link } from "react-router";
import { reduxForm, Field, propTypes } from "redux-form/immutable";
import { TextField } from "redux-form-material-ui";
import FlatButton from "material-ui/FlatButton";
import Div from "components/Div";
import messages from "./messages";
import { email, url } from "./validate";

// TODO: validate password minlength?????

const styles = {
  checkbox: {
    left: 0,
  },
  text: {
    width: "100%",
  },
  signup: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
  },
  update: {
    marginTop: 20,
  },
};

/* eslint-disable import/no-mutable-exports */
let RegisterForm = class RegisterForm extends Component {
  handleSubmit() {
    // ?????
  }

  componentDidMount() {
    this.firstField // the Field
      .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
      .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
      .focus(); // on TextField
  }

  email = (value) =>
    email(value) ? "" : <FormattedMessage {...messages.invalidEmail} />;

  url = (value) =>
    url(value) ? "" : <FormattedMessage {...messages.invalidUrl} />;

  required = (value) =>
    value == null ? <FormattedMessage {...messages.required} /> : "";

  render() {
    const { handleSubmit, pristine, submitting, update } = this.props;
    /* en las propiedades estaba resetForm y submitting*/
    return (
      <div>
        <Div top={update ? 0 : 2}>
          <form onSubmit={handleSubmit}>
            {/* <Field
              name='name'
              component={TextField}
              ref={(input) => {
                this.firstField = input
              }}
              withRef
              hintText={<FormattedMessage {...messages.hintName} />}
              floatingLabelText={<FormattedMessage {...messages.labelName} />}
              style={{ width: '100%' }}
              validate={this.required}
              autoComplete='name'
            /> */}
            <Field
              name="name"
              type="text"
              ref={(input) => {
                this.firstField = input;
              }}
              withRef
              component={TextField}
              validate={this.required}
              hintText={<FormattedMessage {...messages.hintName} />}
              floatingLabelText={<FormattedMessage {...messages.labelName} />}
              fullWidth
            />
            <Field
              name="email"
              component={TextField}
              hintText={<FormattedMessage {...messages.hintEmail} />}
              floatingLabelText={<FormattedMessage {...messages.labelEmail} />}
              style={{ width: "100%" }}
              validate={[this.required, this.email]}
              autoComplete="email"
            />
            {!update && (
              <Field
                name="password"
                component={TextField}
                type="password"
                hintText={<FormattedMessage {...messages.hintPassword} />}
                value=""
                floatingLabelText={
                  <FormattedMessage {...messages.labelPassword} />
                }
                style={{ width: "100%" }}
                validate={this.required}
                autoComplete="new-password"
              />
            )}
            <Field
              name="company"
              component={TextField}
              hintText={<FormattedMessage {...messages.hintCompany} />}
              floatingLabelText={
                <FormattedMessage {...messages.labelCompany} />
              }
              style={{ width: "100%" }}
              autoComplete="organization"
            />
            <Field
              name="url"
              component={TextField}
              hintText={<FormattedMessage {...messages.hintWebsite} />}
              floatingLabelText={
                <FormattedMessage {...messages.labelWebsite} />
              }
              style={{ width: "100%" }}
              validate={this.url}
            />
            <RaisedButton
              type="submit"
              label={
                update ? (
                  <FormattedMessage {...messages.updateAccount} />
                ) : (
                  <FormattedMessage {...messages.buttonSignUp} />
                )
              }
              primary={true}
              style={update ? styles.update : styles.signup}
              disabled={pristine || submitting}
            />
          </form>
        </Div>
        {!update && (
          <Div top={2}>
            <Link to="/signin">
              <FlatButton
                label={<FormattedMessage {...messages.offerSignin} />}
                secondary={true}
                fullWidth={true}
              />
            </Link>
          </Div>
        )}
      </div>
    );
  }
};
RegisterForm.propTypes = {
  ...propTypes,
  update: PropTypes.bool,
  // resetForm: PropTypes.func.isRequired,
  // submitting: PropTypes.bool.isRequired
};

RegisterForm = reduxForm({
  form: "signup",
  touchOnBlur: false,
  touchOnChange: true,
})(RegisterForm);

export default RegisterForm;
