import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Checkbox from 'material-ui/Checkbox'
import FlatButton from 'material-ui/FlatButton'
import { FormattedMessage } from 'react-intl'
import Dialog from 'material-ui/Dialog'
import EsLicense from './EsLicense'
import EnLicense from './EnLicense'
import messages from './messages'

class License extends Component {
  state = {
    isChecked: false
  }

  readLicense = (event, isChecked) => {
    this.setState({ isChecked })
  }

  handleAccept = () => this.props.closeDialog()


  render() {
    const { isChecked } = this.state
    const { locale, open } = this.props

    const actions = [
      <FlatButton
        label={<FormattedMessage {...messages.accept} />}
        primary={true}
        disabled={!isChecked}
        onClick={this.handleAccept}
      />
    ]
    return (
      <Dialog
        title={
          <p>
            <FormattedMessage {...messages.arasaacLicense} />
          </p>
        }
        actions={actions}
        modal={true}
        open={open}
        autoScrollBodyContent={true}
      >
        {locale === 'es' ? <EsLicense /> : <EnLicense />}
        <Checkbox
          label={<FormattedMessage {...messages.confirmLicense} />}
          checked={isChecked}
          onCheck={this.readLicense}
        />
      </Dialog>
    )
  }
}

License.propTypes = {
  locale: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired
}

export default License
