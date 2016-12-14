/**
*
* MaterialForm
*
*/

import React from 'react'
import { Field, FieldArray, reduxForm, propTypes } from 'redux-form/immutable'
import { AutoComplete as MUIAutoComplete, RaisedButton } from 'material-ui'
import {
  AutoComplete,
  TextField
} from 'redux-form-material-ui'
import Dropzone from 'react-dropzone'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import PersonAdd from 'material-ui/svg-icons/social/person-add'
import Delete from 'material-ui/svg-icons/action/delete'

const style = {
  marginRight: 20,
  authorsList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0
  }
}


const FILE_FIELD_NAME = 'files'


const renderDropzoneInput = (field) => {
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

const nameList = [
  'Juan', 'Pedro', 'Marcos'
]
const surnameList = [
  'Pérez', 'Gracia', 'Gómez', 'Sanchez'
]

const renderField = (props) => (
  <span style={{ paddingRight: '30px' }}>
    <Field {...props} component={props.muiComponent} />
    { props.touched && props.error && <span>{props.error}</span> }
  </span>
)
renderField.propTypes = {
  ...propTypes
}

const renderAuthors = ({ fields }) => {
  const addAuthorField = () => { fields.push({}) }
  return (
    <ul style={style.authorsList}>
      <li>
        <FloatingActionButton mini={true} onClick={addAuthorField} >
          <PersonAdd />
        </FloatingActionButton>

      </li>
      {fields.map((member, index) =>
        <li key={index}>
          <Field
            name={`${member}.firstName`}
            type='text'
            component={renderField}
            dataSource={nameList}
            hintText='Introduce el nombre del autor'
            muiComponent={AutoComplete}
            floatingLabelText='Nombrerrr'
            openOnFocus={true}
            filter={MUIAutoComplete.fuzzyFilter}
          />
          <Field
            name={`${member}.lastName`}
            type='text'
            component={renderField}
            dataSource={surnameList}
            hintText='Introduce el apellido del autor'
            muiComponent={AutoComplete}
            floatingLabelText='Apellido'
            openOnFocus={true}
            filter={MUIAutoComplete.fuzzyFilter}
          />
          <FloatingActionButton mini={true} style={style} onClick={() => fields.remove(index)} >
            <Delete />
          </FloatingActionButton>
          <FloatingActionButton mini={true} onClick={addAuthorField} >
            <PersonAdd />
          </FloatingActionButton>
        </li>
      )}
    </ul>
  )
}
renderAuthors.propTypes = {
  ...propTypes
}


const MaterialForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <FieldArray name='authors' component={renderAuthors} />
      <div>
        <Field
          name='notes'
          component={TextField}
          hintText='Notes'
          floatingLabelText='Notes'
          multiLine={true}
          rows={2}
        />
      </div>

      <div>
        <Field
          name={FILE_FIELD_NAME}
          component={renderDropzoneInput}
        />
      </div>
      <div>
        <RaisedButton label='Submit' primary={true} disabled={pristine || submitting} />
        <RaisedButton label='Reset' primary={true} disabled={pristine || submitting} onClick={reset} />
      </div>
    </form>
  )
}

MaterialForm.propTypes = {
  ...propTypes
}

export default reduxForm({
  form: 'MaterialForm'
})(MaterialForm)
