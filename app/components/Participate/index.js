import React, { Component } from "react";
import PropTypes from "prop-types";
import H3 from "components/H3";
import FullWidthSection from "components/FullWidthSection";
import RaisedButton from "material-ui/RaisedButton";
import { grey200 } from "material-ui/styles/colors";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import styles from "./styles";
import messages from "./messages";

class Participate extends Component {
  handleRouterChangeLink = (value) => this.props.router.push(value);

  render() {
    return (
      <FullWidthSection color={grey200}>
        <H3 style={styles.H3} primary={true}>
          <FormattedMessage {...messages.participate} />
        </H3>

        <RaisedButton
          label={<FormattedMessage {...messages.contact} />}
          primary={true}
          onClick={() => this.handleRouterChangeLink("/contact-us")}
          style={styles.button}
        />
      </FullWidthSection>
    );
  }
}

Participate.propTypes = {
  router: PropTypes.any.isRequired,
};

export default withRouter(Participate);
