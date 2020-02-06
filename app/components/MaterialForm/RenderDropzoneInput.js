import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import FilePreview from './FilePreview'
import CustomDropzone from './CustomDropzone'
const styles = {
  img: {
    width: '200px',
    marginRight: '1rem',
    maxWidth: '400px',
    flexGrow: 1,
    opacity: 0.5
  },
  thumb: {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 200,
    height: 200,
    boxSizing: 'border-box',
  },
  thumbsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
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

  handleDelete = (fileName) => {
    console.log(`${fileName} to be deleted!!!!!!!!!!!!!!!!!!!!!!!!!!!`)
  }

  render() {
    const files = this.props.input.value
    return (
      <div>
        <CustomDropzone name={name} onDrop={this.onDrop} multiple={true}>
          {console.log(files)}
          <aside style={styles.thumbsContainer}>
            {files.size ?
              files.map((file) => (
                <div style={styles.thumb} file={file.name}>
                  <FilePreview file={file} onDelete={this.handleDelete} />
                </div>
              )) : ''
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
  hint: PropTypes.object.isRequired
}

export default RenderDropZoneInput
