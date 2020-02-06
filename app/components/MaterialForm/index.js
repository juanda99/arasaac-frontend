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
import { Map } from 'immutable'
import filterMessages from 'components/Filters/messages'
import { change } from 'redux-form';
import RenderAuthors from './RenderAuthors'
import RenderDropzoneInput from './RenderDropzoneInput'
import RenderChip from './RenderChip'
import RenderLanguages from './RenderLanguages'
import messages from './messages'

class MaterialForm extends React.Component {

  state = {
    stepIndex: 0,
    files: []
  }

  handleNext = () => {
    const { stepIndex } = this.state
    if (stepIndex < 2) {
      this.setState({ stepIndex: stepIndex + 1 })
    }
  }

  handlePrev = () => {
    const { stepIndex } = this.state
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 })
    }
  }

  render() {
    const { handleSubmit, pristine, submitting, reset, activities, areas, intl, onEmailExists } = this.props
    const { stepIndex } = this.state
    const { formatMessage } = intl
    const listActivities = [...activities.entries()].map(
      (selectItem) => ({ value: parseInt(selectItem[0], 10), text: formatMessage(filterMessages[selectItem[1]]) })
    )
    const listAreas = [...areas.entries()].map(
      (selectItem) => ({ value: parseInt(selectItem[0], 10), text: formatMessage(filterMessages[selectItem[1]]) })
    )
    const sortListActivities = listActivities.sort((a, b) => a.text.localeCompare(b.text))
    const sortListAreas = listAreas.sort((a, b) => a.text.localeCompare(b.text))
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Stepper activeStep={stepIndex} linear={false} orientation='vertical'>
            <Step>
              <StepButton onClick={() => this.setState({ stepIndex: 0 })}>
                <H3><FormattedMessage {...messages.authors} /></H3>
              </StepButton>
              <StepContent>
                <p><FormattedMessage {...messages.authorsDataDesc} /></p>
                <FieldArray name='authors' component={RenderAuthors} onEmailExists={onEmailExists} onFieldChange={(field, value) => this.props.change(field, value)} />
              </StepContent>
            </Step>
            <Step>
              <StepButton onClick={() => this.setState({ stepIndex: 1 })}>
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
              <StepButton onClick={() => this.setState({ stepIndex: 2 })}>
                <H3><FormattedMessage {...messages.files} /></H3>
              </StepButton>
              <StepContent>
                <p><FormattedMessage {...messages.filesHint} /></p>
                <Field
                  name='files'
                  component={RenderDropzoneInput}
                  props={{ hint: <FormattedMessage {...messages.filesUpload} /> }}
                />
              </StepContent>
            </Step>
            <Step>
              <StepButton onClick={() => this.setState({ stepIndex: 3 })}>
                <H3><FormattedMessage {...messages.screenshots} /></H3>
              </StepButton>
              <StepContent>
                <p><FormattedMessage {...messages.screenshotsDesc} /></p>
                <Field
                  name='screenshots'
                  component={RenderDropzoneInput}
                  props={{ hint: <FormattedMessage {...messages.screenshotsUpload} /> }}
                />
              </StepContent>
            </Step>
            <Step>
              <StepButton onClick={() => this.setState({ stepIndex: 4 })}>
                <H3><FormattedMessage {...messages.languageTitle} /></H3>
              </StepButton>
              <StepContent>
                <p><FormattedMessage {...messages.languageHint} /></p>
                <FieldArray name='languages' component={RenderLanguages} />
              </StepContent>
            </Step>

          </Stepper>
          <RaisedButton type='submit' disabled={pristine || submitting} label='Enviar' primary={true} />
          <RaisedButton label='Clear values' disabled={pristine || submitting} onClick={reset} />
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
