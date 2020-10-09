import React, { Component } from "react";
import PropTypes from "prop-types";
import Checkbox from "material-ui/Checkbox";
import FlatButton from "material-ui/FlatButton";
import { FormattedMessage } from "react-intl";
import Dialog from "material-ui/Dialog";
import LicenseText from "./LicenseText";
import messages from "./messages";

class License extends Component {
  state = {
    isChecked: false,
  };

  readLicense = (event, isChecked) => {
    this.setState({ isChecked });
  };

  handleAccept = () => this.props.closeDialog();

  render() {
    const { isChecked } = this.state;
    const { locale, showDialog } = this.props;

    const actions = [
      <FlatButton
        label={<FormattedMessage {...messages.accept} />}
        primary={true}
        disabled={!isChecked}
        onClick={this.handleAccept}
      />,
    ];
    return (
      <div>
        {showDialog ? (
          <Dialog
            title={
              <p>
                <FormattedMessage {...messages.arasaacLicense} />
              </p>
            }
            actions={actions}
            modal={true}
            open={this.props.open}
            autoScrollBodyContent={true}
          >
            <LicenseText locale={locale} />
            <Checkbox
              label={<FormattedMessage {...messages.confirmLicense} />}
              checked={isChecked}
              onCheck={this.readLicense}
            />
          </Dialog>
        ) : (
          <div>{<LicenseText />}</div>
        )}
      </div>
    );
  }
}

License.propTypes = {
  locale: PropTypes.string.isRequired,
  open: PropTypes.bool,
  closeDialog: PropTypes.func,
  showDialog: PropTypes.bool,
};

export default License;
