/**
*
* Footer
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import muiThemeable from 'material-ui/styles/muiThemeable'
import SocialLinks from 'components/SocialLinks'
import { IMAGES_URL } from 'services/config'
// import { FormattedMessage } from 'react-intl'
// import messages from './messages'

// import UnionEuropea from './union-europea-horizontal-logo.png'
import styles from './styles'
import FooterSection from './FooterSection'
import A from './A'

const Footer = ({ docked, muiTheme }) => (
  <FooterSection id='footer' color={muiTheme.palette.footerColor} docked={docked}>
    {/* <img alt='Logo European Union Logo' style={styles.logoUE} src={UnionEuropea} /> */}
    <SocialLinks />

    <div>
      <p style={styles.p}>
        {`© ARASAAC - Gobierno de Aragón, ${new Date().getFullYear()}`}
      </p>
      <p style={styles.p}><A href='https://creativecommons.org/licenses/by/3.0/'>Condiciones de uso</A>
      </p>
      <p style={styles.p}><A href='https://creativecommons.org/licenses/by/3.0/'>Política de cookies</A> - <A href='https://creativecommons.org/licenses/by/3.0/'>Aviso legal</A>
      </p>
    </div>

    <div>
      <img alt='Arasaac Logo' style={styles.logoGA} src={`${IMAGES_URL}/gobierno-aragon-logo.svg`} />
    </div>

  </FooterSection>
)

Footer.propTypes = {
  docked: PropTypes.bool.isRequired,
  muiTheme: PropTypes.object.isRequired
}

export default muiThemeable()(Footer)
