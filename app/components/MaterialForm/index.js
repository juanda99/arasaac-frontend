/**
*
* MaterialForm
*
*/

import React from 'react'
import { Field, FieldArray, reduxForm, propTypes } from 'redux-form/immutable'
import { Step, Stepper, StepButton, StepContent } from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import { FormattedMessage } from 'react-intl'
import H3 from 'components/H3'
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
    const { handleSubmit, pristine, submitting, reset } = this.props
    const { stepIndex } = this.state

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Stepper activeStep={stepIndex} linear={false} orientation='vertical'>
            <Step>
              <StepButton onClick={() => this.setState({ stepIndex: 0 })}>
                <H3><FormattedMessage {...messages.authors} /></H3>
              </StepButton>
              <StepContent>
                <p><FormattedMessage {...messages.authorsData} /></p>
                <FieldArray name='authors' component={RenderAuthors} />
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
                  dataSource={[{ text: 'perro', value: 0 }, { text: 'gato', value: 1 }, { text: 'pájaro', value: 2 }]}
                />
                <Field
                  name='actividades'
                  component={RenderChip}
                  hintText={<FormattedMessage {...messages.activitiesHint} />}
                  floatingLabelText={<FormattedMessage {...messages.activities} />}
                  dataSource={[{ text: 'perro', value: 0 }, { text: 'gato', value: 1 }, { text: 'pájaro', value: 2 }]}
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

            <Step>
              <StepButton onClick={() => this.setState({ stepIndex: 5 })}>
                <H3><FormattedMessage {...messages.submit} /></H3>
              </StepButton>
              <StepContent>
                <p>Almost finish! Click submit button to send the material. We will email you when it is published</p>
                <RaisedButton type='submit' disabled={pristine || submitting} label='Enviar' primary={true} />
                <RaisedButton label='Clear values' disabled={pristine || submitting} onClick={reset} />
              </StepContent>
            </Step>
          </Stepper>
        </form>
      </div>
    )
  }
}

MaterialForm.propTypes = {
  ...propTypes
}

export default reduxForm({
  form: 'MaterialForm'
})(MaterialForm)
