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
import userIsAuthenticated, { userIsAdmin } from 'utils/auth'
import messages from './messages'
import { uploadMaterial } from './actions'
import { makeSelectUserLocale } from '../App/selectors'

class UploadMaterialView extends PureComponent {

  state = {
    stepIndex: 0,
    showDialog: false,
    dialogText: '',
    progressStatus: 0,
    sending: false
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
    const { activities, areas, authors, files, languages } = formValues
    this.setState({ sending: true })
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
    uploadMaterial(formValues, token)
    /* now we will get status by websockets */
    const socket = openSocket('https://privateapi.arasaac.org')

    const randomSocketEvent = `${Math.random() * 1000}`;
    socket.on('FILE_UPLOAD_STATUS', progressStatus => {
      this.setState({ progressStatus: parseFloat(progressStatus) })
      console.log('loadStatus', progressStatus)
    }
    )
    // get value from 0 to 10000 for socket reference:


  }

  handleClose = () => this.setState({ showDialog: false, dialogText: '' })

  render() {
    const { activities, areas, languages, name, email, picture, _id, intl, language, loading, error } = this.props
    const { showDialog, dialogText, sending, progressStatus } = this.state
    const { formatMessage } = intl
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
  activities: PropTypes.instanceOf(Map),
  areas: PropTypes.instanceOf(Map),
  languages: PropTypes.instanceOf(Map)
}

const mapStateToProps = (state) => ({
  activities: state.getIn(['configuration', 'filtersData', 'activity']),
  areas: state.getIn(['configuration', 'filtersData', 'area']),
  languages: state.getIn(['configuration', 'filtersData', 'language']),
  token: makeSelectHasUser()(state),
  name: makeSelectName()(state),
  email: makeSelectEmail()(state),
  picture: makeSelectPicture()(state),
  language: makeSelectUserLocale()(state),
  _id: makeSelectId()(state),
})

const mapDispatchToProps = (dispatch) => ({
  uploadMaterial: (formData, token) => {
    dispatch(uploadMaterial.request(formData, token))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(userIsAuthenticated(userIsAdmin(injectIntl(UploadMaterialView))))
