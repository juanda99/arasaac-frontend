import React, { Component } from 'react'
import PropTypes from 'prop-types'
import H2 from 'components/H2'
import H3 from 'components/H3'
import ShareBar from 'components/ShareBar'
import Divider from 'components/Divider'
import FlatButton from 'material-ui/FlatButton'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import ActivityIcon from 'material-ui/svg-icons/action/input'
import AreaIcon from 'material-ui/svg-icons/social/school'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Download from 'material-ui/svg-icons/action/get-app'
import Person from 'material-ui/svg-icons/social/person'
import { FormattedMessage } from 'react-intl'
import RaisedButton from 'material-ui/RaisedButton'
import ImageSlider from 'components/ImageSlider'
import muiThemeable from 'material-ui/styles/muiThemeable'
import P from 'components/P'
import activities from 'data/activities'
import areas from 'data/areas'
import { MATERIALS_URL } from 'services/config'
import langMessages from 'components/LanguageSelector/messages'
import { DEFAULT_AVATAR_PICTURE } from 'utils/index'
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
    width: '600px',
    position: 'relative'
  },
  snippet: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    flexWrap: 'wrap-reverse'
  },
  button: {
    margin: '0 auto'
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}
class Material extends Component {
  state = {
    currentTranslation: this.props.material.get('translations').get(0),
    languages: this.props.material.get('translations').map(translation => translation.get('lang'))
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



  render() {
    const { material } = this.props
    const { languages, currentTranslation } = this.state
    const language = currentTranslation.get('lang')
    const title = currentTranslation.get('title')
    const desc = currentTranslation.get('desc')
    const images = [...material.get('commonScreenshots') || [], ...material.getIn(['screenshots', language]) || []]
    const files = [...material.get('commonFiles') || [], ...material.getIn(['files', language]) || []]
    // migration hack: if just one language and not under its language directory, it is compress under xx locale code
    const zipFile = material.getIn(['file', language]) || material.getIn(['file', 'xx'])
    const authors = material.get('authors')
    const idMaterial = material.get('idMaterial')

    const activityTags = material.get('activities') && material.get('activities').map((id) => (
      <Chip style={styles.chip} key={id}>
        <Avatar icon={<ActivityIcon />} />
        {activities.filter(item => item.code === id)[0].text}
      </Chip>
    ))
    const areaTags = material.get('areas') && material.get('areas').map((id) => (
      <Chip style={styles.chip} key={id}>
        <Avatar icon={<AreaIcon />} />
        {areas.filter(item => item.code === id)[0].text}
      </Chip>
    ))

    return (
      <div>
        <H2 primary ucase>{title}</H2>
        <div style={styles.snippet}>
          <ImageSlider images={images} id={idMaterial} style={styles.slides} />
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
            return (
              <ListItem
                key={author.get('_id')}
              >
                <div style={{ display: 'flex' }}>
                  <div>
                    <img src={DEFAULT_AVATAR_PICTURE} style={{ width: '50px', height: '50px', marginRight: '25px' }} />
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
      </div >
    )
  }
}


Material.propTypes = {
  // onClick: PropTypes.func.isRequired,
  material: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired
}

export default muiThemeable()(Material)
