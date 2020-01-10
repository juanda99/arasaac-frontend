import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, FormattedDate, FormattedTime } from 'react-intl'
import RaisedButton from 'material-ui/RaisedButton'
import P from 'components/P'
import H3 from 'components/H3'
import messages from './messages'

const ProfileIntro = ({ name, lastLogin, picture }) => (
  <div style={{ display: 'flex' }}>
    <div>
      <img role='presentation' src={picture} alt={name} />
    </div>
    <div style={{ paddingLeft: '2rem' }}>
      <H3>
        <FormattedMessage {...messages.greeting} values={{ name: `${name}` }} />
      </H3>

      <P>
        <FormattedMessage {...messages.lastConnection} />&nbsp;
        <FormattedDate value={lastLogin} day='numeric' month='long' year='numeric' /> &nbsp;
        <FormattedTime value={lastLogin} />
      </P>
      <RaisedButton label={<FormattedMessage {...messages.changePersonalData} />} secondary={true} />
    </div>


  </div>
)

ProfileIntro.propTypes = {
  lastLogin: PropTypes.string,
  name: PropTypes.string,
  picture: PropTypes.string
}

export default ProfileIntro

