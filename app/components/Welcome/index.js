/**
*
* Welcome
*
*/

import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import styles from './styles'
import { LARGE } from 'material-ui/utils/withWidth'
import FullWidthSection from 'components/FullWidthSection'
import ArasaacLogo from './arasaac-logo.svg'
import H1 from 'components/H1'
import H2 from 'components/H2'


const Welcome = ({ width }) => {
  const aragones = (<span style={styles.strong}><FormattedMessage {...messages.aragonese} /> </span>)
  /* modify styles depending on viewport: */
  // styles.h2 = Object.assign({}, styles.h1, styles.h2)
  if (width === LARGE) {
    styles.tagline = Object.assign({}, styles.tagline, styles.taglineWhenLarge)
    styles.h1 = Object.assign({}, styles.h1, styles.h1WhenLarge)
    styles.h2 = Object.assign({}, styles.h2, styles.h2WhenLarge)
  }

  return (
    <FullWidthSection style={styles.root}>
      <img alt='Arasaac logo' style={styles.svgLogo} src={ArasaacLogo} />
      <div style={styles.tagline}>
        <H1>ARA<span style={styles.strong}>SAAC</span></H1>
        <H2>
          <FormattedMessage {...messages.header} values={{ aragones }} />
        </H2>

      </div>
    </FullWidthSection>
  )
}


Welcome.propTypes = {
  width: PropTypes.number.isRequired
}


export default Welcome
