/**
*
* Footer
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import muiThemeable from 'material-ui/styles/muiThemeable'
import SocialLinks from 'components/SocialLinks'
// import { FormattedMessage } from 'react-intl'
// import messages from './messages'

// import UnionEuropea from './union-europea-horizontal-logo.png'
import GobiernoAragon from './gobierno-aragon-logo.svg'
import styles from './styles'
import FooterSection from './FooterSection'

const Footer = ({ docked, muiTheme }) => (
  <FooterSection id='footer' color={muiTheme.palette.footerColor} docked={docked}>


    <div>
      {/* <img alt='Logo European Union Logo' style={styles.logoUE} src={UnionEuropea} /> */}
      <SocialLinks />
    </div>

    <div>
      <p style={styles.p}>
        {'© ARASAAC - Gobierno de Aragón, 2016'}
      </p>
      <p style={styles.p}>{'Code licensed MIT, docs'} <a style={styles.a} href='https://creativecommons.org/licenses/by/3.0/'>{'CC BY 3.0.'}</a>
      </p>
    </div>

    <div>
      <img alt='Arasaac Logo' style={styles.logoGA} src={GobiernoAragon} />
    </div>

  </FooterSection>
)

Footer.propTypes = {
  docked: PropTypes.bool.isRequired,
  muiTheme: PropTypes.object.isRequired
}

export default muiThemeable()(Footer)
