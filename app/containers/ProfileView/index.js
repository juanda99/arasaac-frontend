/*
 *
 * profileView
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import View from 'components/View'
import Divider from 'material-ui/Divider'
import LanguageSelector from 'components/LanguageSelector'
import userIsAuthenticated from 'utils/auth'
import { DEFAULT_PROFILE_PICTURE } from 'utils'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import muiThemeable from 'material-ui/styles/muiThemeable'
import ReadMargin from 'components/ReadMargin'
import { FormattedMessage } from 'react-intl'
import H2 from 'components/H2'
import Toggle from 'material-ui/Toggle'
import { RegisterForm, NewPasswordForm } from 'components/Login'
import {
  makeSelectName,
  makeSelectPicture,
  makeSelectPictureProvider,
  makeSelectEmail,
  makeSelectLastLogin,
  makeSelectRole,
  makeSelectTargetLanguages,
  makeSelectCompany,
  makeSelectUrl,
  makeSelectUserLocale,
  makeSelectHasUser,
  makeSelectHasGoogle,
  makeSelectHasFacebook,
  makeSelectSearchLanguage,
  makeSelectViolencePictograms,
  makeSelectSexPictograms,
  makeSelectColorPictograms,
} from 'containers/App/selectors'
import { updateUser } from 'containers/App/actions'
import { changeLocale } from 'containers/LanguageProvider/actions'
import api from 'services'
import P from 'components/P'
import TranslationStatus from 'containers/TranslationStatus'
import { FACEBOOK, FB_CLIENT_TOKEN } from 'utils'
import ProfileIntro from './ProfileIntro'
import messages from './messages'

const styles = {
  toggle: {
    fontWeight: 100,
    width: '90%',
  },
  divider: {
    marginTop: 50,
  },
}

class ProfileView extends PureComponent {
  state = {
    showPassword: true,
    errorPassword: false,
  }

  handleChangePassword = async (data) => {
    const { showProgressBar, hideProgressBar } = this.props
    const password = data.get('password')
    showProgressBar()
    try {
      await api.CHANGE_PASSWORD(password, this.props.token)
      this.setState({ showPassword: false })
      hideProgressBar()
    } catch (error) {
      this.setState({ showPassword: false, errorPassword: true })
      hideProgressBar()
    }
  }

  handleValueChange = (value, paramName) => {
    const { updateUser, token, changeLocale } = this.props
    const user = {}
    user[paramName] = value
    updateUser({ user }, token)
    if (paramName === 'locale') changeLocale(value)
  }

  handleSubmitUser = (values) => {
    const user = values.toJS()
    const { updateUser, token } = this.props
    updateUser({ user }, token)
  }

  renderPassword = () => {
    const { showPassword, errorPassword } = this.state
    if (showPassword) {
      return (
        <div style={{ maxWidth: 400 }}>
          <NewPasswordForm onSubmit={this.handleChangePassword} />
        </div>
      )
    }
    if (errorPassword) {
      return (
        <P style={{ marginRight: 20 }}>
          <FormattedMessage {...messages.errorPassword} />
        </P>
      )
    }
    return (
      <P style={{ marginRight: 20 }}>
        <FormattedMessage {...messages.passwordChanged} />
      </P>
    )
  }

  render() {
    const {
      lastLogin,
      name,
      picture,
      company,
      url,
      email,
      role,
      targetLanguages,
      userLocale,
      hasGoogle,
      hasFacebook,
      pictureProvider,
      muiTheme,
      searchLanguage,
      sex,
      violence,
      color,
    } = this.props

    let profileImage = picture ? picture : DEFAULT_PROFILE_PICTURE
    if (pictureProvider === FACEBOOK && picture) {
      profileImage = `${profileImage}&access_token=${FB_CLIENT_TOKEN}`
    }

    const isRtl = muiTheme.direction === 'rtl'

    return (
      <View left={true} right={true} top={2} bottom={2}>
        <ReadMargin>
          <ProfileIntro
            name={name}
            lastLogin={lastLogin}
            picture={profileImage}
            onPictureChange={(value) =>
              this.handleValueChange(value, 'pictureProvider')
            }
            role={role}
            targetLanguages={targetLanguages}
            isRtl={isRtl}
            hasFacebook={hasFacebook}
            hasGoogle={hasGoogle}
            pictureProvider={pictureProvider}
          />
          <H2 primary={true}>
            <FormattedMessage {...messages.accessData} />
          </H2>
          {this.renderPassword()}

          <div style={styles.divider}>
            <Divider />
          </div>

          <H2 primary={true}>
            <FormattedMessage {...messages.personalData} />
          </H2>
          <div style={{ maxWidth: 400 }}>
            <RegisterForm
              update={true}
              initialValues={{ name, company, url, email }}
              onSubmit={this.handleSubmitUser}
            />
          </div>

          <div style={styles.divider}>
            <Divider />
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flexStart',
            }}
          >
            <div style={{ marginRight: '60px' }}>
              <H2 primary={true}>
                <FormattedMessage {...messages.language} />
              </H2>
              <LanguageSelector
                value={userLocale}
                onChange={(value) => this.handleValueChange(value, 'locale')}
              />
            </div>
            {(role === 'admin' || role === 'translator') && (
              <div style={{ flexGrow: 4 }}>
                <H2 primary={true}>
                  <FormattedMessage {...messages.translationStatus} />
                </H2>
                <TranslationStatus language={userLocale} hideAAC={true} />
              </div>
            )}
          </div>

          <div style={styles.divider}>
            <Divider />
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flexStart',
            }}
          >
            <div style={{ marginRight: '60px' }}>
              <H2 primary={true}>
                <FormattedMessage {...messages.searchPictograms} />
              </H2>
              <LanguageSelector
                value={searchLanguage}
                onChange={(value) =>
                  this.handleValueChange(value, 'searchLanguage')
                }
              />
              <Toggle
                toggled={color}
                onToggle={(e, value) => this.handleValueChange(value, 'color')}
                label={<FormattedMessage {...messages.colorPictograms} />}
                style={styles.toggle}
              />
              <Toggle
                toggled={sex}
                onToggle={(e, value) => this.handleValueChange(value, 'sex')}
                label={<FormattedMessage {...messages.sexPictograms} />}
                style={styles.toggle}
              />
              <Toggle
                toggled={violence}
                onToggle={(e, value) =>
                  this.handleValueChange(value, 'violence')
                }
                label={<FormattedMessage {...messages.violencePictograms} />}
                style={styles.toggle}
              />
            </div>
            <div style={{ flexGrow: 4 }}>
              <H2 primary={true}>
                <FormattedMessage {...messages.translationStatus} />
              </H2>
              <TranslationStatus language={searchLanguage} hideWeb={true} />
            </div>
          </div>
        </ReadMargin>
      </View>
    )
  }
}

ProfileView.propTypes = {
  lastLogin: PropTypes.string,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string,
  company: PropTypes.string,
  url: PropTypes.string,
  role: PropTypes.string.isRequired,
  target: PropTypes.array,
  email: PropTypes.string.isRequired,
  userLocale: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  showProgressBar: PropTypes.func.isRequired,
  hideProgressBar: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  changeLocale: PropTypes.func.isRequired,
  hasGoogle: PropTypes.bool.isRequired,
  hasFacebook: PropTypes.bool.isRequired,
  pictureProvider: PropTypes.string.isRequired,
  searchLanguage: PropTypes.string.isRequired,
  violence: PropTypes.bool.isRequired,
  sex: PropTypes.bool.isRequired,
  color: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  lastLogin: makeSelectLastLogin()(state),
  name: makeSelectName()(state),
  email: makeSelectEmail()(state),
  company: makeSelectCompany()(state),
  url: makeSelectUrl()(state),
  picture: makeSelectPicture()(state),
  pictureProvider: makeSelectPictureProvider()(state),
  userLocale: makeSelectUserLocale()(state),
  role: makeSelectRole()(state),
  token: makeSelectHasUser()(state),
  targetLanguages: makeSelectTargetLanguages()(state),
  hasFacebook: makeSelectHasFacebook()(state),
  hasGoogle: makeSelectHasGoogle()(state),
  searchLanguage: makeSelectSearchLanguage()(state),
  violence: makeSelectViolencePictograms()(state),
  color: makeSelectColorPictograms()(state),
  sex: makeSelectSexPictograms()(state),
})

const mapDispatchToProps = (dispatch) => ({
  showProgressBar: () => dispatch(showLoading()),
  hideProgressBar: () => dispatch(hideLoading()),
  updateUser: (user, token) => dispatch(updateUser.request(user, token)),
  changeLocale: (language) => dispatch(changeLocale(language)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(muiThemeable()(userIsAuthenticated(ProfileView)))
