/*
 *
 * profileView
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import View from 'components/View'
import LanguageSelector from 'components/LanguageSelector'
import userIsAuthenticated from 'utils/auth'

import RaisedButton from 'material-ui/RaisedButton'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { PICTOGRAMS_URL } from 'services/config'
import muiThemeable from 'material-ui/styles/muiThemeable'
import ReadMargin from 'components/ReadMargin'
import { FormattedMessage } from 'react-intl'
import H2 from 'components/H2'
import { RegisterForm, NewPasswordForm } from 'components/Login'
import {
  makeSelectName,
  makeSelectPicture,
  makeSelectEmail,
  makeSelectLastLogin,
  makeSelectRole,
  makeSelectTargetLanguages,
  makeSelectCompany,
  makeSelectUrl,
  makeSelectUserLocale,
  makeSelectHasUser
} from 'containers/App/selectors'
import { updateUser } from 'containers/App/actions'
import { changeLocale } from 'containers/LanguageProvider/actions'
import api from 'services'
import P from 'components/P'
import TranslationStatus from 'containers/TranslationStatus'

import ProfileIntro from './ProfileIntro'
import messages from './messages'


class ProfileView extends PureComponent {
  state = {
    showPassword: true,
    errorPassword: false
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

  handleLanguageChange = (locale) => {
    const { updateUser, token, changeLocale } = this.props
    const user = { locale } // data from user to be changed
    updateUser({ user }, token)
    changeLocale(locale)
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
        <P style={{ marginRight: 20 }} ><FormattedMessage {...messages.errorPassword} /></P>
      )
    }
    return (
      <P style={{ marginRight: 20 }}><FormattedMessage {...messages.passwordChanged} /></P>
    )
  }

  render() {
    const { lastLogin, name, picture, company, url, email, role, targetLanguages, userLocale } = this.props
    const profileImage = picture ? picture : `${PICTOGRAMS_URL}/28307/28307_300.png`

    return (
      <View left={true} right={true} top={2} bottom={2} >
        <ReadMargin>
          <ProfileIntro
            name={name}
            lastLogin={lastLogin}
            picture={profileImage}
            role={role}
            targetLanguages={targetLanguages}
          />
          <H2 primary={true}>
            <FormattedMessage {...messages.accessData} />
          </H2>
          {this.renderPassword()}

          <H2 primary={true}>
            <FormattedMessage {...messages.personalData} />
          </H2>
          <div style={{ maxWidth: 400 }}>
            <RegisterForm update={true} initialValues={{ name, company, url, email }} onSubmit={this.handleSubmitUser} />
          </div>


          <H2 primary={true}>Idioma</H2>
          <LanguageSelector value={userLocale} onChange={this.handleLanguageChange} />
          {(role === 'admin' || role === 'translator') && (
            <div>
              <H2 primary={true}>Translation Status</H2>
              <TranslationStatus language={userLocale} />
            </div>
          )}
        </ReadMargin>

      </View >
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
  changeLocale: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  lastLogin: makeSelectLastLogin()(state),
  name: makeSelectName()(state),
  email: makeSelectEmail()(state),
  company: makeSelectCompany()(state),
  url: makeSelectUrl()(state),
  picture: makeSelectPicture()(state),
  userLocale: makeSelectUserLocale()(state),
  role: makeSelectRole()(state),
  token: makeSelectHasUser()(state),
  targetLanguages: makeSelectTargetLanguages()(state)

})

const mapDispatchToProps = (dispatch) => ({
  showProgressBar: () => dispatch(showLoading()),
  hideProgressBar: () => dispatch(hideLoading()),
  updateUser: (user, token) => dispatch(updateUser.request(user, token)),
  changeLocale: (language) => dispatch(changeLocale(language))
})

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(userIsAuthenticated(ProfileView)))
