import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Checkbox from 'material-ui/Checkbox'
import FlatButton from 'material-ui/FlatButton'
import { STORAGE_URL } from 'services/config'
import { FormattedMessage, FormattedDate, FormattedTime } from 'react-intl'
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

  handleClose = () => {
    const catalogURL = `${STORAGE_URL}/catalog_${this.props.language}.zip`
    this.props.closeDialog()
  }

  handleDownload = () => {
    const catalogURL = `${STORAGE_URL}/catalog_${this.props.language}.zip`
    window.location = catalogURL
    this.props.closeDialog()
  }

  render() {
    const { isChecked } = this.state
    const { open, locale } = this.props

    const actions = [
      <FlatButton
        label={<FormattedMessage {...messages.cancel} />}
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label={<FormattedMessage {...messages.download} />}
        primary={true}
        disabled={!isChecked}
        onClick={this.handleDownload}
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
  language: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired
}

export default License
