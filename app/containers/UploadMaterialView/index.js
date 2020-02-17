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
// import openSocket from 'socket.io-client'
// see https://github.com/react-boilerplate/react-boilerplate/issues/1413
import openSocket from 'socket.io-client/dist/socket.io'
import { Map } from 'immutable'
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
import { uploadMaterial } from './actions'
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
    const { uploadMaterial, intl, token } = this.props
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

    const Authors = authors.filter(author => author._id).map(author => author._id)
    if (authors.length === 0) {
      this.setState({ stepIndex: 0, showDialog: true, dialogText: formatMessage(messages.needAuthor) })
      return
    }
    if (!files) {
      //check if any of the languages does not have files
      const langNeedFiles = languages.some((language => !language.files))
      // check if any language has files
      const langHasFiles = languages.some((language => !!language.files))
      if (langNeedFiles && langHasFiles) {
        this.setState({ showDialog: true, dialogText: formatMessage(messages.needLanguageFiles) })
      } else if (langNeedFiles && !langHasFiles) {
        this.setState({ stepIndex: 2, showDialog: true, dialogText: formatMessage(messages.needFiles) })
      }
    }
    formValues.activities = Activities
    formValues.areas = Areas
    formValues.authors = Authors

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
        if (language.files) {
          language.files.map((langFile) =>
            formData.append(`${language.language}_files`, langFile)
          )
        }
        if (language.screenshots) {
          language.screenshots.map((langFile) =>
            formData.append(`${language.language}_screenshotfiles`, langFile)
          )
        }
        return {
          title: language.title,
          desc: language.desc,
          language: language.language
        }
      })
    }
    formData.append(
      'formData',
      JSON.stringify({ areas, activities, authors, translations })
    )


    // const socket = openSocket('https://privateapi.arasaac.org')

    // // const randomSocketEvent = `${Math.random() * 1000}`;
    // socket.on('FILE_UPLOAD_STATUS', progressStatus => {
    //   this.setState({ progressStatus: parseFloat(progressStatus) })
    //   console.log('loadStatus', progressStatus)
    // })
    // uploadMaterial(formValues, token)


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
      console.log('Done!')
    }).catch(function (error) {
      //handle error
      console.log('error!')
      console.log(response);
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
    console.log('loading', loading)
    console.log('progressStatus', progressStatus)
    const initialValues = { authors: [{ name, email, picture, _id }], languages: [{ language, title: '', desc: '', showLangFiles: false, showLangImages: false }] }
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
              <LinearProgress mode="determinate" value={progressStatus} />
              <H3>Subiendo el material: {progressStatus}%</H3>
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
  // error: makeErrorSelector()(state),
  // loading: makeLoadingSelector()(state),
  _id: makeSelectId()(state),
})

const mapDispatchToProps = (dispatch) => ({
  uploadMaterial: (formData, token) => {
    dispatch(uploadMaterial.request(formData, token))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(userIsAuthenticated(userIsAdmin(injectIntl(UploadMaterialView))))
