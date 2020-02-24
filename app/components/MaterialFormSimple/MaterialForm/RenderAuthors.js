import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form/immutable'
import MUIAutoComplete from 'material-ui/AutoComplete'
import { AutoComplete, TextField } from 'redux-form-material-ui'
import { FormattedMessage } from 'react-intl'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import { DEFAULT_PROFILE_PICTURE } from 'utils/index'
import PersonAdd from 'material-ui/svg-icons/social/person-add'
import Delete from 'material-ui/svg-icons/action/delete'
import { Map } from 'immutable'
import { required, email } from 'redux-form-validators'
import { getUserByEmail } from 'services'
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

const RenderAuthors = ({ fields, onEmailExists, onFieldChange }) => {
  const addAuthorField = () => { fields.push(new Map()) }
  if (fields.length === 0) {
    addAuthorField()
  }

  const handleEmailChange = async (event, newValue, previousValue, fieldName) => {
    const newFieldName = fieldName.replace("email", "name")
    const newFieldId = fieldName.replace("email", "_id")
    const newFieldPicture = fieldName.replace("email", "picture")
    try {
      const response = await onEmailExists(newValue)
      const { name, _id, facebook, google } = response
      // 404 should enter here...
      if (name) {
        let picture = DEFAULT_PROFILE_PICTURE
        if (facebook) picture = facebook.picture
        else if (google) picture = google.picture
        onFieldChange(newFieldName, name)
        onFieldChange(newFieldId, _id)
        onFieldChange(newFieldPicture, picture)
      }
      else throw new Error('USER_NOT_FOUND')
    } catch (e) {
      onFieldChange(newFieldPicture, '')
      onFieldChange(newFieldName, '')
      onFieldChange(newFieldId, '')

    }
  }

  return (

    <ul>
      {
        fields.map((member, index) =>
          <li key={index} style={styles.authorsList}>
            <img src={fields.get(index).get('picture')} style={{ width: '70px', height: '70px', marginRight: '15px', visibility: fields.get(index).get('picture') ? 'visible' : 'hidden' }} />
            <Field
              name={`${member}.email`}
              type='text'
              component={TextField}
              hintText={<FormattedMessage {...messages.emailHint} />}
              floatingLabelText={<FormattedMessage {...messages.email} />}
              style={styles.field}
              onChange={handleEmailChange}
              validate={[required(), email()]}
            />
            <Field
              name={`${member}.name`}
              type='text'
              component={TextField}
              disabled={true}
              hintText={<FormattedMessage {...messages.nameHint} />}
              floatingLabelText={<FormattedMessage {...messages.name} />}
              filter={MUIAutoComplete.fuzzyFilter}
              style={styles.field}
              validate={[required()]}
            />
            <Field
              name={`${member}._id`}
              type='text'
              component={TextField}
              disabled={true}
              style={{ display: 'none' }}
              validate={[required()]}
            />
            <Field
              name={`${member}.picture`}
              type='text'
              component={TextField}
              disabled={true}
              style={{ display: 'none' }}
              validate={[required()]}
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
        )
      }
    </ul >
  )
}

RenderAuthors.propTypes = {
  fields: PropTypes.object.isRequired
}

export default RenderAuthors
