import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import P from 'components/P'
import messages from './messages'

class Address extends Component {
  render() {
    return (
      <div>
        <P>{<FormattedMessage {...messages.addressInfo} />}</P>
        <P>
          <strong>
            Centro Aragonés para la Comunicación Aumentativa y Alternativa -
            ARASAAC
          </strong>
          <br />
          Andador Pilar Cuartero Molinero, 1, 50018 Zaragoza
          <br /> España (Spain)
          <br />
          <a href="tel:+34976736526"> +34 976 73 65 26</a> (10:00am - 2:00pm CET
          - Español/English)
        </P>
      </div>
    )
  }
}

export default Address
