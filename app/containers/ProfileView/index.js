/*
 *
 * profileView
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import View from 'components/View'
// import PersonalData from 'containers/ProfileView/PersonalData'
import LanguageSelector from 'components/LanguageSelector'
import RaisedButton from 'material-ui/RaisedButton'
import { PICTOGRAMS_URL } from 'services/config'
import muiThemeable from 'material-ui/styles/muiThemeable'
import ReadMargin from 'components/ReadMargin'
import { FormattedMessage } from 'react-intl'
import H2 from 'components/H2'
import { logout } from 'containers/App/actions'
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
import api from 'services'
import P from 'components/P'

import ProfileIntro from './ProfileIntro'
import messages from './messages'


class ProfileView extends PureComponent {
  state = {
    showPassword: true,
    errorPassword: false
  }
  componentDidMount() {

  }

  handleChangePassword = async (data) => {
    const password = data.get('password')
    try {
      await api.CHANGE_PASSWORD(password, this.props.token)
      this.setState({ showPassword: false })
    } catch (error) {
      this.setState({ showPassword: false, errorPassword: true })
    }
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
      <View left={true} right={true} top={2} >
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
            <RegisterForm update={true} initialValues={{ name, company, url, email }} />
          </div>

          {/* <PersonalData name={name} email={email} company={company} url={url} /> */}

          <H2 primary={true}>Idioma</H2>
          <LanguageSelector value={userLocale} onChange={null} />

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
  token: PropTypes.string.isRequired
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
  logout: () => {
    dispatch(logout())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(ProfileView))
