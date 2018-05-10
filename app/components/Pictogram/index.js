import React, { Component } from 'react'
import PropTypes from 'prop-types'
import H2 from 'components/H2'
import H3 from 'components/H3'
import ShareBar from 'components/ShareBar'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import Person from 'material-ui/svg-icons/social/person'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { PICTOGRAMS_URL } from 'services/config'
import { FormattedMessage } from 'react-intl'
import SoundPlayer from 'components/SoundPlayer'
import Toggle from 'material-ui/Toggle'
import { keywordSelector } from 'utils'
import { SketchPicker } from 'react-color'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import FileFileDownload from 'material-ui/svg-icons/file/file-download'
import VisibilityOn from 'material-ui/svg-icons/action/visibility'
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off'
import P from 'components/P'
import messages from './messages'

const styles = {

  wrapper: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  picto: {
    width: '400px',
    maxWidth: '100%',
    height: 'auto',
    marginRight: '60px',
    flexGrow: 1,
    backgroundColor: 'white'
  },
  radioButton: {
    margin: 16
  },
  desc: {
    flexGrow: 3,
    width: '300px'
  },
  toggle: {
    margin: 16,
    width: 250
  }
}
class Pictogram extends Component {
  state = {
    language: this.props.locale,
    color: true,
    bgColor: false,
    plural: false,
    openMenu: false
  }

  onTogglePicker = () => this.setState({ pickerVisible: !this.state.pickerVisible })
  handleChange = (event, value) => { this.setState({ language: value }) }
  handleColor = (event, color) => { this.setState({ color }) }
  handlebgColor = (event, bgColor) => { this.setState({ bgColor, pickerVisible: bgColor }) }
  handlePlural = (event, plural) => { this.setState({ plural }) }
  handleColorChange = ({ hex }) => {
    console.log(hex)
    this.setState({ pickerVisible: 0 })
  }

  handleOnRequestChange = (value) => {
    this.setState({
      openMenu: value
    })
  }

  showPicker = (
    <FlatButton
      backgroundColor={this.props.muiTheme.palette.primary1Color}
      hoverColor={this.props.muiTheme.palette.primary3Color}
      icon={<VisibilityOff color={'white'} />}
    />
  )

  hidePicker = (
    <FlatButton
      backgroundColor={this.props.muiTheme.palette.primary1Color}
      hoverColor={this.props.muiTheme.palette.primary3Color}
      icon={<VisibilityOn color={'white'} />}
    />
  )

  render() {
    const { pictogram, searchText} = this.props
    const { color, bgColor, plural } = this.state
    const keywords = pictogram.get('keywords')
    const idPictogram = pictogram.get('idPictogram')
    const { keyword } = keywordSelector(searchText, keywords.toJS())
    const authors = pictogram.get('authors')
    // const keywords = pictogram.get('keywords')
    // audio source
    const streamUrl = 'http://www.arasaac.org/repositorio/locuciones/0/2139.mp3'

    return (
      <div>
        <H2 primary ucase>{keyword}</H2>
        <div style={styles.wrapper}>
          <img src={`${PICTOGRAMS_URL}/${idPictogram}_500.png`} alt={'alt'} style={styles.picto} />
          <div style={styles.desc}>
            <H2 primary>{<FormattedMessage {...messages.description} />}</H2>
            <Divider />
            {keywords.valueSeq().map((keyword) =>
              <div key={keyword}>
                <p style={{fontWeight: '900'}}>{keyword.get('keyword')}</p>
                <p>{<FormattedMessage {...messages.meaning} />}: {keyword.get('meaning')}</p>
              </div>
            )}
            <SoundPlayer streamUrl={streamUrl} preloadType='metadata' />
            <IconMenu
              iconButtonElement={<IconButton><FileFileDownload /></IconButton>}
              open={this.state.openMenu}
              onRequestChange={this.handleOnRequestChange}
            >
              <MenuItem value='1' primaryText='Download big size (2000px)' />
              <MenuItem value='2' primaryText='Download medium size (500px)' />
            </IconMenu>
          </div>
        </div>
        <H3 primary={true}>{<FormattedMessage {...messages.modifyPicto} />}</H3>
        <Divider />
        <div style={{ display: 'flex', width: '500', flexWrap: 'wrap', alignItems: 'center' }}>
          <Toggle
            label={<FormattedMessage {...messages.plural} />}
            labelPosition='right'
            onToggle={this.handlePlural}
            style={styles.toggle}
          />
          <Toggle
            label={<FormattedMessage {...messages.color} />}
            labelPosition='right'
            onToggle={this.handleColor}
            defaultToggled={true}
            style={styles.toggle}
          />
          <Toggle
            label={<FormattedMessage {...messages.backgroundColor} />}
            labelPosition='right'
            style={styles.toggle}
            onToggle={this.handlebgColor}
          />
          { bgColor ?
            <div style={{ width: '100px' }}>
              <button onClick={this.onTogglePicker}>
                {this.state.pickerVisible ? this.hidePicker : this.showPicker }
              </button>

              { this.state.pickerVisible && (
                <div style={{ position: 'absolute' }}>
                  <SketchPicker
                    color='#333'
                    onChangeComplete={this.handleColorChange}
                  />
                </div>
              ) }
            </div>
            : ''
          }
          <Toggle
            label={<FormattedMessage {...messages.past} />}
            labelPosition='right'
            onToggle={this.handleColor}
            defaultToggled={true}
            style={styles.toggle}
          />
          <Toggle
            label={<FormattedMessage {...messages.future} />}
            labelPosition='right'
            style={styles.toggle}
            onToggle={this.handlebgColor}
          />
        </div>

        <H3 primary={true}>{<FormattedMessage {...messages.sharePictogram} />}</H3>
        <Divider />
        <p>
          <ShareBar shareUrl={window.location.href} title={'title'} image={'http://www.arasaac.org/images/arasaac_titulo.png'} />
        </p>
        <Divider />
        <H3 primary={true}>{<FormattedMessage {...messages.languages} />}</H3>
        <p>{<FormattedMessage {...messages.changePictoLanguage} />}</p>
        <Divider />
        <H3 primary={true}>{<FormattedMessage {...messages.authors} />}</H3>
        <Divider />
        {authors.valueSeq().map((author) =>
          <P>
            <FlatButton
              key={author.get('id')}
              label={author.get('name')}
              labelPosition='after'
              icon={<Person />}
              href={`http://static.arasaac.org/${author}`}
            />
          </P>
        )}
      </div>
    )
  }
}


Pictogram.propTypes = {
  // onClick: PropTypes.func.isRequired,
  pictogram: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  searchText: PropTypes.string.isRequired,
  muiTheme: PropTypes.object.isRequired
}

export default muiThemeable()(Pictogram)
