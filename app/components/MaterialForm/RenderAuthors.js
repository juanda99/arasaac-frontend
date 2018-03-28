import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form/immutable'
import MUIAutoComplete from 'material-ui/AutoComplete'
import { AutoComplete } from 'redux-form-material-ui'
import { FormattedMessage } from 'react-intl'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import PersonAdd from 'material-ui/svg-icons/social/person-add'
import Delete from 'material-ui/svg-icons/action/delete'
import { Map } from 'immutable'
import { required, email } from 'redux-form-validators'
import messages from './messages'

const styles = {
  marginRight: 20,
  authorsList: {
    listStyleType: 'none',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  field: {
    marginRight: '2rem'
  },
  icons: {
    flexGrow: 0,
    width: '120px',
    alignSelf: 'flex-end'
  },
  icon: {
    marginRight: '1rem'
  }
}

const nameList = [
  'Juan', 'Pedro', 'Marcos'
]
const surnameList = [
  'Pérez', 'Gracia', 'Gómez', 'Sanchez'
]

const RenderAuthors = ({ fields }) => {
  const addAuthorField = () => { fields.push(new Map()) }
  if (fields.length === 0) {
    addAuthorField()
  }
  return (
    <ul>
      {fields.map((member, index) =>
        <li key={index} style={styles.authorsList}>
          <Field
            name={`${member}.firstName`}
            type='text'
            component={AutoComplete}
            dataSource={nameList}
            hintText={<FormattedMessage {...messages.nameHint} />}
            floatingLabelText={<FormattedMessage {...messages.name} />}
            openOnFocus={true}
            filter={MUIAutoComplete.fuzzyFilter}
            style={styles.field}
            validate={[required(), email()]}
          />

          <div style={styles.icons}>
            <FloatingActionButton mini={true} style={styles.icon} onClick={() => fields.remove(index)} >
              <Delete />
            </FloatingActionButton>
            <FloatingActionButton mini={true} style={styles.icon} onClick={addAuthorField} >
              <PersonAdd />
            </FloatingActionButton>
          </div>
        </li>
      )}
    </ul>
  )
}

RenderAuthors.propTypes = {
  fields: PropTypes.object.isRequired
}

export default RenderAuthors
