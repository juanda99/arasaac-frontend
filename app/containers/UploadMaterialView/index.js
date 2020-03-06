/*
 *
 * UploadMaterialView
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import View from 'components/View'
import MaterialForm from 'components/MaterialForm'
import LinearProgress from 'material-ui/LinearProgress'
import api from 'services' // just the endpoint
import axios from 'axios'
import {
  makeSelectHasUser,
  makeSelectPicture,
  makeSelectName,
  makeSelectEmail,
  makeSelectId
} from 'containers/App/selectors'
import H3 from 'components/H3'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { PRIVATE_API_ROOT } from 'services/config'
import userIsAuthenticated, { userIsAdmin } from 'utils/auth'
import messages from './messages'
import { makeSelectUserLocale } from '../App/selectors'
// import { makeLoadingSelector, makeErrorSelector } from './selectors'
import activities from 'data/activities'
import areas from 'data/areas'
import languages from 'data/languages'

class UploadMaterialView extends PureComponent {

  state = {
    stepIndex: 0,
    showDialog: false,
    dialogText: '',
    progressStatus: 0,
    sending: false,
    loading: false
  }

  handleChangeStep = (stepIndex) => this.setState({ stepIndex })

  getUserByEmail = async (email) => {
    const { token } = this.props
    return api.GET_USER_BY_EMAIL(email, token)
  }

  handleSubmit(values) {
    const { intl, token } = this.props
    const formValues = values.toJS()
    const { formatMessage } = intl
    // const { activities, areas, authors, files, languages } = formValues
    const { files, screenshots, languages, activities, areas, authors } = formValues
    // change activities, areas from [{key1, value1}, {key2, value2}].. to [key1, key2...]
    const Activities = activities ?
      activities.map((activity) => (activity.value))
      : []
    const Areas = areas ?
      areas.map((area) => (area.value))
      : []

    const Authors = authors.filter(author => author._id).map(author => ({ author: author._id, role: author.role }))
    if (authors.length === 0) {
      this.setState({ stepIndex: 0, showDialog: true, dialogText: formatMessage(messages.needAuthor) })
      return
    }
    if (!files) {
      this.setState({ stepIndex: 2, showDialog: true, dialogText: formatMessage(messages.needFiles) })
      return
    }

    /* try to process it, we use axios to get progress */
    this.setState({ sending: true, loading: true })

    const formData = new FormData()
    let translations

    if (files) files.map((file) => formData.append('files', file))
    if (screenshots) {
      screenshots.map((screenshot) => formData.append('screenshots', screenshot))
    }
    if (languages) {
      translations = languages.map((language) => {
        let customLanguage
        switch (language.language) {
          case 'da':
          case 'nl':
          case 'en':
          case 'fi':
          case 'fr':
          case 'de':
          case 'hu':
          case 'it':
          case 'nb':
          case 'pt':
          case 'ro':
          case 'ru':
          case 'es':
          case 'sv':
          case 'tr':
            customLanguage = language.language
            break;
          default:
            customLanguage = 'none'
            break;
        }

        return {
          title: language.title,
          desc: language.desc,
          language: customLanguage,
          lang: language.language
        }
      })
    }
    formData.append(
      'formData',
      JSON.stringify({ areas: Areas, activities: Activities, authors: Authors, translations })
    )

    axios.request({
      method: "POST",
      url: `${PRIVATE_API_ROOT}/materials`,
      data: formData,
      headers: { Authorization: `Bearer ${token}` },
      onUploadProgress: ProgressEvent => {
        this.setState({
          progressStatus: parseFloat(ProgressEvent.loaded / ProgressEvent.total * 100).toFixed(2),
        })
      }
    }).then(data => {
      this.setState({
        progressStatus: 100,
        loading: false,
        error: ''
      })
    }).catch(function (error) {
      //handle error
      this.setState({ error: error.message })
    });

    // uploadMaterial(formValues, token)
    /* now we will get status by websockets */

    // get value from 0 to 10000 for socket reference:


  }

  handleClose = () => this.setState({ showDialog: false, dialogText: '' })

  render() {
    const { name, email, picture, _id, intl, language } = this.props
    const { showDialog, dialogText, sending, progressStatus, error, loading } = this.state
    const { formatMessage } = intl
    const initialValues = { authors: [{ name, email, picture, _id, role: 'author' }], languages: [{ language, title: '', desc: '', showLangFiles: false, showLangImages: false }] }
    const actions = [
      <FlatButton
        label={formatMessage(messages.close)}
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />
    ];

    return (
      <View left={true} right={true}>
        {!sending ? (
          <MaterialForm
            onSubmit={(values) => this.handleSubmit(values)}
            activities={activities}
            areas={areas}
            languages={languages}
            onEmailExists={this.getUserByEmail}
            initialValues={initialValues}
            changeStep={this.handleChangeStep}
            stepIndex={this.state.stepIndex}
          />
        ) :
          (loading ? (
            <div>
              <H3>Subiendo el material: {progressStatus}%</H3>
              <LinearProgress mode="determinate" value={progressStatus} style={{ maxWidth: '600px', height: '6px' }} />
            </div>
          ) :
            (
              error ? <H3> {error}</H3> : <H3>Material subido correctamente</H3>
            )

          )
        }
        <Dialog
          title={formatMessage(messages.needReview)}
          actions={actions}
          modal={false}
          open={showDialog}
          onRequestClose={this.handleClose}
        >
          {dialogText}
        </Dialog>
      </View >
    )
  }
}

UploadMaterialView.propTypes = {
  uploadMaterial: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  token: makeSelectHasUser()(state),
  name: makeSelectName()(state),
  email: makeSelectEmail()(state),
  picture: makeSelectPicture()(state),
  language: makeSelectUserLocale()(state),
  _id: makeSelectId()(state),
})

export default connect(mapStateToProps)(userIsAuthenticated(userIsAdmin(injectIntl(UploadMaterialView))))
