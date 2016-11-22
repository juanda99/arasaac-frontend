/**
*
* Footer
*
*/

import React from 'react'
// import { FormattedMessage } from 'react-intl'
// import messages from './messages'

import UnionEuropea from './union-europea-horizontal-logo.png'
import GobiernoAragon from './gobierno-aragon-logo.svg'
import styles from './styles'
import FooterSection from './FooterSection'
import { lightGreen800 } from 'material-ui/styles/colors'
import { Row, Col } from 'react-flexbox-grid'


const Footer = ({ docked }) => (
  <FooterSection color={lightGreen800} docked={docked}>
    <Row middle='xs'>
      <Col xs={12} md={7}>
        <p style={styles.p}>
          {'© ARASAAC - Gobierno de Aragón, 2016'}
        </p>
        <p style={styles.p}>
          {'Designed and built with all the love in the world by'} <a style={styles.a} href='https://github.com/orgs/Arasaac/people'>
            {'the Arasaac team.'}</a>
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
  docked: React.PropTypes.bool.isRequired
}

export default Footer
