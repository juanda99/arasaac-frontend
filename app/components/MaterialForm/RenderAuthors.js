import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form/immutable'
import MUIAutoComplete from 'material-ui/AutoComplete'
import { SelectField, TextField } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'
import { FormattedMessage } from 'react-intl'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import { DEFAULT_PROFILE_PICTURE } from 'utils/index'
import PersonAdd from 'material-ui/svg-icons/social/person-add'
import Delete from 'material-ui/svg-icons/action/delete'
import { Map } from 'immutable'
import P from 'components/P'
import { required, email } from 'redux-form-validators'
import Validators from 'redux-form-validators'
import { ARASAAC } from 'utils'
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

Object.assign(Validators.defaultOptions, {
  allowBlank: true
})

const RenderAuthors = ({ fields, onEmailExists, onFieldChange, showRole, mandatory, showDesc, hide }) => {

  const addAuthorField = (index) => {
    fields.push(new Map())
  }
  if (fields.length === 0) {
    addAuthorField()
  }

  const handleEmailChange = async (event, newValue, previousValue, fieldName) => {
    const newFieldName = fieldName.replace("email", "name")
    const newFieldId = fieldName.replace("email", "_id")
    const newFieldPicture = fieldName.replace("email", "picture")
    try {
      const response = await onEmailExists(newValue)
      const { name, _id, pictureProvider } = response
      // 404 should enter here...
      if (name) {
        let picture
        if (pictureProvider === ARASAAC) picture = DEFAULT_PROFILE_PICTURE
        else picture = response[pictureProvider].picture
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

    <div>
      {showDesc && <P important={true}><FormattedMessage {...messages.translators} /></P>}
      <ul>
        {

          fields.map((member, index) =>
            <li key={index} style={hide ? { ...styles.authorsList, display: 'none' } : styles.authorsList} >
              <img src={fields.get(index).get('picture')} style={{ width: '70px', height: '70px', marginRight: '15px', visibility: fields.get(index).get('picture') ? 'visible' : 'hidden' }} />
              <Field
                name={`${member}.email`}
                type='text'
                component={TextField}
                hintText={<FormattedMessage {...messages.emailHint} />}
                floatingLabelText={<FormattedMessage {...messages.email} />}
                style={styles.field}
                autoComplete="new-password"
                onChange={handleEmailChange}
                validate={mandatory ? [required(), email()] : [email()]}

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
                autoComplete="new-password"
                validate={mandatory ? [required()] : []}
              />
              <Field
                name={`${member}._id`}
                type='text'
                component={TextField}
                disabled={true}
                style={{ display: 'none' }}
                validate={mandatory ? [required()] : []}
              />
              <Field
                name={`${member}.picture`}
                type='text'
                component={TextField}
                disabled={true}
                style={{ display: 'none' }}
                validate={mandatory ? [required()] : []}
              />
              {showRole && (
                <Field
                  name={`${member}.role`}
                  component={SelectField}
                  hintText={<FormattedMessage {...messages.chooseRole} />}
                  floatingLabelText={<FormattedMessage {...messages.role} />}
                  defaultValue='author'
                  style={styles.field}
                  validate={mandatory ? [required()] : []}
                  value='author'
                >
                  <MenuItem
                    value='author'
                    primaryText={<FormattedMessage {...messages.author} />}
                  />
                  <MenuItem
                    value='translator'
                    primaryText={<FormattedMessage {...messages.translator} />}
                  />
                </Field>
              )}


              <div style={styles.icons}>
                <FloatingActionButton mini={true} style={styles.icon} onClick={() => fields.remove(index)} >
                  <Delete />
                </FloatingActionButton>
                <FloatingActionButton mini={true} style={styles.icon} onClick={() => addAuthorField(index)} >
                  <PersonAdd />
                </FloatingActionButton>
              </div>
            </li>
          )
        }
      </ul>
    </div >
  )
}

RenderAuthors.propTypes = {
  fields: PropTypes.object.isRequired,
  showRole: PropTypes.bool,
  mandatory: PropTypes.bool,
  onEmailExists: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  showDesc: PropTypes.bool,
  hide: PropTypes.bool,

}

export default RenderAuthors
