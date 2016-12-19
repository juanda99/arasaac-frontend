import React, { PropTypes } from 'react'
import { Field } from 'redux-form/immutable'
import MUIAutoComplete from 'material-ui/AutoComplete'
import Paper from 'material-ui/Paper'
import { AutoComplete, TextField } from 'redux-form-material-ui'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import PersonAdd from 'material-ui/svg-icons/social/person-add'
import Delete from 'material-ui/svg-icons/action/delete'

const style = {
  marginRight: 20,
  descriptionsList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0
  }
}

const languageList = [
  'Español', 'Inglés', 'Francés'
]

const RenderLanguages = ({ fields }) => {
  const addLanguage = () => { fields.push({}) }
  return (
    <ul style={style.descriptionsList}>
      <li>
        <FloatingActionButton mini={true} onClick={addLanguage} >
          <PersonAdd />
        </FloatingActionButton>

      </li>
      {fields.map((member, index) =>
        <li key={index} style={{ minHeight: 400 }}>
          <Paper zDepth={2} style={{ position: 'relative', width: 400, marginLeft: 40, marginButton: 50, padding: 20 }}>
            <Field
              name={`${member}.language`}
              type='text'
              component={RenderField}
              dataSource={languageList}
              hintText='Selecciona el idioma'
              muiComponent={AutoComplete}
              floatingLabelText='Idioma'
              openOnFocus={true}
              filter={MUIAutoComplete.fuzzyFilter}
              fullWidth
            />
            <Field
              name={`${member}.title`}
              type='text'
              component={TextField}
              hintText='Introduce el título'
              floatingLabelText='Título'
              fullWidth
            />
            <Field
              name={`${member}.description`}
              type='text'
              component={TextField}
              hintText='Introduce la descripción'
              floatingLabelText='Descripción'
              multiLine={true}
              rows={2}
              fullWidth
            />

            <FloatingActionButton mini={true} style={{ position: 'absolute', top: -5, right: 53 }} onClick={() => fields.remove(index)} >
              <Delete />
            </FloatingActionButton>
            <FloatingActionButton mini={true} style={{ position: 'absolute', top: -5, right: 3 }} onClick={addLanguage} >
              <PersonAdd />
            </FloatingActionButton>
          </Paper>
        </li>
      )}
    </ul>
  )
}

RenderLanguages.propTypes = {
  fields: PropTypes.object.isRequired
}

const RenderField = (props) => (
  <span style={{ paddingRight: '30px' }}>
    <Field {...props} component={props.muiComponent} />
    { props.touched && props.error && <span>{props.error}</span> }
  </span>
)

RenderField.propTypes = {
  touched: PropTypes.bool,
  error: PropTypes.string,
  muiComponent: PropTypes.func.isRequired
}

export default RenderLanguages
