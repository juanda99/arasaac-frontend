/*
 *
 * RegisterView
 *
 */

import React, { Component } from 'react'
// import { connect } from 'react-redux'
import View from 'components/View'
import { RegisterForm, RegisterOptions } from 'components/Login'
import Paper from 'material-ui/Paper'
import SocialLogin from 'components/SocialLogin'
import Separator from 'components/Separator'
import Logo from 'components/Logo'
// import selectRegisterView from './selectors'

const styles = {
  paper: {
    padding: 20,
    width: 400,
    margin: '0 auto'
  }
}

class RegisterView extends Component {
  constructor(props) {
    super(props)
    this.state = { showOptions: true }
  }
  handleClick = () => {
    this.setState({ showOptions: !this.state.showOptions })
  }
  handleSubmit = (formData) => {
    console.log(formData.get('username'))
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


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);
*/

export default RegisterView
