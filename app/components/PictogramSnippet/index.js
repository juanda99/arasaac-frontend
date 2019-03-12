import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { PICTOGRAMS_URL } from 'services/config'
import IconButton from 'material-ui/IconButton'
import ActionSetFavorite from 'material-ui/svg-icons/action/favorite-border'
import FileDownload from 'material-ui/svg-icons/file/file-download'
import { FormattedMessage } from 'react-intl'
import { keywordSelector } from 'utils'
import CardActions from './CardActions'
import StyledPaper from './StyledPaper'
import StyledList from './StyledList'
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
      zDepth: 3
    })
  }

  handleMouseLeave = () => {
    this.setState({
      zDepth: 1
    })
  }

  render() {
    const {
      pictogram: { idPictogram, keywords },
      searchText,
      muiTheme,
      locale,
      showExtra
    } = this.props
    const { keyword } = keywordSelector(searchText, keywords)
    return (
      <StyledList
        key={idPictogram}
        className='image-element-class'
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <StyledPaper zDepth={this.state.zDepth}>
          <Item url={`/pictograms/${locale}/${idPictogram}/${keyword}`}>
            <div style={{ position: 'relative' }}>
              <Image
                src={`${PICTOGRAMS_URL}/${idPictogram}_300.png`}
                alt={keyword}
              />
              {showExtra && (
                <CardActions>
                  <IconButton
                    touch={true}
                    tooltip={<FormattedMessage {...messages.addFavorite} />}
                    iconStyle={this.styles.icon}
                    style={this.styles.leftIconButton}
                  >
                    <ActionSetFavorite
                      color={muiTheme.appBar.textColor}
                      hoverColor={muiTheme.palette.accent1Color}
                    />
                  </IconButton>
                  <IconButton
                    touch={true}
                    tooltip={<FormattedMessage {...messages.download} />}
                    iconStyle={this.styles.icon}
                    style={this.styles.rightIconButton}
                  >
                    <FileDownload
                      color={muiTheme.appBar.textColor}
                      hoverColor={muiTheme.palette.accent1Color}
                    />
                  </IconButton>
                  <p style={this.styles.cardTitle}>{keyword}</p>
                </CardActions>
              )}
            </div>
          </Item>
        </StyledPaper>
      </StyledList>
    )
  }
}

PictogramSnippet.propTypes = {
  pictogram: PropTypes.object.isRequired,
  searchText: PropTypes.string,
  muiTheme: PropTypes.object,
  locale: PropTypes.string.isRequired,
  showExtra: PropTypes.bool
}

export default muiThemeable()(PictogramSnippet)
