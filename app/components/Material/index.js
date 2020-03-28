import React, { Component } from 'react'
import PropTypes from 'prop-types'
import H2 from 'components/H2'
import H3 from 'components/H3'
import ShareBar from 'components/ShareBar'
import Divider from 'components/Divider'
import { Link } from 'react-router'
import FlatButton from 'material-ui/FlatButton'
import Chip from 'material-ui/Chip'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import EditIcon from 'material-ui/svg-icons/image/edit'
import VisibilityIcon from 'material-ui/svg-icons/action/visibility'
import VisibilityOffIcon from 'material-ui/svg-icons/action/visibility-Off'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import Avatar from 'material-ui/Avatar'
import Ribbon from 'components/Ribbon'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import ActivityIcon from 'material-ui/svg-icons/action/input'
import AreaIcon from 'material-ui/svg-icons/social/school'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Download from 'material-ui/svg-icons/action/get-app'
import { FormattedMessage, injectIntl } from 'react-intl'
import RaisedButton from 'material-ui/RaisedButton'
import ImageSlider from 'components/ImageSlider'
import Dialog from 'material-ui/Dialog'
import muiThemeable from 'material-ui/styles/muiThemeable'
import P from 'components/P'
import activities from 'data/activities'
import areas from 'data/areas'
import classificationMessages from 'components/Filters/messages'
import { MATERIALS_URL } from 'services/config'
import langMessages from 'components/LanguageSelector/messages'
import { DEFAULT_PROFILE_PICTURE, ARASAAC, NOT_PUBLISHED, PUBLISHED, PENDING } from 'utils'
import messages from './messages'

const styles = {
  desc: {
    flexGrow: 3,
    width: '500px',
    padding: '2rem',
    textAlign: 'justify'
  },
  chip: {
    margin: '4px'
  },
  slides: {
    flexGrow: 1,
    width: '600px'
  },
  snippet: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    flexWrap: 'wrap-reverse',
    position: 'relative'
  },
  button: {
    margin: '0 auto'
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  actionBtn: {
    margin: '5px'
  }
}


class Material extends Component {
  state = {
    currentTranslation: this.props.material.get('translations').get(0),
    languages: this.props.material.get('translations').map(translation => translation.get('lang')),
    showDiaglog: false
  }

  handleChange = (event, value) => this.updateByLanguage(value)

  updateByLanguage = (locale) => {
    const { material } = this.props
    const { currentTranslation } = this.state
    const translation = material.get('translations').filter(translation => translation.get('lang') === locale)
    if (translation.size && currentTranslation.get('lang') !== locale) {
      this.setState({ currentTranslation: translation.get(0) })
    }
  }

  componentDidMount() {
    /* check if locale has language, otherwise, use first material language */
    const { locale } = this.props
    this.updateByLanguage(locale)
  }

  componentWillUpdate(nextProps, nextState) {

  }

  handlePublish = (e, publish) => {
    // e.preventDefault()
    e.stopPropagation()
    const { publishMaterial, material } = this.props
    const idMaterial = material.get('idMaterial')
    publishMaterial(idMaterial, publish)
  }

  handleBeforeRemove = (e) => {
    e.stopPropagation()
    this.setState({ showDialog: true })
  }

  handleClose = () => this.setState({ showDialog: false })

  handleRemove = () => {
    this.setState({ showDialog: false })
    const { removeMaterial, material } = this.props
    const idMaterial = material.get('idMaterial')
    removeMaterial(idMaterial)
  }

  renderActionButtons = () => {
    const { showActionButtons, material } = this.props
    const idMaterial = material.get('idMaterial')
    return showActionButtons ? (
      <span>
        <Link to={`/materials/update/${idMaterial}`} >
          <FloatingActionButton mini={true} style={styles.actionBtn}>
            <EditIcon />
          </FloatingActionButton>
        </Link>
        {
          material.get('status') !== PUBLISHED ? (
            <FloatingActionButton mini={true} style={styles.actionBtn} onClick={(e) => this.handlePublish(e, PUBLISHED)}>
              <VisibilityIcon />
            </FloatingActionButton>
          ) : (
              <FloatingActionButton mini={true} style={styles.actionBtn} onClick={(e) => this.handlePublish(e, PENDING)}>
                <VisibilityOffIcon />
              </FloatingActionButton>
            )
        }
        <FloatingActionButton mini={true} style={styles.actionBtn} onClick={(e) => this.handleBeforeRemove(e)}>
          <DeleteIcon />
        </FloatingActionButton>

      </span >

    ) : ''
  }



  render() {
    const { material, intl } = this.props
    const { formatMessage } = intl
    const { languages, currentTranslation, showDialog } = this.state
    const language = currentTranslation.get('lang')
    const title = currentTranslation.get('title')
    const desc = currentTranslation.get('desc')
    const images = [...material.get('commonScreenshots') || [], ...material.getIn(['screenshots', language]) || []]
    const files = [...material.get('commonFiles') || [], ...material.getIn(['files', language]) || []]
    // migration hack: if just one language and not under its language directory, it is compress under xx locale code
    const zipFile = material.getIn(['file', language]) || material.getIn(['file', 'xx'])
    const authors = material.get('authors')
    const idMaterial = material.get('idMaterial')

    const activityTags = material.get('activities') && material.get('activities').map((id) => {
      const key = activities.filter(item => item.code === id)[0].text
      return (
        <Chip style={styles.chip} key={id}>
          <Avatar icon={<ActivityIcon />} />
          <FormattedMessage {...classificationMessages[key]} />
        </Chip>
      )
    })
    const areaTags = material.get('areas') && material.get('areas').map((id) => {
      const key = areas.filter(item => item.code === id)[0].text
      return (
        <Chip style={styles.chip} key={id}>
          <Avatar icon={<AreaIcon />} />
          <FormattedMessage {...classificationMessages[key]} />
        </Chip>
      )
    })

    const actions = [
      <FlatButton
        label={formatMessage(messages.cancel)}
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label={formatMessage(messages.submit)}
        keyboardFocused={true}
        primary={true}
        onClick={this.handleRemove}
      />
    ];

    return (
      <div>
        <H2 primary ucase>{title}</H2>
        {this.renderActionButtons()}
        <div style={styles.snippet}>

          <div style={{ position: 'relative' }}>
            <ImageSlider images={images} id={idMaterial} style={styles.slides} />
            {material.get('status') === PENDING && <Ribbon text={<FormattedMessage {...messages.pending} />} type='warning' />}
            {material.get('status') === NOT_PUBLISHED && <Ribbon text={<FormattedMessage {...messages.notPublished} />} type='danger' />}
          </div>

          <div style={styles.desc}>
            <P>{desc}</P>
            <p style={{ textAlign: 'center' }}>
              <a href={`${MATERIALS_URL}/${idMaterial}/${zipFile}`}>
                <RaisedButton label={<FormattedMessage {...messages.zipFileLabel} />} primary={true} style={styles.button} />
              </a>
            </p>

          </div>
        </div>
        <H3 primary={true}>{<FormattedMessage {...messages.shareMaterial} />}</H3>
        <Divider />
        <p>
          <ShareBar shareUrl={window.location.href} title={title} image={'http://www.arasaac.org/images/arasaac_titulo.png'} />
        </p>
        <H3 primary={true}>{<FormattedMessage {...messages.activities} />}</H3>
        <Divider />
        <div style={styles.wrapper}>
          {activityTags}
        </div>
        <H3 primary={true}>{<FormattedMessage {...messages.areas} />}</H3>
        <Divider />
        <div style={styles.wrapper}>
          {areaTags}
        </div>
        <H3 primary={true}>{<FormattedMessage {...messages.languages} />}</H3>
        <Divider />
        <RadioButtonGroup name='languages' valueSelected={language} onChange={this.handleChange}>
          {languages.map((language) => (
            <RadioButton
              key={language}
              value={language}
              label={<FormattedMessage {...langMessages[language]} />}
              style={styles.radioButton}
            />
          )
          )}
        </RadioButtonGroup>

        <H3 primary={true}>{<FormattedMessage {...messages.authors} />}</H3>
        <Divider />
        <List>

          {authors.valueSeq().map((authorData) => {
            const role = authorData.get('role') || 'author'
            const author = authorData.get('author')
            const pictureProvider = author.get('pictureProvider')
            const picture = pictureProvider === ARASAAC ? DEFAULT_PROFILE_PICTURE : author.getIn([pictureProvider, 'picture'])
            return (
              <ListItem
                key={author.get('_id')}
              >
                <div style={{ display: 'flex' }}>
                  <div>
                    <img src={picture} style={{ width: '50px', height: '50px', marginRight: '25px' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <P important={true} style={{ marginBottom: '5px' }}>{author.get('name')}</P>
                    <span style={{ color: 'darkGrey', fontSize: '0.9rem' }}>{role}</span>
                  </div>
                </div>
              </ListItem>
            )
          }
          )}
        </List>
        <H3 primary={true}>{<FormattedMessage {...messages.files} />}</H3>
        <Divider />
        {
          files.map((file) =>
            <FlatButton
              key={file}
              label={file}
              labelPosition='after'
              icon={<Download />}
              href={`${MATERIALS_URL}/${idMaterial}/${file}`}
            />
          )
        }
        <Dialog
          title={formatMessage(messages.deleteMaterial)}
          actions={actions}
          modal={true}
          open={showDialog}
          onRequestClose={this.handleClose}
        >
          <FormattedMessage {...messages.confirmDeletion} />
        </Dialog>
      </div >
    )
  }
}


Material.propTypes = {
  // onClick: PropTypes.func.isRequired,
  material: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  showActionButtons: PropTypes.bool.isRequired,
  publishMaterial: PropTypes.func.isRequired,
  removeMaterial: PropTypes.func.isRequired,
}

export default muiThemeable()(injectIntl(Material))
