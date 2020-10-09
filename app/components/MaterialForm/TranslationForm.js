import React from "react";
import PropTypes from "prop-types";
import { Field, FieldArray, reduxForm, propTypes } from "redux-form/immutable";
import { Step, Stepper, StepButton, StepContent } from "material-ui/Stepper";
import RaisedButton from "material-ui/RaisedButton";
import { FormattedMessage } from "react-intl";
import H3 from "components/H3";
import P from "components/P";
import RenderAuthors from "./RenderAuthors";
import RenderDropzoneInput from "./RenderDropzoneInput";
import RenderLanguages from "./RenderLanguages";
import messages from "./messages";
import { TRANSLATION } from "./constants";

class TranslationForm extends React.Component {
  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      onEmailExists,
      changeStep,
      stepIndex,
    } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Stepper activeStep={stepIndex} linear={false} orientation="vertical">
            <Step>
              <StepButton onClick={() => changeStep(0)}>
                <H3>
                  <FormattedMessage {...messages.translators} />
                </H3>
              </StepButton>
              <StepContent>
                <P>
                  <FormattedMessage {...messages.translatorsDataDesc} />
                </P>
                <FieldArray
                  name="authors"
                  component={RenderAuthors}
                  onEmailExists={onEmailExists}
                  onFieldChange={(field, value) =>
                    this.props.change(field, value)
                  }
                  showRole={false}
                  mandatory={true}
                  showDesc={false}
                />
              </StepContent>
            </Step>
            <Step>
              <StepButton onClick={() => changeStep(1)}>
                <H3>
                  <FormattedMessage {...messages.files} />
                </H3>
              </StepButton>
              <StepContent>
                <P>
                  <FormattedMessage {...messages.filesHint} />
                </P>
                <Field
                  name="files"
                  component={RenderDropzoneInput}
                  props={{
                    hint: <FormattedMessage {...messages.filesUpload} />,
                  }}
                />
              </StepContent>
            </Step>
            <Step>
              <StepButton onClick={() => changeStep(2)}>
                <H3>
                  <FormattedMessage {...messages.screenshots} />
                </H3>
              </StepButton>
              <StepContent>
                <P>
                  <FormattedMessage {...messages.screenshotsDesc} />
                </P>
                <Field
                  name="screenshots"
                  component={RenderDropzoneInput}
                  onlyImage={true}
                  props={{
                    hint: <FormattedMessage {...messages.screenshotsUpload} />,
                  }}
                />
              </StepContent>
            </Step>
            <Step>
              <StepButton onClick={() => changeStep(3)}>
                <H3>
                  <FormattedMessage {...messages.languageTitle} />
                </H3>
              </StepButton>
              <StepContent>
                <P>
                  <FormattedMessage {...messages.languageHint} />
                </P>
                <FieldArray
                  name="languages"
                  component={RenderLanguages}
                  status={TRANSLATION}
                />

                <RaisedButton
                  style={{ marginTop: "30px" }}
                  type="submit"
                  disabled={pristine || submitting}
                  label={<FormattedMessage {...messages.sendTranslation} />}
                  primary={true}
                />
              </StepContent>
            </Step>
          </Stepper>

          {/* <RaisedButton label='Clear values' disabled={pristine || submitting} onClick={reset} /> */}
        </form>
      </div>
    );
  }
}

TranslationForm.propTypes = {
  ...propTypes,
  languages: PropTypes.array.isRequired,
  onEmailExists: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: "TranslationForm",
})(TranslationForm);
