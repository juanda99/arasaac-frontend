import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import CustomDropzone from './CustomDropzone'
const styles = {
  img: {
    width: '200px',
    marginRight: '1rem',
    maxWidth: '400px',
    flexGrow: 1,
    opacity: 0.5

  }
}

class RenderDropZoneInput extends Component {
  onDrop = (acceptedFiles) => {
    const { onChange } = this.props.input
    const files = this.props.input.value || Immutable.List()
    const newFiles = Immutable.List(acceptedFiles)
    const allFiles = files.concat(newFiles)
    onChange(allFiles)
  }

  render() {
    const files = this.props.input.value
    return (
      <div>
        <CustomDropzone name={name} onDrop={this.onDrop} multiple={true}>
          { files.size ?
            files.map((file) => <img key={file.name} src={file.preview} style={styles.img} alt='' / >)
            : <div><p>{ this.props.hint }</p></div> }
        </CustomDropzone>
      </div>
    )
  }
}

RenderDropZoneInput.propTypes = {
  input: PropTypes.object.isRequired,
  hint: PropTypes.object.isRequired
}

export default RenderDropZoneInput
