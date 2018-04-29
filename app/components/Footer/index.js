/**
*
* Footer
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { Row, Col } from 'react-flexbox-grid'
// import { FormattedMessage } from 'react-intl'
// import messages from './messages'

import UnionEuropea from './union-europea-horizontal-logo.png'
import GobiernoAragon from './gobierno-aragon-logo.svg'
import styles from './styles'
import FooterSection from './FooterSection'

const Footer = ({ docked, muiTheme }) => (
  <FooterSection id='footer' color={muiTheme.palette.primary1Color} docked={docked}>
    <Row middle='xs'>
      <Col xs={12} md={8}>
        <p style={styles.p}>
          {'© ARASAAC - Gobierno de Aragón, 2016'}
        </p>
        <p style={styles.p}>{'Code licensed MIT, docs'} <a style={styles.a} href='https://creativecommons.org/licenses/by/3.0/'>{'CC BY 3.0.'}</a>
        </p>
      </Col>
      <Col xs={6} md={2} first='md'>
        <img alt='Arasaac Logo' style={styles.logoGA} src={GobiernoAragon} />
      </Col>
      <Col xs={6} md={2} >
        <img alt='Logo European Union Logo' style={styles.logoUE} src={UnionEuropea} />
      </Col>
    </Row>
  </FooterSection>
)

Footer.propTypes = {
  docked: PropTypes.bool.isRequired,
  muiTheme: PropTypes.object.isRequired
}

export default muiThemeable()(Footer)
