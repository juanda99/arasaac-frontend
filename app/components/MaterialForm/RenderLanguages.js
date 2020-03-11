import React from 'react'
import PropTypes from 'prop-types'
import { Field, FieldArray } from 'redux-form/immutable'
import Paper from 'material-ui/Paper'
import { SelectField, TextField } from 'redux-form-material-ui'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import PersonAdd from 'material-ui/svg-icons/action/note-add'
import Delete from 'material-ui/svg-icons/action/delete'
import MenuItem from 'material-ui/MenuItem'
import { Map } from 'immutable'
import RenderAuthors from './RenderAuthors'
import { change } from 'redux-form'
import languages from 'data/languages'
import { required } from 'redux-form-validators'
import languageMessages from 'components/LanguageSelector/messages'
import messages from './messages'

const styles = {
  list: {
    listStyleType: 'none',
    display: 'flex',
    flexFlow: 'row wrap'
  },
  listItem: {
    flex: 1,
    // remove for mobile:
    // minWidth: '350px',
    width: '100%',
    padding: '1rem'
  },
  paper: {
    width: '100%',
    padding: '20px',
    position: 'relative'
  }
}

const RenderLanguages = ({ fields, intl, unique, onEmailExists, change }) => {
  const { formatMessage } = intl
  const addLanguage = () => {
    fields.push(new Map())
  }
  if (fields.length === 0) addLanguage()
  console.log(typeof change, '*******3*******', change)
  return (
    <ul style={styles.list}>
      {fields.map((member, index) => (
        <li key={index} style={styles.listItem}>
          <Paper zDepth={2} style={styles.paper}>
            <Field
              name={`${member}.language`}
              component={SelectField}
              hintText={<FormattedMessage {...messages.chooseLanguage} />}
              floatingLabelText={<FormattedMessage {...messages.language} />}
              fullWidth
              validate={[required()]}
            >
              {languages.map((language) =>
                <MenuItem
                  key={language.code}
                  value={language.code}
                  primaryText={formatMessage(languageMessages[language.code])}
                />
              )
              }
            </Field>
            <Field
              name={`${member}.title`}
              type='text'
              component={TextField}
              hintText={<FormattedMessage {...messages.titleHint} />}
              floatingLabelText={<FormattedMessage {...messages.title} />}
              fullWidth
              validate={[required()]}
            />
            <Field
              name={`${member}.desc`}
              type='text'
              component={TextField}
              hintText={<FormattedMessage {...messages.descriptionHint} />}
              floatingLabelText={<FormattedMessage {...messages.description} />}
              multiLine={true}
              rows={2}
              fullWidth
              validate={[required()]}
            />
            <FieldArray name={`${member}.authors`} component={RenderAuthors} onEmailExists={onEmailExists} onFieldChange={(field, value) => change(field, value)} />
            {!unique && (
              <div>
                <FloatingActionButton
                  mini={true}
                  style={{ position: 'absolute', top: -5, right: 53 }}
                  onClick={() => fields.remove(index)}
                >
                  <Delete />
                </FloatingActionButton>
                <FloatingActionButton
                  mini={true}
                  style={{ position: 'absolute', top: -5, right: 3 }}
                  onClick={addLanguage}
                >
                  <PersonAdd />
                </FloatingActionButton>
              </div>
            )}
          </Paper>
        </li>
      ))}
    </ul>
  )
}

RenderLanguages.propTypes = {
  intl: intlShape.isRequired,
  fields: PropTypes.object.isRequired,
  unique: PropTypes.bool
}

export default injectIntl(RenderLanguages)
