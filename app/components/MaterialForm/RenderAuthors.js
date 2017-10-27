import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form/immutable'
import MUIAutoComplete from 'material-ui/AutoComplete'
import { AutoComplete } from 'redux-form-material-ui'
import { FormattedMessage } from 'react-intl'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import PersonAdd from 'material-ui/svg-icons/social/person-add'
import Delete from 'material-ui/svg-icons/action/delete'
import messages from './messages'

const style = {
  marginRight: 20,
  authorsList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0
  }
}

const nameList = [
  'Juan', 'Pedro', 'Marcos'
]
const surnameList = [
  'Pérez', 'Gracia', 'Gómez', 'Sanchez'
]

const RenderAuthors = ({ fields }) => {
  const addAuthorField = () => { fields.push({}) }
  if (fields.length === 0) {
    addAuthorField()
  }
  return (
    <ul style={style.authorsList}>
      {fields.map((member, index) =>
        <li key={index}>
          <Field
            name={`${member}.firstName`}
            type='text'
            component={RenderField}
            dataSource={nameList}
            hintText={<FormattedMessage {...messages.nameHint} />}
            muiComponent={AutoComplete}
            floatingLabelText={<FormattedMessage {...messages.name} />}
            openOnFocus={true}
            filter={MUIAutoComplete.fuzzyFilter}
          />
          <Field
            name={`${member}.lastName`}
            type='text'
            component={RenderField}
            dataSource={surnameList}
            hintText={<FormattedMessage {...messages.surnameHint} />}
            muiComponent={AutoComplete}
            floatingLabelText={<FormattedMessage {...messages.surname} />}
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

RenderAuthors.propTypes = {
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

export default RenderAuthors
