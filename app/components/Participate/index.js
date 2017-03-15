/**
*
* Participate
*
*/

import H3 from 'components/H3'
import FullWidthSection from 'components/FullWidthSection'
import RaisedButton from 'material-ui/RaisedButton'
import { grey200 } from 'material-ui/styles/colors'
import { typography } from 'material-ui/styles'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'

const styles = {
  H3: {
    fontWeight: typography.fontWeightLight,
    margin: '2em'
  },
  button: {
    marginBottom: '6em'
  }
}

const Participate = () => (
  <FullWidthSection color={grey200}>
    <H3 style={styles.H3}><FormattedMessage {...messages.participate} /></H3>
    <RaisedButton
      label={<FormattedMessage {...messages.contact} />}
      primary={true}
      href='https://github.com/callemall/material-ui'
      style={styles.button}
    />
  </FullWidthSection>
)

export default Participate

