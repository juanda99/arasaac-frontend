/*
 *
 * LanguageToggle
 *
 */

import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import LanguageSelector from 'components/LanguageSelector'
import Wrapper from './Wrapper'
import { changeLocale } from '../LanguageProvider/actions'
import { selectLocale } from '../LanguageProvider/selectors'

export class LocaleToggle extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Wrapper>
        <LanguageSelector value={this.props.locale} onChange={this.props.changeLocale} />
      </Wrapper>
    )
  }
}

LocaleToggle.propTypes = {
  changeLocale: React.PropTypes.func,
  locale: React.PropTypes.string
}

const mapStateToProps = createSelector(
  selectLocale(),
  (locale) => ({ locale })
)


export default connect(mapStateToProps, { changeLocale })(LocaleToggle)

