/*
 *
 * LanguageToggle
 *
 */

import React from "react";
import PropTypes from "prop-types";
import View from "components/View";
import Helmet from "react-helmet";
import ReadMargin from "components/ReadMargin";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import License from "components/License";
import { changeLocale } from "../LanguageProvider/actions";
import { makeSelectLocale } from "../LanguageProvider/selectors";

export class TermsOfUseView extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { locale } = this.props;
    return (
      <View left={true} right={true} top={1}>
        <Helmet
          title="Terms of use"
          meta={[{ name: "description", content: "ARASAAC terms of use" }]}
        />
        <ReadMargin>
          <License locale={locale} showDialog={false} />
        </ReadMargin>
      </View>
    );
  }
}

TermsOfUseView.propTypes = {
  locale: PropTypes.string,
};

const mapStateToProps = createSelector(makeSelectLocale(), (locale) => ({
  locale,
}));

export default connect(mapStateToProps, { changeLocale })(TermsOfUseView);
