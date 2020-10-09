import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl, intlShape } from "react-intl";
import PropTypes from "prop-types";
import View from "components/View";
import RaisedButton from "material-ui/RaisedButton";
import P from "components/P";
import { Link } from "react-router";
import AAC from "components/AAC";
import { makeSelectLocale } from "containers/LanguageProvider/selectors";
import ReadMargin from "components/ReadMargin";
import messages from "./messages";
class IntroAAC extends Component {
  render() {
    const { locale, intl } = this.props;
    const { formatMessage } = intl;
    let renderInfo;
    if (
      locale === "es" ||
      locale === "gl" ||
      locale === "eu" ||
      locale === "ca" ||
      locale === "val"
    ) {
      renderInfo = (
        <P>
          {<FormattedMessage {...messages.infoSpanish} />}
          <Link to="/saac">
            <RaisedButton
              label={formatMessage(messages.inSpanish)}
              style={{ marginLeft: 10 }}
            />
          </Link>
        </P>
      );
    } else if (locale === "en") renderInfo = null;
    else {
      renderInfo = (
        <P>
          {<FormattedMessage {...messages.justSpanish} />}
          <Link to="/saac">
            <RaisedButton
              label={formatMessage(messages.inSpanish)}
              style={{ marginLeft: 10 }}
            />
          </Link>
        </P>
      );
    }
    return (
      <View left={true} right={true}>
        <ReadMargin>
          {renderInfo}
          <AAC />
        </ReadMargin>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  locale: makeSelectLocale()(state),
});

export default connect(mapStateToProps)(injectIntl(IntroAAC));

IntroAAC.propTypes = {
  locale: PropTypes.string.isRequired,
};
