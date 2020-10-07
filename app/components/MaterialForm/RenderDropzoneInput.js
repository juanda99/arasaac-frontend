import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { FormattedMessage } from 'react-intl'
import FilePreview from './FilePreview'
import CustomDropzone from './CustomDropzone'
import messages from './messages'
const styles = {
  thumb: {
    marginBottom: 8,
    marginRight: 8,
    boxSizing: 'border-box',
  },
  thumbsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 16,
  }
}

const removeDuplicates = (array, key) => {
  const lookup = {}
  return array.filter(obj => {
    const isNewValue = !lookup[obj[key]]
    lookup[obj[key]] = true
    return isNewValue
  })
}

class RenderDropZoneInput extends Component {
  onDrop = (acceptedFiles) => {
    const { onChange } = this.props.input
    const files = this.props.input.value || Immutable.List()
    const newFiles = Immutable.List(acceptedFiles)
    const allFiles = files.concat(newFiles)
    const uniqueFiles = removeDuplicates(allFiles, 'name')
    onChange(uniqueFiles)
  }



  handleDelete = (fileName) => {
    const files = this.props.input.value
    const { onChange } = this.props.input
    const newFiles = files.filter(file => file.name !== fileName)
    onChange(newFiles)
  }

  render() {
    const files = this.props.input.value
    const { onlyImage, exclusive } = this.props
    return (
      <div>
        <CustomDropzone name={name} onDrop={this.onDrop} multiple={true} accept={onlyImage ? 'image/*' : false}>

          <aside style={styles.thumbsContainer}>
            {files.size ?
              files.map((file) => (
                <div style={styles.thumb} key={file.name}>
                  <FilePreview file={file} onDelete={this.handleDelete} />
                </div>
              )) : (
                <p style={{ margin: '20px', textAlign: 'center' }}>
                  {exclusive ? (
                    onlyImage ? <FormattedMessage {...messages.langScreenshotsInfo} /> : <FormattedMessage {...messages.langFilesInfo} />)
                    : (
                      onlyImage ? <FormattedMessage {...messages.addMaterialImages} /> : <FormattedMessage {...messages.addFiles} />
                    )}
                </p>
              )
            }
          </aside>

        </CustomDropzone>
      </div >
    )
  }
}

// {/* files.map((file) => <img key={file.name} src={file.preview} style={styles.img} alt='' />)
//             : <div><p>{this.props.hint}</p></div>} */}

RenderDropZoneInput.propTypes = {
  input: PropTypes.object.isRequired,
  hint: PropTypes.object.isRequired,
  onlyImage: PropTypes.bool,
  exclusive: PropTypes.bool,
}

export default RenderDropZoneInput
