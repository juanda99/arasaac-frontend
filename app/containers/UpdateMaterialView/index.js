import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import View from 'components/View'
import MaterialForm from 'components/MaterialForm/MaterialFormUpdate'
import { material } from 'containers/MaterialsView/actions'
import api from 'services' // just the endpoint
import P from 'components/P'
import { DEFAULT_PROFILE_PICTURE, ARASAAC } from 'utils'
import { Link } from 'react-router'
import {
  makeSelectHasUser,
  makeSelectPicture,
  makeSelectName,
  makeSelectEmail,
  makeSelectId,
  makeSelectRole
} from 'containers/App/selectors'
import {
  makeLoadingSelector,
  makeErrorSelector
} from 'containers/MaterialsView/selectors'
import { makeSelectLocale } from 'containers/LanguageProvider/selectors'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { userIsAdmin } from 'utils/auth'
import messages from '../UploadMaterialView/messages'
import { makeSelectUserLocale } from '../App/selectors'
import { updateMaterial } from 'containers/MaterialsView/actions'
import activities from 'data/activities'
import areas from 'data/areas'
import filterMessages from 'components/Filters/messages'
import { getMongoDBLanguage } from 'utils'

class UpdateMaterialView extends PureComponent {

  state = {
    stepIndex: 0,
    showDialog: false,
    dialogText: '',
    progressStatus: 0,
    sending: false
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
    const { intl, token, params } = this.props
    const formValues = values.toJS()
    const { formatMessage } = intl
    const { languages, activities, areas, authors, status, lastUpdated } = formValues
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


    /* try to process it, we use axios to get progress */
    this.setState({ sending: true })
    let translations
    if (languages) {
      translations = languages.map((language) => {
        const authors = language.authors
          .map(author => ({ author: author._id, role: 'translator' }))
          .filter(author => !!author.author)

        return {
          title: language.title,
          desc: language.desc,
          language: getMongoDBLanguage(language.lang),
          lang: language.lang,
          authors
        }
      })
    }
    const data = { areas: Areas, activities: Activities, authors: Authors, translations, status, lastUpdated }
    this.props.updateMaterial(params.idMaterial, data, token)
  }

  handleClose = () => this.setState({ showDialog: false, dialogText: '' })

  resetForm = () => {
    this.setState({ sending: false, stepIndex: 0 })
  }

  getAuthorsData = (authors) => authors.map(author => {
    if (author.author.pictureProvider === ARASAAC) author.author.picture = DEFAULT_PROFILE_PICTURE
    else author.author.picture = author.author[author.author.pictureProvider].picture
    return ({
      name: author.author.name,
      email: author.author.email,
      picture: author.author.picture,
      _id: author.author._id,
      role: author.role
    })
  })

  renderContent() {
    const { materialData, loading, params, intl, role, _id } = this.props
    const { formatMessage } = intl
    if (loading) return <P><FormattedMessage {...messages.materialLoading} /></P>
    if (materialData.size === 0) return <P><FormattedMessage {...messages.materialNotFound} /> </P>
    const formData = materialData.toJS()

    const authors = this.getAuthorsData(formData.authors)


    const languages = formData.translations.map(translation => {
      const authors = this.getAuthorsData(translation.authors)
      return { ...translation, authors }
    })

    const listActivities = activities
      .filter((activity) => formData.activities.indexOf(activity.code) !== -1)
      .map(activity => ({ value: parseInt(activity.code, 10), text: formatMessage(filterMessages[activity.text]) }))

    const listAreas = areas
      .filter((area) => formData.areas.indexOf(area.code) !== -1)
      .map(area => ({ value: parseInt(area.code, 10), text: formatMessage(filterMessages[area.text]) }))

    const initialValues = { authors, areas: listAreas, activities: listActivities, languages, status: formData.status }

    return (
      <MaterialForm
        onSubmit={(values) => this.handleSubmit(values)}
        activities={activities}
        areas={areas}
        languages={languages}
        onEmailExists={this.getUserByEmail}
        initialValues={initialValues}
        changeStep={this.handleChangeStep}
        stepIndex={this.state.stepIndex}
        isAdmin={role === 'admin'}
      />
    )
  }


  render() {
    const { intl, materialData, loading, error, locale } = this.props
    const idMaterial = materialData.get('idMaterial')
    const { showDialog, dialogText, sending } = this.state
    const { formatMessage } = intl
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
          this.renderContent()
        ) :
          (loading ? (
            <FormattedMessage {...messages.updatingMaterial} />
          ) :
            (
              error ? (
                <div>
                  <P>{error}</P>
                  <RaisedButton label={formatMessage(messages.tryAgain)} onClick={this.resetForm} />
                </div>

              ) : (
                  <div>
                    <P><FormattedMessage {...messages.updatedMaterial} /></P>
                    <Link to={`/materials/${locale}/${idMaterial}`}>
                      <RaisedButton primary={true} label={formatMessage(messages.showMaterial)} onClick={this.showMaterial} />
                    </Link>

                  </div>

                )
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

UpdateMaterialView.propTypes = {
  role: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  picture: PropTypes.string,
  language: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  materialData: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
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
  const materialData = state.getIn(['materialsView', 'materials', parseInt(ownProps.params.idMaterial, 10)]) || new Map()
  const loading = makeLoadingSelector()(state)
  const error = makeErrorSelector()(state)
  return ({
    token,
    name,
    email,
    picture,
    language,
    locale,
    _id,
    role,
    materialData,
    loading,
    error
  })
}


const mapDispatchToProps = (dispatch) => ({
  requestMaterial: (idMaterial, token) => {
    dispatch(material.request(idMaterial, token))
  },
  updateMaterial: (id, data, token) => {
    dispatch(updateMaterial.request(id, data, token))
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(userIsAdmin(injectIntl(UpdateMaterialView)))
