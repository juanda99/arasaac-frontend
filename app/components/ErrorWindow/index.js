import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { withRouter } from 'react-router'
import messages from './messages'

class ErrorWindow extends PureComponent {
  state = {
    open: true
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    const { url, router } = this.props
    this.props.onReset()
    this.setState({ open: false })
    if (url) router.push('/marca.es')
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
  onReset: PropTypes.func.isRequired,
  url: PropTypes.string,
  router: PropTypes.any.isRequired
}

export default withRouter(ErrorWindow)
