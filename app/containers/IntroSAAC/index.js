import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl, intlShape } from "react-intl";
import PropTypes from "prop-types";
import View from "components/View";
import RaisedButton from "material-ui/RaisedButton";
import P from "components/P";
import { Link } from "react-router";
import SAAC from "components/SAAC";
import { makeSelectLocale } from "containers/LanguageProvider/selectors";
import ReadMargin from "components/ReadMargin";
import messages from "./messages";
class IntroSAAC extends Component {
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
      renderInfo = null;
    } else if (locale === "en") {
      renderInfo = (
        <P>
          {<FormattedMessage {...messages.infoEnglish} />}
          <Link to="/aac">
            <RaisedButton
              label={formatMessage(messages.inEnglish)}
              style={{ marginLeft: 10 }}
            />
          </Link>
        </P>
      );
    } else {
      renderInfo = (
        <P>
          {<FormattedMessage {...messages.justEnglish} />}
          <Link to="/aac">
            <RaisedButton
              label={formatMessage(messages.inEnglish)}
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
          <SAAC />
        </ReadMargin>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  locale: makeSelectLocale()(state),
});

export default connect(mapStateToProps)(injectIntl(IntroSAAC));

IntroSAAC.propTypes = {
  locale: PropTypes.string.isRequired,
};
