/**
*
* Welcome
*
*/


import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { lightGreen500 } from 'material-ui/styles/colors'
import muiThemeable from 'material-ui/styles/muiThemeable'
import FullWidthSection from 'components/FullWidthSection'
import H1 from 'components/H1'
import P from 'components/P'
import LocaleToggle from 'containers/LocaleToggle'
import RaisedButton from 'material-ui/RaisedButton'
import messages from './messages'
import { purgeStoredState } from 'redux-persist-immutable'

const Welcome = ({ theme, muiTheme }) => {
  const style = theme === 'DARK' ? { color: 'white' } : { color: 'black' }
  return (
    <FullWidthSection color={muiTheme.palette.welcomeColor}>
      <div style={{ paddingTop: '1em', paddingBottom: '1.5em' }}>
        {/* <H1 center={true} style={style}> {<FormattedMessage {...messages.welcome} />}</H1> */}
        <P>Choose your language:</P>
        <LocaleToggle />
      </div>
    </FullWidthSection>
  )
}

Welcome.propTypes = {
  theme: PropTypes.string.isRequired,
  muiTheme: PropTypes.object.isRequired
}

export default muiThemeable()(Welcome)
