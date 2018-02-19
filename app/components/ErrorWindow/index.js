import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import messages from './messages'


export default class ErrorWindow extends PureComponent {
  state = {
    open: true
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.props.onReset()
    this.setState({ open: false })
  }

  render() {
    const actions = [
      <FlatButton
        label={<FormattedMessage {...messages.ok} />}
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />
    ]
    console.log(this.props)
    const { title, desc } = this.props

    return (
      <Dialog
        title={title}
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        {desc}
      </Dialog>
    )
  }
}

ErrorWindow.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired
}
