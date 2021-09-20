import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import { FormattedMessage, injectIntl } from 'react-intl'
import View from 'components/View'
import TranslationForm from 'components/MaterialForm/TranslationForm'
import { material } from 'containers/MaterialsView/actions'
import LinearProgress from 'material-ui/LinearProgress'
import api from 'services' // just the endpoint
import { PRIVATE_API_ROOT } from 'services/config'
import P from 'components/P'
import { DEFAULT_PROFILE_PICTURE, ARASAAC } from 'utils'
import { Link } from 'react-router'
import {
  makeSelectHasUser,
  makeSelectPicture,
  makeSelectName,
  makeSelectEmail,
  makeSelectId,
  makeSelectRole,
} from 'containers/App/selectors'
import {
  makeLoadingSelector,
  makeErrorSelector,
} from 'containers/MaterialsView/selectors'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import userIsAuthenticated from 'utils/auth'
import messages from '../UploadMaterialView/messages'
import introMessages from './messages'
import { makeSelectUserLocale } from '../App/selectors'
import { updateMaterial } from 'containers/MaterialsView/actions'
import { getMongoDBLanguage } from 'utils'

class UploadTranslationView extends PureComponent {
  state = {
    stepIndex: 0,
    showDialog: false,
    dialogText: '',
    progressStatus: 0,
    sending: false,
    loading: false,
    error: '',
  }

  componentDidMount() {
    const { requestMaterial, params, token, materialData } = this.props
    if (materialData.size === 0) {
      requestMaterial(params.idMaterial, token)
    }
  }
  componentWillReceiveProps(nextProps) {
    const { requestMaterial, params, token } = this.props
    if (params.idMaterial !== nextProps.params.idMaterial) {
      requestMaterial(nextProps.params.idMaterial, token)
    }
  }

  handleChangeStep = (stepIndex) => this.setState({ stepIndex })

  getUserByEmail = async (email) => {
    const { token } = this.props
    return api.GET_USER_BY_EMAIL(email, token)
  }

  handleSubmit(values) {
    const { intl, token, params, name, email } = this.props
    const formValues = values.toJS()
    const { formatMessage } = intl
    const { files, screenshots, languages, authors } = formValues

    const Authors = authors
      .filter((author) => author._id)
      .map((author) => ({ author: author._id, role: 'translator' }))
    if (authors.length === 0) {
      this.setState({
        stepIndex: 0,
        showDialog: true,
        dialogText: formatMessage(messages.needAuthor),
      })
      return
    }

    if (!files) {
      this.setState({
        stepIndex: 1,
        showDialog: true,
        dialogText: formatMessage(messages.needFiles),
      })
      return
    }

    /* try to process it, we use axios to get progress */
    this.setState({ sending: true, loading: true })
    const targetLanguage = languages[0].lang

    const formData = new FormData()
    if (files)
      files.map((file) => formData.append(`${targetLanguage}_files`, file))
    if (screenshots) {
      screenshots.map((screenshot) =>
        formData.append(`${targetLanguage}_screenshots`, screenshot)
      )
    }

    /* try to process it, we use axios to get progress */
    this.setState({ sending: true })

    languages[0].lang = targetLanguage
    languages[0].language = getMongoDBLanguage(targetLanguage)
    languages[0].authors = Authors

    formData.append(
      'formData',
      JSON.stringify({ translations: languages, name, email })
    )

    axios
      .request({
        method: 'POST',
        url: `${PRIVATE_API_ROOT}/materials/translations/${params.idMaterial}`,
        data: formData,
        headers: { Authorization: `Bearer ${token}` },
        onUploadProgress: (ProgressEvent) => {
          this.setState({
            progressStatus: parseInt(
              (ProgressEvent.loaded / ProgressEvent.total) * 100
            ),
          })
        },
      })
      .then((data) => {
        this.setState({
          progressStatus: 100,
          loading: false,
          error: '',
        })
      })
      .catch((error) => {
        //handle error
        this.setState({ error: error.message, loading: false })
      })
  }

  handleClose = () => this.setState({ showDialog: false, dialogText: '' })

  resetForm = () => {
    this.setState({ sending: false, stepIndex: 0 })
  }

  getAuthorsData = (authors) =>
    authors.map((author) => {
      if (author.author.pictureProvider === ARASAAC)
        author.author.picture = DEFAULT_PROFILE_PICTURE
      else
        author.author.picture =
          author.author[author.author.pictureProvider].picture
      return {
        name: author.author.name,
        email: author.author.email,
        picture: author.author.picture,
        _id: author.author._id,
        role: author.role,
      }
    })

  renderContent() {
    const { materialData, loading, intl, role, name, email, picture, _id } =
      this.props
    const { formatMessage } = intl
    if (loading)
      return (
        <P>
          <FormattedMessage {...messages.materialLoading} />
        </P>
      )
    if (materialData.size === 0)
      return (
        <P>
          <FormattedMessage {...messages.materialNotFound} />{' '}
        </P>
      )
    const formData = materialData.toJS()

    const languages = formData.translations.map((translation) => {
      const authors = this.getAuthorsData(translation.authors)
      return { ...translation, authors }
    })
    // add item 'to change' and change order to improve translation
    languages.push({})
    const invertLanguages = languages.reverse()
    const initialValues = {
      authors: [{ name, email, picture, _id, role: 'translator' }],
      languages: invertLanguages,
    }

    return (
      <div>
        <P>
          <FormattedMessage {...introMessages.intro} />{' '}
          <Link to={'/contact-us'}>
            <FormattedMessage {...introMessages.contactus} />
          </Link>
        </P>

        <TranslationForm
          onSubmit={(values) => this.handleSubmit(values)}
          languages={languages}
          onEmailExists={this.getUserByEmail}
          initialValues={initialValues}
          changeStep={this.handleChangeStep}
          stepIndex={this.state.stepIndex}
          isAdmin={role === 'admin'}
        />
      </div>
    )
  }

  render() {
    const { intl, materialData, locale } = this.props
    const { showDialog, dialogText, sending, progressStatus, error, loading } =
      this.state
    const idMaterial = materialData.get('idMaterial')
    const { formatMessage } = intl
    const actions = [
      <FlatButton
        label={formatMessage(messages.close)}
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ]

    return (
      <View left={true} right={true}>
        {!sending ? (
          this.renderContent()
        ) : (
          <div>
            <FormattedMessage {...messages.updatingMaterial} />
            <P>
              <FormattedMessage
                {...messages.progressStatus}
                values={{ progressStatus: `${progressStatus}` }}
              />
            </P>
            <LinearProgress
              mode="determinate"
              value={progressStatus}
              style={{ maxWidth: '600px', height: '6px' }}
            />
            {!loading && (
              <div>
                {error ? (
                  <div>
                    <P>{error}</P>
                    <RaisedButton
                      label={formatMessage(messages.tryAgain)}
                      onClick={this.resetForm}
                    />
                  </div>
                ) : (
                  <div>
                    <P>
                      <FormattedMessage {...messages.updatedMaterial} />
                    </P>
                    <Link to={`/materials/${locale}/${idMaterial}`}>
                      <RaisedButton
                        primary={true}
                        label={formatMessage(messages.showMaterial)}
                        onClick={this.showMaterial}
                      />
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        <Dialog
          title={formatMessage(messages.needReview)}
          actions={actions}
          modal={false}
          open={showDialog}
          onRequestClose={this.handleClose}
        >
          {dialogText}
        </Dialog>
      </View>
    )
  }
}

UploadTranslationView.propTypes = {
  role: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  picture: PropTypes.string,
  language: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  materialData: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const token = makeSelectHasUser()(state)
  const name = makeSelectName()(state)
  const email = makeSelectEmail()(state)
  const picture = makeSelectPicture()(state)
  const language = makeSelectUserLocale()(state)
  const locale = makeSelectLocale()(state)
  const _id = makeSelectId()(state)
  const role = makeSelectRole()(state)
  const materialData =
    state.getIn([
      'materialsView',
      'materials',
      parseInt(ownProps.params.idMaterial, 10),
    ]) || new Map()
  const error = makeErrorSelector()(state)
  return {
    token,
    name,
    email,
    picture,
    language,
    locale,
    _id,
    role,
    materialData,
    error,
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestMaterial: (idMaterial, token) => {
    dispatch(material.request(idMaterial, token))
  },
  updateMaterial: (id, data, token) => {
    dispatch(updateMaterial.request(id, data, token))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(userIsAuthenticated(injectIntl(UploadTranslationView)))
