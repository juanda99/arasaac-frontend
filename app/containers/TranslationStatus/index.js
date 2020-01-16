import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import LinearProgress from 'material-ui/LinearProgress'
import { FormattedMessage } from 'react-intl'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'
import api from 'services'
import P from 'components/P'
import messages from './messages'


class TranslationStatus extends PureComponent {

  state = {
    pictogramsValidated: 0,
    totalPictograms: 0,
    arasaacPhrases: 0,
    adminPhrases: 0,
    arasaacTranslated: 0,
    adminTranslated: 0,
    statisticsAvailable: false
  }

  componentDidMount() {
    // we use userLocale if given by props (ProfileView), otherwise locale
    this.updateData(this.props.userLocale || this.props.locale)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userLocale !== this.props.userLocale) {
      // we use userLocale if given by props (ProfileView), otherwise locale
      this.updateData(this.props.userLocale || this.props.locale)
    }
  }


  updateData = async (language) => {
    const { showProgressBar, hideProgressBar } = this.props
    showProgressBar()
    try {
      const translationData = await api.TRANSLATIONS_STATUS(language)
      const { pictogramsValidated, totalPictograms, arasaacPhrases, adminPhrases, arasaacTranslated, adminTranslated } = translationData
      this.setState({ statisticsAvailable: true, pictogramsValidated, totalPictograms, arasaacPhrases, adminPhrases, arasaacTranslated, adminTranslated })
      hideProgressBar()
    } catch (error) {
      this.setState({ statisticsAvailable: false })
      hideProgressBar()
    }
  }


  render() {
    const {
      pictogramsValidated,
      totalPictograms,
      arasaacPhrases,
      adminPhrases,
      arasaacTranslated,
      adminTranslated,
      statisticsAvailable
    } = this.state
    const webTranslated = parseInt(((arasaacTranslated + adminTranslated) / (arasaacPhrases + adminPhrases)) * 100, 10)
    const pictosValidated = parseInt((pictogramsValidated / totalPictograms) * 100, 10)
    const webTranslatedString = webTranslated.toString()
    const pictosValidatedString = pictosValidated.toString()

    return (
      <div>
        {statisticsAvailable ?
          (
            <div>
              <P><FormattedMessage {...messages.webTranslationStatus} values={{ webTranslatedString }} /></P>
              <LinearProgress style={{ height: '5px', maxWidth: '500px' }} mode='determinate' value={webTranslated} />
              <P><FormattedMessage {...messages.pictosTranslationStatus} values={{ pictosValidatedString }} /> </P>
              <LinearProgress style={{ height: '5px', maxWidth: '500px' }} mode='determinate' value={pictosValidated} />
            </div>
          ) : (
            <P><FormattedMessage {...messages.noDataAvailable} /></P>
          )}

      </div>

    )
  }
}

TranslationStatus.propTypes = {
  showProgressBar: PropTypes.func.isRequired,
  hideProgressBar: PropTypes.func.isRequired,
  userLocale: PropTypes.string,
  locale: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  locale: makeSelectLocale()(state)
})

const mapDispatchToProps = (dispatch) => ({
  showProgressBar: () => dispatch(showLoading()),
  hideProgressBar: () => dispatch(hideLoading())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TranslationStatus)
