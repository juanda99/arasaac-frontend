/*
 *
 * LanguageToggle
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import LanguageSelector from "components/LanguageSelector";
import Wrapper from "./Wrapper";
import { changeLocale } from "../LanguageProvider/actions";
import { makeSelectLocale } from "../LanguageProvider/selectors";

export class LocaleToggle extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  render() {
    const { locale, changeLocale, labelColor } = this.props;
    return (
      <Wrapper>
        <LanguageSelector
          value={locale}
          onChange={changeLocale}
          shortOption={false}
          labelColor={labelColor || ""}
        />
      </Wrapper>
    );
  }
}

LocaleToggle.propTypes = {
  changeLocale: PropTypes.func,
  locale: PropTypes.string,
  labelColor: PropTypes.string,
};

const mapStateToProps = createSelector(makeSelectLocale(), (locale) => ({
  locale,
}));

export default connect(mapStateToProps, { changeLocale })(LocaleToggle);
