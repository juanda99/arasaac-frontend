import React from 'react'
import PropTypes from 'prop-types'
import {
  FormattedMessage,
  FormattedDate,
  FormattedTime,
  injectIntl,
} from 'react-intl'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import P from 'components/P'
import H3 from 'components/H3'
import { ARASAAC, GOOGLE, FACEBOOK } from 'utils'
import messages from './messages'

const ProfileIntro = ({
  name,
  lastLogin,
  picture,
  role,
  isRtl,
  hasFacebook,
  hasGoogle,
  intl,
  pictureProvider,
  onPictureChange,
}) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
    <div style={{ marginRight: 20 }}>
      <img
        role="presentation"
        src={picture}
        alt={name}
        style={{ width: '230px', height: '230px' }}
      />
    </div>
    <div>
      <H3>
        <FormattedMessage {...messages.greeting} values={{ name: `${name}` }} />
      </H3>

      <P>
        <FormattedMessage {...messages.lastLogin} />
        &nbsp;
        <FormattedDate
          value={lastLogin}
          day="numeric"
          month="long"
          year="numeric"
        />{' '}
        &nbsp;
        <FormattedTime value={lastLogin} />
      </P>

      <SelectField
        style={isRtl ? { textAlign: 'right' } : { textAlign: 'left' }}
        value={pictureProvider}
        onChange={(e, index, value) => onPictureChange(value)}
        iconStyle={isRtl ? { right: '', left: 0 } : {}}
        floatingLabelText={'Choose your profile picture'}
      >
        <MenuItem
          key="default"
          value={ARASAAC}
          primaryText={intl.formatMessage(messages['arasaacProfilePicture'])}
        />
        <MenuItem
          key="google"
          disabled={!hasGoogle}
          value={GOOGLE}
          primaryText={intl.formatMessage(messages['googleProfilePicture'])}
        />
        <MenuItem
          key="facebook"
          disabled={!hasFacebook}
          value={FACEBOOK}
          primaryText={intl.formatMessage(messages['facebookProfilePicture'])}
        />
      </SelectField>

      <P>
        <FormattedMessage {...messages.currentRole} />{' '}
        {!!role && <FormattedMessage {...messages[role]} />}
      </P>
      {/* {role === 'user' &&
        (
          <Link to='/contact-us'>
            <RaisedButton label={<FormattedMessage {...messages.upgradeRole} />} secondary={true} />
          </Link>
        )} */}
    </div>
  </div>
)

ProfileIntro.propTypes = {
  lastLogin: PropTypes.string,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  pictureProvider: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  targetLanguages: PropTypes.arrayOf(PropTypes.string),
  isRtl: PropTypes.bool.isRequired,
  hasFacebook: PropTypes.bool.isRequired,
  hasGoogle: PropTypes.bool.isRequired,
  onPictureChange: PropTypes.func.isRequired,
}

export default injectIntl(ProfileIntro)
