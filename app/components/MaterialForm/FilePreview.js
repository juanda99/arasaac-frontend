import React, { Component } from 'react'
import PropTypes from 'prop-types'
import muiThemeable from 'material-ui/styles/muiThemeable'
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import StyledPaper from './StyledPaper'

const imageTypes = ['image/apng', 'image/bmp', 'image/gif', 'image/x-icon', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/tiff', 'image/webp']

class FilePreview extends Component {
  state = { zDepth: 1 }

  styles = {
    fileName: {
      textAlign: 'center',
      overflowWrap: 'break-word',
      fontSize: '1rem',
      color: this.props.muiTheme.textColor,
      fontWeight: '900'
    },
    image: {
      display: 'block',
      width: '100%',
      height: 'auto'
    }
  }

  handleEnter = () => this.setState({ zDpeth: 3 })
  handleLeave = () => this.setState({ zDpeth: 1 })
  handleDelete = () => {
    console.log('click on handleDelete!')
  }
  render() {
    const { zDepth } = this.state
    const { file, onDelete } = this.props
    const renderFile = imageTypes.indexOf(file.type) === -1 ? (
      <p style={this.styles.fileName}>{file.name}</p>
    ) : (
        <img src={file.preview} style={this.styles.image} />
      )
    return (
      <StyledPaper
        zDepth={zDepth}
        onMouseEnter={this.handleEnter}
        onMouseLeave={this.handleLeave}
        onClick={this.handleDelete}>
        {renderFile}
      </StyledPaper>
    )
  }
}

export default muiThemeable()(FilePreview)

FilePreview.propTypes = {
  file: PropTypes.object,
  onDelete: PropTypes.func.isRequired,
  muiTheme: PropTypes.object,
}
