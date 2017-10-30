import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CustomDropzone from './CustomDropzone'
import ImageProgress from './ImageProgress'


const renderFiles = (files) => (
    files.map((file) =>
      <div style={{ position: 'relative' }}>
        <img src={file.preview} style={{ width: '200px', maxWidth: '400px', flexGrow: 1, opacity: 0.5 }} alt='' />
        <ImageProgress style={{ position: 'absolute', left: '-50%' }} />
      </div>
    )
)

class RenderDropZoneInput extends Component {
  onDrop = (acceptedFiles, rejectedFiles) => {
    acceptedFiles.map(
      (file) => this.props.fields.push({ preview: file.preview, name: file.name, size: file.size, type: 'accepted' })
    )
    rejectedFiles.map(
      (file) => this.props.fields.push({ preview: file.preview, name: file.name, size: file.size, type: 'rejected' })
    )
  }

  render() {
    const { hint, fields } = this.props
    return (
      <div>
        <CustomDropzone name={fields.name} onDrop={this.onDrop} multiple={true}>
          { fields.length ?
            renderFiles(fields.getAll())
            : <div><p>{ hint }</p></div> }
        </CustomDropzone>
      </div>
    )
  }
}

RenderDropZoneInput.propTypes = {
  fields: PropTypes.array.isRequired
}

export default RenderDropZoneInput
