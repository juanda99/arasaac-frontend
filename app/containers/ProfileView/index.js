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
import { selectAuth } from 'containers/App/selectors'
import { logout } from 'containers/App/actions'
import { FormattedDate, FormattedTime } from 'react-intl'

class ProfileView extends PureComponent {
  componentDidMount() {

  }

  render() {
    const { auth } = this.props
    const lastlogin = auth.get('lastlogin')
    return (
      <View left={true} right={true}>
        <p>Hooola {auth.get('name')}</p>
        <p>Última conexión:&nbsp;
          <FormattedDate value={lastlogin} day='numeric' month='long' year='numeric' />
          <FormattedTime value={lastlogin} />
        </p>
      </View>
    )
  }
}

ProfileView.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}


const mapStateToProps = (state) => ({
  auth: selectAuth(state)
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(logout())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(ProfileView))
