import React from 'react'
// import Dropzone from 'react-dropzone'
import CustomDropzone from './CustomDropzone'
const RenderDropzoneInput = (field) => {
  const files = field.input.value
  const hint = field.hint
  return (
    <div>
      <CustomDropzone
        style={{

        }}
        name={field.name}
        onDrop={(filesToUpload) => field.input.onChange(filesToUpload)}
      >
        <div><p>{hint}</p></div>
      </CustomDropzone>
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
