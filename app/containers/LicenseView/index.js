/*
 *
 * LanguageToggle
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import License from 'components/License'
import { changeLocale } from '../LanguageProvider/actions'
import { makeSelectLocale } from '../LanguageProvider/selectors'

export class LicenseView extends React.PureComponent {

  state = {
    open: true
  }

  closeDialog = () => {
    this.setState({ open: false })
    console.log('oooookkkkkk')
  }

  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { locale } = this.props
    const { open } = this.state
    console.log(open, 'open')
    return (
      <License locale={locale} open={open} closeDialog={this.closeDialog} />
    )
  }
}

LicenseView.propTypes = {
  locale: PropTypes.string
}

const mapStateToProps = createSelector(
  makeSelectLocale(),
  (locale) => ({ locale })
)

export default connect(
  mapStateToProps,
  { changeLocale }
)(LicenseView)
