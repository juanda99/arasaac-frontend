/*
 *
 * SignupView
 *
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import View from 'components/View'
import { RegisterForm, RegisterOptions } from 'components/Login'
import Paper from 'material-ui/Paper'
import SocialLogin from 'components/SocialLogin'
import Separator from 'components/Separator'
import Logo from 'components/Logo'
import { signup } from './actions'
// import selectRegisterView from './selectors'

const styles = {
  paper: {
    padding: 20,
    width: 400,
    margin: '0 auto'
  }
}

class SignupView extends Component {
  constructor(props) {
    super(props)
    this.state = { showOptions: true }
  }
  handleClick = () => {
    this.setState({ showOptions: !this.state.showOptions })
  }
  handleSubmit = (userData) => {
    console.log(this.props.loading)
    console.log(this.props.error)
    this.props.requestSignup(userData)
    console.log(this.props.loading)
    console.log(this.props.error)
  }

  render() {
    let logo
    let form
    if (this.state.showOptions) {
      form = <RegisterOptions onClick={this.handleClick} />
      logo = <Logo />
    } else {
      form = <RegisterForm onSubmit={this.handleSubmit} />
      logo = null
    }
    return (
      <View>
        <Paper zDepth={2} style={styles.paper}>
          {logo}
          <SocialLogin />
          <Separator />
          {form}
        </Paper>
      </View>
    )
  }
}

/*
const mapStateToProps = selectRegisterView();
*/

SignupView.propTypes = {
  requestSignup: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  const loading = state.getIn(['register', 'loading'])
  const error = state.getIn(['register', 'error'])
  return ({ loading, error })
}

const mapDispatchToProps = (dispatch) => ({
  requestSignup: (userData) => {
    dispatch(signup.request(userData))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupView)
