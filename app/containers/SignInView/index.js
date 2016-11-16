/*
 *
 * SignInView
 *
 */

import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

export class SignInView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title='SignInView'
          meta={[
            { name: 'description', content: 'Description of SignInView' }
          ]}
        />
      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(null, mapDispatchToProps)(SignInView)
