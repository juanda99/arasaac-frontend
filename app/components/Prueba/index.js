/**
*
* Prueba
*
*/

import React from 'react'

import { FormattedMessage } from 'react-intl'
import messages from './messages'

class Prueba extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    )
  }
}

export default Prueba
