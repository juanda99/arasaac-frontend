/*
 *
 * profileView
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import View from 'components/View'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { logout } from 'containers/App/actions'
import { RegisterForm } from 'components/Login'
import ProfileIntro from './ProfileIntro'

import {
  makeSelectName,
  makeSelectPicture,
  makeSelectEmail,
  makeSelectLastLogin,
  makeSelectRole,
  makeSelectTargetLanguages,
  makeSelectCompany,
  makeSelectUrl
} from 'containers/App/selectors'

class ProfileView extends PureComponent {
  componentDidMount() {

  }

  render() {
    const { lastLogin, name, picture, company, url, email, role, targetLanguages } = this.props
    return (
      <View left={true} right={true}>
        <ProfileIntro name={name} lastLogin={lastLogin} picture={picture} />
        <div style={{ maxWidth: 400 }}>
          <RegisterForm update={true} initialValues={{ name, company, url, email }} />
        </div>
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
  email: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  lastLogin: makeSelectLastLogin()(state),
  name: makeSelectName()(state),
  email: makeSelectEmail()(state),
  company: makeSelectCompany()(state),
  url: makeSelectUrl()(state),
  picture: makeSelectPicture()(state),
  role: makeSelectRole()(state),
  targetLanguages: makeSelectTargetLanguages()(state)

})

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(logout())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(ProfileView))
