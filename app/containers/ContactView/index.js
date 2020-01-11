import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AlertWindow from 'components/AlertWindow'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import api from 'services'
import ConditionalPaper from 'components/ConditionalPaper'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import View from 'components/View'
import ReadMargin from 'components/ReadMargin'
import H3 from 'components/H3'
import Logo from 'components/Logo'
import P from 'components/P'
import { makeSelectName, makeSelectEmail } from 'containers/App/selectors'
import ContactForm from './ContactForm'
import messages from './messages'


class ContactView extends Component {

  state = {
    loading: false,
    error: '',
    sendMessage: false,
    lat: 41.66747,
    lng: -0.89407,
    zoom: 3
  }

  resetError = () => this.setState({ error: '', sendMessage: false })

  showError = () => {
    const { intl } = this.props
    const { formatMessage } = intl
    return (
      <AlertWindow
        title={formatMessage(messages.alertWindowErrorTitle)}
        desc={formatMessage(messages.alertWindowErrorDesc)}
        onReset={this.resetError}
      />
    )
  }


  handleSubmit = async (contactData) => {
    const { showProgressBar, hideProgressBar } = this.props
    try {
      this.setState({ loading: true })
      showProgressBar()
      const data = contactData.toJS()
      await api.CONTACTFORM_REQUEST(data)
      hideProgressBar()
      this.setState({ loading: false, sendMessage: true })
    } catch (error) {
      hideProgressBar()
      this.setState({ error: error.message, loading: false })
    }
  }


  render() {
    const { error, sendMessage, loading } = this.state
    const pictos = [
      6972,
      7291,
      7027,
      7283,
      7005,
      6979,
      7241,
      7248,
      7189,
      7188,
      7025
    ]
    const idPictogram = pictos[Math.floor(Math.random() * pictos.length)]
    const { name, email } = this.props

    const renderView = sendMessage ? (
      <ConditionalPaper>
        <Logo src='https://static.arasaac.org/pictograms/5432/5432_300.png' />
        <P>
          <FormattedMessage {...messages.sendMessage} />
        </P>
      </ConditionalPaper>
    ) : (
        <div>
          {loading ? (
            <H3>
              <FormattedMessage {...messages.sendingMessage} />
            </H3>
          ) : (
              <ContactForm initialValues={{ name, email }} onSubmit={this.handleSubmit} idPictogram={idPictogram} pictograms={pictos} />
            )
          }

          {error && this.showError()}
        </div >
      )
    return (
      <View left={true} right={true} bottom={2}>
        <ReadMargin>
          <P><FormattedMessage {...messages.formIntro} /></P>
          {renderView}
        </ReadMargin>

      </View >
    )
  }
}

ContactView.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  intl: intlShape.isRequired,
  showProgressBar: PropTypes.func.isRequired,
  hideProgressBar: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  name: makeSelectName()(state),
  email: makeSelectEmail()(state)

})

const mapDispatchToProps = (dispatch) => ({
  showProgressBar: () => dispatch(showLoading()),
  hideProgressBar: () => dispatch(hideLoading())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(ContactView))
