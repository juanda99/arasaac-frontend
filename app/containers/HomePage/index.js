/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { PropTypes } from 'react'
import withWidth, { LARGE } from 'material-ui/utils/withWidth'
import FullWidthSection from 'components/FullWidthSection'
// import RaisedButton from 'material-ui/RaisedButton'
import { green900, lightGreen500, darkWhite } from 'material-ui/styles/colors'
import { spacing, typography, lightBaseTheme } from 'material-ui/styles'
// import LanguageSelector from 'containers/LanguageSelector'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import Welcome from 'components/Welcome'


class HomeView extends React.PureComponent {

  static propTypes = {
    width: PropTypes.number.isRequired,
    localeChange: React.PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  homePageHero() {
    const styles = {
      root: {
        backgroundColor: lightGreen500,
        overflow: 'hidden'
      },
      svgLogo: {
        marginLeft: (window.innerWidth * 0.5) - 225,
        width: 300
      },
      tagline: {
        margin: '16px auto 0 auto',
        textAlign: 'center',
        maxWidth: 625
      },
      label: {
        color: lightBaseTheme.palette.primary1Color
      },
      githubStyle: {
        margin: '16px 32px 0px 8px'
      },
      demoStyle: {
        margin: '16px 32px 0px 32px'
      },
      h1: {
        color: darkWhite,
        fontWeight: typography.fontWeightLight
      },
      h2: {
        fontSize: 20,
        lineHeight: '28px',
        paddingTop: 19,
        marginBottom: 13,
        letterSpacing: 0
      },
      nowrap: {
        whiteSpace: 'nowrap'
      },
      strong: {
        color: green900
      },
      taglineWhenLarge: {
        marginTop: 32
      },
      h1WhenLarge: {
        fontSize: 56
      },
      h2WhenLarge: {
        fontSize: 24,
        lineHeight: '32px',
        paddingTop: 16,
        marginBottom: 12
      }
    }

    styles.h2 = Object.assign({}, styles.h1, styles.h2)

    if (this.props.width === LARGE) {
      styles.tagline = Object.assign({}, styles.tagline, styles.taglineWhenLarge)
      styles.h1 = Object.assign({}, styles.h1, styles.h1WhenLarge)
      styles.h2 = Object.assign({}, styles.h2, styles.h2WhenLarge)
    }
    const { localeChange } = this.props
    var aragones = (<span style={styles.strong}><FormattedMessage {...messages.aragonese} /> </span>)
    return (
      <FullWidthSection style={styles.root}>
        <img style={styles.svgLogo} src={ArasaacLogo} />
        <div style={styles.tagline}>
          <h1 style={styles.h1}>ARA<span style={styles.strong}>SAAC</span></h1>
          <h2 style={styles.h2}>
            <FormattedMessage {...messages.heading} values={{ aragones }} />
          </h2>

        </div>
      </FullWidthSection>
    )
  }
  render() {
    const style = {
      paddingTop: spacing.desktopKeylineIncrement
    }
    return (
      <div style={style}>
        <Welcome width={this.props.width} />
      </div>

    )
  }
}

export default (withWidth()(HomeView))
