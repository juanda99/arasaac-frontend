import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import muiThemeable from 'material-ui/styles/muiThemeable'
import IconButton from 'material-ui/IconButton'
import Badge from 'material-ui/Badge'
import { DEFAULT_LIST } from 'utils'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import FileDownload from 'material-ui/svg-icons/file/file-download'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import { FormattedMessage } from 'react-intl'
import CardActions from 'components/PictogramSnippet/CardActions'
import StyledPaper from 'components/PictogramSnippet/StyledPaper'
import StyledList from 'components/PictogramSnippet/StyledList'
import Folder from 'material-ui/svg-icons/file/folder'
import messages from './messages'

class ListSnippet extends PureComponent {
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
    },
    header: {
      fontSize: '1.4rem',
      textTransform: 'uppercase',
      color: this.props.muiTheme.palette.primary1Color,
      fontWeight: '900',
      textAlign: 'center',
      padding: 10
    }
  };

  state = {
    zDepth: 1
  };

  handleMouseEnter = () => {
    this.setState({
      zDepth: 3
    })
  };

  handleRemoveList = (event) => {
    event.stopPropagation()
    this.props.onDelete(this.props.listName)
  };

  handleDownload = (event) => {
    event.stopPropagation()
    this.props.onDownload(this.props.listName)
  };

  handleMouseLeave = () => {
    this.setState({
      zDepth: 1
    })
  };

  handleClick = (event) => {
    console.log('click!..................')
    event.stopPropagation()
    const { onSelect, listName } = this.props
    onSelect(listName)
  };

  render() {
    const { muiTheme, listName, totalItems } = this.props
    return (
      <StyledList
        key={listName}
        className='image-element-class'
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <StyledPaper zDepth={this.state.zDepth} onClick={this.handleClick}>
          <div style={{ position: 'relative' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '100%'
              }}
            >
              <p style={this.styles.header}>
                {listName === DEFAULT_LIST ? (
                  <FormattedMessage {...messages.showLists} />
                ) : (
                  listName
                )}
              </p>
              {listName === DEFAULT_LIST ? (
                <ArrowBack
                  color={muiTheme.palette.primary1Color}
                  hoverColor={muiTheme.palette.accent1Color}
                  onClick={this.handleClick}
                  style={{ width: 100, height: 100 }}
                />
              ) : (
                <Badge
                  badgeContent={totalItems}
                  secondary={true}
                  badgeStyle={{ top: 23, right: 23 }}
                >
                  <Folder
                    color={muiTheme.palette.primary1Color}
                    hoverColor={muiTheme.palette.accent1Color}
                    onClick={this.handleClick}
                    style={{ width: 100, height: 100 }}
                  />
                </Badge>
              )}
            </div>
            {listName !== DEFAULT_LIST && (
              <CardActions>
                <IconButton
                  touch={true}
                  tooltip={<FormattedMessage {...messages.removeList} />}
                  iconStyle={this.styles.icon}
                  style={this.styles.leftIconButton}
                  onClick={this.handleRemoveList}
                >
                  <ActionDelete
                    color={muiTheme.appBar.textColor}
                    hoverColor={muiTheme.palette.accent1Color}
                  />
                </IconButton>
                <IconButton
                  touch={true}
                  tooltip={<FormattedMessage {...messages.download} />}
                  iconStyle={this.styles.icon}
                  style={this.styles.rightIconButton}
                  onClick={this.handleDownload}
                >
                  <FileDownload
                    color={muiTheme.appBar.textColor}
                    hoverColor={muiTheme.palette.accent1Color}
                  />
                </IconButton>
                <p style={this.styles.cardTitle}>{listName}</p>
              </CardActions>
            )}
          </div>
        </StyledPaper>
      </StyledList>
    )
  }
}

ListSnippet.propTypes = {
  listName: PropTypes.string.isRequired,
  muiTheme: PropTypes.object,
  onDelete: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  totalItems: PropTypes.number
}

export default muiThemeable()(ListSnippet)
