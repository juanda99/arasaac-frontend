import React from "react";
import PropTypes from "prop-types";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import H2 from "components/H2";
import P from "components/P";
import { FormattedMessage, injectIntl } from "react-intl";
import Checkbox from "material-ui/Checkbox";
import messages from "./messages";

class MaterialConditions extends React.Component {
  state = {
    open: true,
    enableAccept: false,
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAcceptButton = (event, enableAccept) => {
    this.setState({ enableAccept });
  };

  render() {
    const { intl, direction } = this.props;
    const { formatMessage } = intl;
    const actions = [
      <FlatButton
        label={formatMessage(messages["submit"])}
        primary={true}
        disabled={!this.state.enableAccept}
        onClick={this.handleClose}
      />,
    ];

    const isRtl = direction === "rtl";

    return (
      // maxWidth so fixed good in mobile

      <Dialog
        title={formatMessage(messages["materialPublication"])}
        actions={actions}
        modal={true}
        open={this.state.open}
        autoScrollBodyContent={true}
        onRequestClose={this.handleClose}
        contentStyle={isRtl ? { textAlign: "right" } : {}}
        actionsContainerStyle={
          isRtl ? { textAlign: "left" } : { textAlign: "right" }
        }
      >
        <div dir={direction}>
          <P>
            <FormattedMessage {...messages.intro} />
          </P>
          <H2 primary={true}>
            <FormattedMessage {...messages.requirements} />
          </H2>
          <P>
            <FormattedMessage {...messages.requirementsP1} />
          </P>
          <P>
            <FormattedMessage {...messages.requirementsP2} />
          </P>
          <P>
            <FormattedMessage {...messages.requirementsP3} />
          </P>
          <P>
            <FormattedMessage {...messages.requirementsP4} />
          </P>
          <P>
            <FormattedMessage {...messages.requirementsP5} />
          </P>
          <P>
            <FormattedMessage {...messages.requirementsP6} />
          </P>
          <ul
            style={
              isRtl
                ? {
                    marginRight: "20px",
                    listStyleType: "square",
                    fontWeight: 300,
                  }
                : {
                    marginLeft: "20px",
                    listStyleType: "square",
                    fontWeight: 300,
                  }
            }
          >
            <li>
              <P important={true}>
                <FormattedMessage {...messages.standardQuote} />
              </P>

              <em>
                <strong>
                  <FormattedMessage {...messages.pictogramsAuthor} />
                  &nbsp;
                </strong>
                Sergio Palao&emsp;
                <strong>
                  <FormattedMessage {...messages.origin} /> &nbsp;
                </strong>
                ARASAAC (http://arasaac.org)&emsp;
                <strong>
                  <FormattedMessage {...messages.license} />
                  &nbsp;{" "}
                </strong>
                CC (BY-NC-SA)&emsp;
                <strong>
                  <FormattedMessage {...messages.author} /> &nbsp;
                </strong>
                ...
              </em>
            </li>

            <li>
              <P important={true}>
                <FormattedMessage {...messages.translationQuote} />
              </P>
              <P>
                <FormattedMessage {...messages.translationQuoteDesc} />
              </P>

              <em>
                <strong>
                  <FormattedMessage {...messages.pictogramsAuthor} />
                  &nbsp;
                </strong>
                Sergio Palao&emsp;
                <strong>
                  <FormattedMessage {...messages.origin} /> &nbsp;
                </strong>
                ARASAAC (http://arasaac.org)&emsp;
                <strong>
                  <FormattedMessage {...messages.license} />
                  &nbsp;{" "}
                </strong>
                CC (BY-NC-SA)&emsp;
                <strong>
                  <FormattedMessage {...messages.author} /> &nbsp;
                </strong>
                ...&emsp;
                <strong>
                  <FormattedMessage {...messages.translator} /> &nbsp;
                </strong>
                ...
              </em>
            </li>

            <li>
              <P important={true}>
                <FormattedMessage {...messages.adaptationQuote} />
              </P>
              <P>
                <FormattedMessage {...messages.adaptationQuoteDesc} />
              </P>

              <em>
                <strong>
                  <FormattedMessage {...messages.pictogramsAuthor} />
                  &nbsp;
                </strong>
                Sergio Palao&emsp;
                <strong>
                  <FormattedMessage {...messages.origin} /> &nbsp;
                </strong>
                ARASAAC (http://arasaac.org)&emsp;
                <strong>
                  <FormattedMessage {...messages.license} />
                  &nbsp;{" "}
                </strong>
                CC (BY-NC-SA)&emsp;
                <strong>
                  <FormattedMessage {...messages.author} /> &nbsp;
                </strong>
                ...&emsp;
                <strong>
                  <FormattedMessage {...messages.adaptedBy} /> &nbsp;
                </strong>
                ...
              </em>
            </li>
          </ul>

          <H2 primary={true}>
            <FormattedMessage {...messages.suggestions} />
          </H2>
          <P>
            <FormattedMessage {...messages.suggestionsDesc} />
          </P>
          <H2 primary={true}>
            <FormattedMessage {...messages.publication} />
          </H2>
          <P>
            <FormattedMessage {...messages.publicationDesc} />
          </P>
          <Checkbox
            label={<FormattedMessage {...messages.checkRead} />}
            labelPosition="right"
            onCheck={this.handleAcceptButton}
          />
        </div>
      </Dialog>
    );
  }
}

export default injectIntl(MaterialConditions);

MaterialConditions.propTypes = {
  direction: PropTypes.string.isRequired,
};
