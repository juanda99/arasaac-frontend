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


const Footer = () => (
  <footer style={styles.footer} className='container-fluid'>
    <div className='row middle-sm middle-xs' style={styles.copyright}>
      <div className='col-md-7 col-xs-12'>
        <p style={styles.p}>
          {'© ARASAAC - Gobierno de Aragón, 2016'}</p><p style={styles.p}>
            {'Designed and built with all the love in the world by'} <a style={styles.a} href='https://github.com/orgs/Arasaac/people'>
              {'the Arasaac team.'}</a></p>
        <p style={styles.p}>{'Code licensed MIT, docs'} <a style={styles.a} href='https://creativecommons.org/licenses/by/3.0/'>{'CC BY 3.0.'}</a>
        </p>
      </div>
      <div className='col-md-2 col-xs-6 first-md'>
        <img alt='Arasaac Logo' style={styles.logoGA} src={GobiernoAragon} />
      </div>

      <div className='col-md-2 col-xs-6'>
        <img alt='European Union logo' style={styles.logoUE} src={UnionEuropea} />
      </div>
    </div>
  </footer>
)

export default Footer
