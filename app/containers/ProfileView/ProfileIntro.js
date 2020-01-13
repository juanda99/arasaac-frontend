import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, FormattedDate, FormattedTime } from 'react-intl'
import P from 'components/P'
import H3 from 'components/H3'
import RaisedButton from 'material-ui/RaisedButton'
import messages from './messages'

const ProfileIntro = ({ name, lastLogin, picture, role }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
    <div style={{ marginRight: 20 }}>
      <img role='presentation' src={picture} alt={name} />
    </div>
    <div>
      <H3>
        <FormattedMessage {...messages.greeting} values={{ name: `${name}` }} />
      </H3>

      <P>
        <FormattedMessage {...messages.lastLogin} />&nbsp;
        <FormattedDate value={lastLogin} day='numeric' month='long' year='numeric' /> &nbsp;
        <FormattedTime value={lastLogin} />
      </P>

      <P>Current role: <FormattedMessage {...messages[role]} /></P>
      {role !== 'user' && <RaisedButton label={<FormattedMessage {...messages.upgradeRole} />} secondary={true} />}


    </div>
  </div>
)

ProfileIntro.propTypes = {
  lastLogin: PropTypes.string,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  targetLanguages: PropTypes.arrayOf(PropTypes.string)
}


export default ProfileIntro

