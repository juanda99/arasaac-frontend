import React from 'react'
import PropTypes from 'prop-types'
import { Field, FieldArray, reduxForm, propTypes } from 'redux-form/immutable'
import { Step, Stepper, StepButton, StepContent } from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import H3 from 'components/H3'
import P from 'components/P'
// import areIntlLocalesSupported from 'intl-locales-supported'
import filterMessages from 'components/Filters/messages'
import { SelectField, DatePicker, TimePicker } from 'redux-form-material-ui'
import RenderAuthors from './RenderAuthors'
import RenderChip from './RenderChip'
import RenderLanguages from './RenderLanguages'
import messages from './messages'
import { UPDATE_MATERIAL } from './constants'

const DateTimeFormat = global.Intl.DateTimeFormat
// let DateTimeFormat
// if (areIntlLocalesSupported(['es', 'es-ES'])) {
//   DateTimeFormat = global.Intl.DateTimeFormat
// } else {
//   const IntlPolyfill = require('intl')
//   DateTimeFormat = IntlPolyfill.DateTimeFormat
//   require('intl/locale-data/jsonp/es')
// }

class MaterialForm extends React.Component {


  render() {
    const { handleSubmit, pristine, submitting, reset, activities, areas, intl, onEmailExists, invalid, changeStep, stepIndex, isAdmin, isNew } = this.props
    const { formatMessage } = intl
    const listActivities = activities.map(
      (selectItem) => {
        const value = parseInt(selectItem.code, 10)
        let text = formatMessage(filterMessages[selectItem.text])
        switch (value) {
          case 1:
          case 15:
          case 21:
          case 27:
          case 31:
            text = `${formatMessage(filterMessages['software'])} / ${text}`
            break;
          case 4:
          case 5:
          case 8:
          case 17:
          case 20:
          case 28:
            text = `${formatMessage(filterMessages['communication'])} / ${text}`
            break;
          case 6:
          case 11:
          case 12:
          case 13:
          case 16:
            text = `${formatMessage(filterMessages['game'])} / ${text}`
            break;
          default:
            break;
        }
        return { value, text }
      }
    )
    /* also used in FilterSelectLoader */
    const listAreas = areas.map(
      (selectItem) => {
        const value = parseInt(selectItem.code, 10)
        let text = formatMessage(filterMessages[selectItem.text])
        switch (value) {
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 31:
            text = `${formatMessage(filterMessages['language'])} / ${text}`
            break;
          case 13:
          case 14:
          case 15:
          case 16:
          case 29:
          case 30:
            text = `${formatMessage(filterMessages['math'])} / ${text}`
            break;
          case 1:
          case 2:
          case 27:
            text = `${formatMessage(filterMessages['priorSkills'])} / ${text}`
            break;
          default:
            break;
        }
        return { value, text }
      }
    )


    const sortListActivities = listActivities.sort((a, b) => a.text.localeCompare(b.text))
    const sortListAreas = listAreas.sort((a, b) => a.text.localeCompare(b.text))
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Stepper activeStep={stepIndex} linear={false} orientation='vertical'>
            <Step>
              <StepButton onClick={() => changeStep(0)}>
                <H3><FormattedMessage {...messages.authors} /></H3>
              </StepButton>
              <StepContent>
                <P><FormattedMessage {...messages.authorsDataDesc} /></P>
                <FieldArray name='authors' component={RenderAuthors} onEmailExists={onEmailExists} onFieldChange={(field, value) => this.props.change(field, value)} showRole={true} mandatory={false} showDesc={false} />
              </StepContent>
            </Step>
            <Step>
              <StepButton onClick={() => changeStep(1)}>
                <H3><FormattedMessage {...messages.classification} /></H3>
              </StepButton>
              <StepContent>
                <Field
                  name='areas'
                  component={RenderChip}
                  hintText={<FormattedMessage {...messages.areasHint} />}
                  floatingLabelText={<FormattedMessage {...messages.areas} />}
                  dataSource={sortListAreas}
                />
                <Field
                  name='activities'
                  component={RenderChip}
                  hintText={<FormattedMessage {...messages.activitiesHint} />}
                  floatingLabelText={<FormattedMessage {...messages.activities} />}
                  dataSource={sortListActivities}
                />
              </StepContent>
            </Step>
            <Step>
              <StepButton onClick={() => changeStep(2)}>
                <H3><FormattedMessage {...messages.languageTitle} /></H3>
              </StepButton>
              <StepContent>

                <P><FormattedMessage {...messages.languageHint} /></P>
                <FieldArray name='languages' component={RenderLanguages} onEmailExists={onEmailExists} onFieldChange={(field, value) => this.props.change(field, value)} status={UPDATE_MATERIAL} />

              </StepContent>
            </Step>

          </Stepper>
          <div style={{ paddingLeft: '40px', paddingTop: '30px' }}>
            {isAdmin && (
              <div>
                <Field
                  name='status'
                  component={SelectField}
                  hintText={<FormattedMessage {...messages.materialStatus} />}
                  floatingLabelText={<FormattedMessage {...messages.materialStatus} />}
                >

                  <MenuItem key={0} value={0} primaryText={<FormattedMessage {...messages.notPublished} />} />
                  <MenuItem key={1} value={1} primaryText={<FormattedMessage {...messages.published} />} />
                  <MenuItem key={2} value={2} primaryText={<FormattedMessage {...messages.pending} />} />
                </Field>
                <Field
                  name="lastUpdated"
                  component={DatePicker}
                  DateTimeFormat={DateTimeFormat}
                  locale={'es'}
                  floatingLabelText={<FormattedMessage {...messages.lastUpdated} />}
                />
                <Field
                  name="lastUpdated"
                  component={TimePicker}
                  locale={'es'}
                  DateTimeFormat={DateTimeFormat}
                  floatingLabelText={<FormattedMessage {...messages.lastUpdatedTime} />}
                />
              </div>
            )}
            <RaisedButton style={{ marginTop: '30px' }} type='submit' disabled={pristine || submitting} label={<FormattedMessage {...messages.updateMaterial} />} primary={true} />

          </div>


          {/* <RaisedButton label='Clear values' disabled={pristine || submitting} onClick={reset} /> */}
        </form>
      </div>
    )
  }
}

MaterialForm.propTypes = {
  ...propTypes,
  activities: PropTypes.array.isRequired,
  areas: PropTypes.array.isRequired,
  languages: PropTypes.array.isRequired,
  intl: intlShape.isRequired,
  onEmailExists: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
}

export default reduxForm({
  form: 'MaterialFormUpdate'
})(injectIntl(MaterialForm))
