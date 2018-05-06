

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import CardActions from './CardActions'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { PICTOGRAMS_URL } from 'services/config'
import IconButton from 'material-ui/IconButton'
import ActionSetFavorite from 'material-ui/svg-icons/action/favorite-border'
import FileDownload from 'material-ui/svg-icons/file/file-download'
import { FormattedMessage } from 'react-intl'
import StyledPaper from './StyledPaper'
import Image from './Image'
import Item from './Item'
import messages from './messages'

class PictogramSnippet extends PureComponent {

  state = {
    isFlipped: false
  }

  styles = {
    icon: {
      width: 48,
      height: 48
    },
    leftIconButton: {
      width: 96,
      height: 96,
      padding: 24,
      position: 'absolute',
      top: '0',
      left: '0'
    },
    rightIconButton: {
      width: 96,
      height: 96,
      padding: 24,
      position: 'absolute',
      top: '0',
      right: '0'
    },
    cardTitle: {
      textAlign: 'center',
      fontSize: '1.4rem',
      textTransform: 'uppercase',
      color: this.props.muiTheme.appBar.textColor,
      fontWeight: '900'
    }
  }

  handleMouseEnter = () => {
    this.setState({
      isFlipped: true,
      zDepth: 3
    })
  }

  handleMouseLeave = () => {
    this.setState({
      isFlipped: false,
      zDepth: 1
    })
  }

  render() {
    const { pictogram, searchText, muiTheme } = this.props
    const searchTextArray = searchText.split(' ')
    let keywordSelector = pictogram.keywords.find(
      (keywordsItem) => {

        const keywordArray = keywordsItem.keyword.split(' ')
        const found = searchTextArray.some(
          (word) => keywordArray.includes(word)
        )
        return found
      }
    )
    if (!keywordSelector) keywordSelector = pictogram.keywords[0]
    return (
      <li
        style={{ margin: 5, width: '250px', height: '250px' }}
        key={pictogram.idPictogram}
        className='image-element-class'
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >

        <StyledPaper zDepth={this.state.zDepth}>
          <Item url={`/pictograms/${pictogram.idPictogram}`}>
            <div style={{ position: 'relative;' }}>
              <Image src={`${PICTOGRAMS_URL}/${pictogram.idPictogram}_300.png`} alt={keywordSelector.keyword} />
              <CardActions>
                <IconButton touch={true} tooltip={<FormattedMessage {...messages.addFavorite} />} iconStyle={this.styles.icon} style={this.styles.leftIconButton}>
                  <ActionSetFavorite color={muiTheme.appBar.textColor} hoverColor={muiTheme.palette.accent1Color} />
                </IconButton>
                <IconButton touch={true} tooltip={<FormattedMessage {...messages.download} />} iconStyle={this.styles.icon} style={this.styles.rightIconButton} >
                  <FileDownload color={muiTheme.appBar.textColor} hoverColor={muiTheme.palette.accent1Color} />
                </IconButton>
                <p style={this.styles.cardTitle}>{keywordSelector.keyword}</p>
              </CardActions>
            </div>
          </Item>
          <Item url={`/pictograms/${pictogram.idPictogram}`}>

          </Item>
        </StyledPaper>
      </li>
    )
  }
}

PictogramSnippet.propTypes = {
  pictogram: PropTypes.object.isRequired,
  searchText: PropTypes.string,
  muiTheme: PropTypes.object
}

export default muiThemeable()(PictogramSnippet)
