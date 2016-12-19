/**
*
* MaterialForm
*
*/

import React, { PropTypes } from 'react'
import { Field, FieldArray, reduxForm, propTypes } from 'redux-form/immutable'
import { Step, Stepper, StepButton, StepContent } from 'material-ui/Stepper'
import ChipInput from 'material-ui-chip-input'
import { TextField } from 'redux-form-material-ui'
import H3 from 'components/H3'
import RenderAuthors from './RenderAuthors'
import RenderDropzoneInput from './RenderDropzoneInput'

const RenderChip = ({ input, hintText, floatingLabelText, dataSource }) => (
  <ChipInput
    {...input}
    value={input.value || []}
    onRequestAdd={(addedChip) => {
      let values = input.value || []
      values = values.slice()
      values.push(addedChip)
      input.onChange(values)
    }}
    onRequestDelete={(deletedChip) => {
      let values = input.value || []
      values = values.filter((v) => v !== deletedChip)
      input.onChange(values)
    }}
    onBlur={() => input.onBlur()}
    hintText={hintText}
    floatingLabelText={floatingLabelText}
    dataSource={dataSource}
    fullWidth
  />
)

RenderChip.propTypes = {
  input: PropTypes.object.isRequired,
  hintText: PropTypes.string.isRequired,
  floatingLabelText: PropTypes.string.isRequired,
  dataSource: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}


class MaterialForm extends React.Component {

  state = {
    stepIndex: 0
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
    const { stepIndex } = this.state

    return (
      <div>
        <Stepper
          activeStep={stepIndex}
          linear={false}
          orientation='vertical'
        >
          <Step>
            <StepButton onTouchTap={() => this.setState({ stepIndex: 0 })}>
              <H3>Autores del material</H3>
            </StepButton>
            <StepContent>
              <p>Introduce el nombre y los apellidos de los autores del material.</p>
              <FieldArray name='authors' component={RenderAuthors} />
            </StepContent>
          </Step>
          <Step>
            <StepButton onTouchTap={() => this.setState({ stepIndex: 1 })}>
              <H3>Idiomas y descripción del material</H3>
            </StepButton>
            <StepContent>
              <p>Introduce el idioma del material, su título y la descripción del material.
              Si el material está en varios idiomas, rellena el título y la descripción en cada uno de ellos, así lo podremos procesar de forma automática.</p>
              <Field
                name='notes'
                component={TextField}
                hintText='Notes'
                floatingLabelText='Notes'
                multiLine={true}
                rows={2}
              />
              <Field name='myValue' component={RenderChip} hintText='...' floatingLabelText='Value' />
            </StepContent>
          </Step>
          <Step>
            <StepButton onTouchTap={() => this.setState({ stepIndex: 2 })}>
              <H3>Clasificación del material</H3>
            </StepButton>
            <StepContent>
              <Field name='myValue' component={RenderChip} hintText='...' floatingLabelText='Value' dataSource={['perro', 'casa', 'perra']} />
            </StepContent>
          </Step>
          <Step>
            <StepButton onTouchTap={() => this.setState({ stepIndex: 3 })}>
              <H3>Subir ficheros</H3>
            </StepButton>
            <StepContent>
              <Field
                name='files-upload'
                component={RenderDropzoneInput}
              />
            </StepContent>
          </Step>
        </Stepper>
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
