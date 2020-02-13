/**
*
* MaterialForm
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import { Field, FieldArray, reduxForm, propTypes } from 'redux-form/immutable'
import { Step, Stepper, StepButton, StepContent } from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import H3 from 'components/H3'
import P from 'components/P'
import { Map } from 'immutable'
import filterMessages from 'components/Filters/messages'
import { change } from 'redux-form';
import RenderAuthors from './RenderAuthors'
import RenderDropzoneInput from './RenderDropzoneInput'
import RenderChip from './RenderChip'
import RenderLanguages from './RenderLanguages'
import messages from './messages'

class MaterialForm extends React.Component {


  render() {
    const { handleSubmit, pristine, submitting, reset, activities, areas, intl, onEmailExists, invalid, changeStep, stepIndex } = this.props
    const { formatMessage } = intl

    const listActivities = [...activities.entries()].map(
      (selectItem) => {
        const value = parseInt(selectItem[0], 10)
        let text = formatMessage(filterMessages[selectItem[1]])
        switch (value) {
          case 1:
          case 15:
          case 20:
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

    const listAreas = [...areas.entries()].map(
      (selectItem) => {
        const value = parseInt(selectItem[0], 10)
        let text = formatMessage(filterMessages[selectItem[1]])
        switch (value) {
          case 1:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
            text = `${formatMessage(filterMessages['language'])} / ${text}`
            break;
          case 13:
          case 14:
          case 15:
          case 16:
            text = `${formatMessage(filterMessages['math'])} / ${text}`
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
                <FieldArray name='authors' component={RenderAuthors} onEmailExists={onEmailExists} onFieldChange={(field, value) => this.props.change(field, value)} />
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
                <H3><FormattedMessage {...messages.files} /></H3>
              </StepButton>
              <StepContent>
                <P><FormattedMessage {...messages.filesHint} /></P>
                <Field
                  name='files'
                  component={RenderDropzoneInput}
                  props={{ hint: <FormattedMessage {...messages.filesUpload} /> }}
                />
              </StepContent>
            </Step>
            <Step>
              <StepButton onClick={() => changeStep(3)}>
                <H3><FormattedMessage {...messages.screenshots} /></H3>
              </StepButton>
              <StepContent>
                <P><FormattedMessage {...messages.screenshotsDesc} /></P>
                <Field
                  name='screenshots'
                  component={RenderDropzoneInput}
                  onlyImage={true}
                  props={{ hint: <FormattedMessage {...messages.screenshotsUpload} /> }}
                />
              </StepContent>
            </Step>
            <Step>
              <StepButton onClick={() => changeStep(4)}>
                <H3><FormattedMessage {...messages.languageTitle} /></H3>
              </StepButton>
              <StepContent>
                <P><FormattedMessage {...messages.languageHint} /></P>
                <FieldArray name='languages' component={RenderLanguages} />
                <RaisedButton style={{ marginTop: '30px' }} type='submit' disabled={pristine || submitting} label={<FormattedMessage {...messages.sendMaterial} />} primary={true} />
              </StepContent>
            </Step>

          </Stepper>

          {/* <RaisedButton label='Clear values' disabled={pristine || submitting} onClick={reset} /> */}
        </form>
      </div>
    )
  }
}

MaterialForm.propTypes = {
  ...propTypes,
  activities: PropTypes.instanceOf(Map),
  areas: PropTypes.instanceOf(Map),
  languages: PropTypes.instanceOf(Map),
  intl: intlShape.isRequired,
  onEmailExists: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'MaterialForm'
})(injectIntl(MaterialForm))
