import React, { Component } from 'react'
import PropTypes from 'prop-types'
import H2 from 'components/H2'
import H3 from 'components/H3'
import ShareBar from 'components/ShareBar'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import ActivityIcon from 'material-ui/svg-icons/action/input'
import AreaIcon from 'material-ui/svg-icons/social/school'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Download from 'material-ui/svg-icons/action/get-app'
import Person from 'material-ui/svg-icons/social/person'
import { FormattedMessage } from 'react-intl'
import RaisedButton from 'material-ui/RaisedButton'
import ImageSlider from 'components/ImageSlider'
import activity from 'data/activity'
import area from 'data/area'
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
    language: this.props.locale
  }

  handleChange = (event, value) => { this.setState({ language: value }) }

  render() {
    const { material, locale } = this.props
    const images = [...material.get('commonScreenshots') || [], ...material.getIn(['screenshots', locale]) || []]
    const files = [...material.get('commonFiles') || [], ...material.getIn(['files', locale]) || []]
    // migration hack: if just one language and not under its language directory, it is compress under xx locale code
    const zipFile = material.getIn(['file', locale]) || material.getIn(['file', 'xx'])
    const authors = material.get('authors')
    const idMaterial = material.get('idMaterial')
    const title = material.get('title')
    /* get material languages */
    const languages = []
    languages.push(material.get('lang'))
    material.get('translations').forEach((translation) =>
      languages.push(translation.get('lang'))
    )
    const activityTags = material.get('activity').map((id) => (
      <Chip style={styles.chip} key={id}>
        <Avatar color='#444' size={15} icon={<ActivityIcon />} />
        {activity[id]}
      </Chip>
    ))
    const areaTags = material.get('area').map((id) => (
      <Chip style={styles.chip} key={id}>
        <Avatar color='#444' size={15} icon={<AreaIcon />} />
        {area[id]}
      </Chip>
    ))


    return (
      <div>
        <H2 primary ucase>{material.get('title')}</H2>
        <div style={styles.snippet}>
          <ImageSlider images={images} id={idMaterial} style={styles.slides} />
          <div style={styles.desc}>
            <p>{material.get('desc')}</p>
            <p style={{ textAlign: 'center' }}>
              <a href={`http://static.arasaac.org/${idMaterial}/${zipFile}`}>
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
        <RadioButtonGroup name='languages' defaultSelected={this.state.language} onChange={this.handleChange}>
          {languages.map((language) =>
            <RadioButton
              key={language}
              value={language}
              label={<FormattedMessage {...messages[language]} />}
              style={styles.radioButton}
            />
          )}
        </RadioButtonGroup>


        <H3 primary={true}>{<FormattedMessage {...messages.authors} />}</H3>
        <Divider />
        {authors.valueSeq().map((author) =>
          <p>
            <FlatButton
              key={author.get('id')}
              label={author.get('name')}
              labelPosition='after'
              icon={<Person />}
              href={`http://static.arasaac.org/${author}`}
            />
          </p>
        )}
        <H3 primary={true}>{<FormattedMessage {...messages.files} />}</H3>
        <Divider />
        {files.map((file) =>
          <FlatButton
            key={file}
            label={file}
            labelPosition='after'
            icon={<Download />}
            href={`http://static.arasaac.org/${idMaterial}/${file}`}
          />
        )}
      </div>
    )
  }
}


Material.propTypes = {
  // onClick: PropTypes.func.isRequired,
  material: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired
}

export default Material
