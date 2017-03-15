import React from 'react'
import Dropzone from 'react-dropzone'

const RenderDropzoneInput = (field) => {
  const files = field.input.value
  return (
    <div>
      <Dropzone
        name={field.name}
        onDrop={(filesToUpload) => field.input.onChange(filesToUpload)}
      >
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
      {field.meta.touched &&
        field.meta.error &&
        <span className='error'>{field.meta.error}</span>}
      {files && Array.isArray(files) && (
        <ul>
          {files.map((file, i) => <li key={i}>{file.name}</li>)}
        </ul>
      )}
    </div>
  )
}

export default RenderDropzoneInput
