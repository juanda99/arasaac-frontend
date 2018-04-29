import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form/immutable'
import Paper from 'material-ui/Paper'
import { SelectField, TextField } from 'redux-form-material-ui'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import PersonAdd from 'material-ui/svg-icons/action/note-add'
import Delete from 'material-ui/svg-icons/action/delete'
import MenuItem from 'material-ui/MenuItem'
import { Map } from 'immutable'
import languages from 'components/LanguageSelector/messages'
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

const RenderLanguages = ({ fields, intl }) => {
  const { formatMessage } = intl
  const addLanguage = () => { fields.push(new Map()) }
  if (fields.length === 0) addLanguage()
  return (
    <ul style={styles.list}>
      {fields.map((member, index) =>
        <li key={index} style={styles.listItem}>
          <Paper zDepth={2} style={styles.paper} >
            <Field
              name={`${member}.language`}
              component={SelectField}
              hintText={<FormattedMessage {...messages.chooseLanguage} />}
              floatingLabelText={<FormattedMessage {...messages.language} />}
              fullWidth
            >
              <MenuItem value={'es'} primaryText={formatMessage(languages.spanish)} />
              <MenuItem value={'fr'} primaryText={formatMessage(languages.french)} />
              <MenuItem value={'en'} primaryText={formatMessage(languages.english)} />
              <MenuItem value={'it'} primaryText={formatMessage(languages.italian)} />
              <MenuItem value={'val'} primaryText={formatMessage(languages.valencian)} />
              <MenuItem value={'de'} primaryText={formatMessage(languages.german)} />
            </Field>
            <Field
              name={`${member}.title`}
              type='text'
              component={TextField}
              hintText={<FormattedMessage {...messages.titleHint} />}
              floatingLabelText={<FormattedMessage {...messages.title} />}
              fullWidth
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
            />
            <div>
              <Field
                name={`${member}.files`}
                component={RenderDropzoneInput}
                props={{ hint: <FormattedMessage {...messages.languageFiles} /> }}
              />
            </div>
            <div>
              <Field
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
  intl: intlShape.isRequired,
  fields: PropTypes.object.isRequired
}


export default injectIntl(RenderLanguages)
