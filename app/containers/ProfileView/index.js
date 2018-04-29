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
import { FormattedDate, FormattedTime } from 'react-intl'
import { selectName, selectPicture, selectLastLogin } from './selectors'

class ProfileView extends PureComponent {
  componentDidMount() {

  }

  render() {
    const { lastLogin, name, picture } = this.props
    console.log(`picture: ${picture}`)

    return (
      <View left={true} right={true}>
        <p>Hooola {name}</p>
        <p>Última conexión:&nbsp;
          <FormattedDate value={lastLogin} day='numeric' month='long' year='numeric' />
          <FormattedTime value={lastLogin} />
        </p>
        <img role='presentation' src={picture} alt={name} />
      </View>
    )
  }
}

ProfileView.propTypes = {
  lastLogin: PropTypes.string,
  name: PropTypes.string,
  picture: PropTypes.string
}

const mapStateToProps = (state) => ({
  lastLogin: selectLastLogin()(state),
  name: selectName()(state),
  picture: selectPicture()(state)

})

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(logout())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(ProfileView))
