import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import { withRouter } from "react-router";
import messages from "./messages";

class AlertWindow extends PureComponent {
  state = {
    open: true,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    const { router } = this.props;
    this.props.onReset();
    this.setState({ open: false });
  };

  render() {
    const actions = [
      <FlatButton
        label={<FormattedMessage {...messages.ok} />}
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];
    const { title, desc, onSolution, onSolutionText } = this.props;

    if (onSolution) {
      actions.unshift(
        <FlatButton label={onSolutionText} onClick={onSolution} />
      );
    }

    return (
      <Dialog
        title={title}
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        {desc}
      </Dialog>
    );
  }
}

AlertWindow.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  url: PropTypes.string,
  router: PropTypes.any.isRequired,
  onSolution: PropTypes.func,
  onSolutionText: PropTypes.string,
};

export default withRouter(AlertWindow);
