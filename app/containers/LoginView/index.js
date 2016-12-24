/*
 *
 * LoginView
 *
 */

import React from 'react'
import { connect } from 'react-redux'
import selectLoginView from './selectors'

export class LoginView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
      </div>
    )
  }
}

const mapStateToProps = selectLoginView()

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
