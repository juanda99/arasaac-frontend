import React from 'react'
import PropTypes from 'prop-types'
import { Field, FieldArray } from 'redux-form/immutable'
import MUIAutoComplete from 'material-ui/AutoComplete'
import Paper from 'material-ui/Paper'
import { AutoComplete, TextField } from 'redux-form-material-ui'
import { FormattedMessage } from 'react-intl'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import PersonAdd from 'material-ui/svg-icons/action/note-add'
import Delete from 'material-ui/svg-icons/action/delete'
import RenderDropzoneInput from './RenderDropzoneInput'
import messages from './messages'

const styles = {
  list: {
    listStyleType: 'none',
    display: 'flex',
    flexFlow: 'row wrap'
  },
  listItem: {
    flex: 1,
    minWidth: '350px',
    maxWidth: '700px',
    padding: '1rem'
  },
  paper: {
    width: '100%',
    padding: '20px',
    position: 'relative'
  }
}

const languageList = [
  'Español', 'Inglés', 'Francés'
]

const RenderLanguages = ({ fields }) => {
  const addLanguage = () => { fields.push({}) }
  if (fields.length === 0) addLanguage()
  return (
    <ul style={styles.list}>
      {fields.map((member, index) =>
        <li key={index} style={styles.listItem}>
          <Paper zDepth={2} style={styles.paper} >
            <Field
              name={`${member}.language`}
              type='text'
              component={AutoComplete}
              dataSource={languageList}
              hintText={<FormattedMessage {...messages.chooseLanguage} />}
              floatingLabelText={<FormattedMessage {...messages.language} />}
              openOnFocus={true}
              filter={MUIAutoComplete.fuzzyFilter}
              fullWidth
            />
            <Field
              name={`${member}.title`}
              type='text'
              component={TextField}
              hintText={<FormattedMessage {...messages.titleHint} />}
              floatingLabelText={<FormattedMessage {...messages.title} />}
              fullWidth
            />
            <Field
              name={`${member}.description`}
              type='text'
              component={TextField}
              hintText={<FormattedMessage {...messages.descriptionHint} />}
              floatingLabelText={<FormattedMessage {...messages.description} />}
              multiLine={true}
              rows={2}
              fullWidth
            />
            <div>
              <FieldArray
                name={`${member}.files`}
                component={RenderDropzoneInput}
                props={{ hint: <FormattedMessage {...messages.languageFiles} /> }}
              />
            </div>
            <div>
              <FieldArray
                  name={`${member}.screenshots`}
                  component={RenderDropzoneInput}
                  props={{ hint: <FormattedMessage {...messages.languageScreenshots} /> }}
                />
            </div>
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


export default RenderLanguages
