import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Linkify from 'react-linkify'
import H2 from 'components/H2'
import H3 from 'components/H3'
import ReadMargin from 'components/ReadMargin'
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
import {Helmet} from 'react-helmet'
import areas from 'data/areas'
import classificationMessages from 'components/Filters/messages'
import { MATERIALS_URL, IMAGES_URL } from 'services/config'
import langMessages from 'components/LanguageSelector/messages'
import { DEFAULT_PROFILE_PICTURE, ARASAAC, NOT_PUBLISHED, PUBLISHED, PENDING } from 'utils'
import Desc from './Desc'
import messages from './messages'

const styles = {
  chip: {
    margin: '4px'
  },
  slides: {
    flexGrow: 1,
    margin: '0 auto',
    maxWidth: '600px'
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

  createAuthorItem = (authorData) => {
    const role = authorData.get('role') || 'author'
    const author = authorData.get('author')
    const pictureProvider = authorData.get('pictureProvider') || ARASAAC /* legacy users data */
    const picture = pictureProvider === ARASAAC ? DEFAULT_PROFILE_PICTURE : author.getIn([pictureProvider, 'picture'])
    return (
      <Link to={`/materials/search/${author.get('name')}?searchType=author`} onClick={() => this.props.showSettings()}>
        <ListItem
          key={author.get('_id')}
        >
          <div style={{ display: 'flex' }}>
            <div>
              <img src={picture} style={{ width: '50px', height: '50px', marginRight: '25px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <P important={true} style={{ marginBottom: '5px' }}>{author.get('name')}</P>
              <span style={{ color: 'darkGrey', fontSize: '0.9rem' }}><FormattedMessage {...messages[role]} /></span>
            </div>
          </div>
        </ListItem>
      </Link>
    )
  }


  render() {
    const { material, intl } = this.props
    const { formatMessage } = intl
    const { currentTranslation, showDialog, languages } = this.state
    const language = currentTranslation.get('lang')
    const title = currentTranslation.get('title')
    const desc = currentTranslation.get('desc')
    const langImages = (material.getIn(['screenshots', language]) || []).map(image => `${language}/${image}`)
    const images = [...langImages, ...material.get('commonScreenshots') || []]
    // const files = [...material.get('commonFiles') || [], ...material.getIn(['files', language]) || []]
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
    const defaultImage = images.length ? `${MATERIALS_URL}/${idMaterial}/screenshots/${images[0]}` : `${IMAGES_URL}/arasaac-logo.png`
    return (
      <ReadMargin>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={desc} />
          {/* <link rel="canonical" href="http://mysite.com/example" /> */}
        </Helmet>
        <H2 primary ucase>{title}</H2>
        {this.renderActionButtons()}
        <p>
          <ShareBar shareUrl={`https://privateapi.arasaac.org/api/pages/materials/${language}/${idMaterial}`} title={title} desc={desc} image={defaultImage} language={language} />
        </p>
        <div style={styles.snippet}>
          <div style={{ position: 'relative' }}>
            <ImageSlider images={images} language={language} id={idMaterial} style={styles.slides} />
            {material.get('status') === PENDING && <Ribbon text={<FormattedMessage {...messages.pending} />} type='warning' />}
            {material.get('status') === NOT_PUBLISHED && <Ribbon text={<FormattedMessage {...messages.notPublished} />} type='danger' />}
          </div>

          <Desc>
            {desc.split('\n').map((i, key) => <P key={key}><Linkify properties={{ target: '_blank' }}>{i}</Linkify></P>)}
            <p style={{ textAlign: 'center' }}>
              <a href={`${MATERIALS_URL}/${idMaterial}/${zipFile}`}>
                <RaisedButton label={<FormattedMessage {...messages.zipFileLabel} />} primary={true} style={styles.button} />
              </a>
            </p>

          </Desc>
        </div>

        <H3 primary={true}><FormattedMessage {...messages.languages} /></H3>
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
        <P><FormattedMessage {...messages.suggestTranslation} /></P>
        <Link to={`/materials/add-translation/${idMaterial}`} >
          <RaisedButton label={<FormattedMessage {...messages.addTranslation} />} primary={true} style={styles.button} />
        </Link>

        <H3 primary={true}><FormattedMessage {...messages.files} /></H3>
        <Divider />
        {
          material.get('commonFiles').map((file) =>
            <FlatButton
              key={file}
              style={{ height: '60px', lineHeight: '22px' }}
              label={`${file.replace(/_/g, ' ')}`}
              labelPosition='after'
              icon={<Download />}
              href={`${MATERIALS_URL}/${idMaterial}/${file}`}
              target='_blank'
            >
            </FlatButton>
          )
        }
        {
          material.getIn(['files', language]) && material.getIn(['files', language]).map((file) =>
            <FlatButton
              key={file}
              style={{ height: '60px', lineHeight: '22px' }}
              label={`${file.replace(/_/g, ' ')}`}
              labelPosition='after'
              icon={<Download />}
              href={`${MATERIALS_URL}/${idMaterial}/${language}/${file}`}
              target='_blank'
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

        <H3 primary={true}><FormattedMessage {...messages.authors} /></H3>
        <Divider />
        <List>
          {/* general authors */}
          {authors.map((authorData) => this.createAuthorItem(authorData))}
          {/* translation authors */}
          {currentTranslation.get('authors').map(authorData => this.createAuthorItem(authorData))}
        </List>

        <H3 primary={true}><FormattedMessage {...messages.activities} /></H3>
        <Divider />
        <div style={styles.wrapper}>
          {activityTags}
        </div>
        <H3 primary={true}><FormattedMessage {...messages.areas} /></H3>
        <Divider />
        <div style={styles.wrapper}>
          {areaTags}
        </div>


      </ReadMargin >
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
  showSettings: PropTypes.func.isRequired
}

export default muiThemeable()(injectIntl(Material))
