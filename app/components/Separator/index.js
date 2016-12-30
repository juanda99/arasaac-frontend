import React from 'react'
import { FormattedMessage } from 'react-intl'
import Div from 'components/Div'
import messages from './messages'

const styles = {
  separator: {
    textAlign: 'center',
    clear: 'both'
  },
  separatorText: {
    display: 'inlineBlock',
    padding: 8,
    position: 'relative',
    backgroundColor: '#fff'
  },
  separatorLine: {
    margin: '-10px auto 10px'
  }
}

const Separator = () => (
  <Div style={styles.separator}>
    <span style={styles.separatorText}>
      {<FormattedMessage {...messages.or} />}
    </span>
    <hr style={styles.separatorLine} />
  </Div>
)

export default Separator
