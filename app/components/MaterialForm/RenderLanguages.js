import React from "react";
import PropTypes from "prop-types";
import { Field, FieldArray } from "redux-form/immutable";
import Paper from "material-ui/Paper";
import { SelectField, TextField } from "redux-form-material-ui";
import { FormattedMessage, injectIntl, intlShape } from "react-intl";
import FloatingActionButton from "material-ui/FloatingActionButton";
import PersonAdd from "material-ui/svg-icons/action/note-add";
import Delete from "material-ui/svg-icons/action/delete";
import MenuItem from "material-ui/MenuItem";
import { Map } from "immutable";
import RenderAuthors from "./RenderAuthors";
import languages from "data/languages";
import { required } from "redux-form-validators";
import languageMessages from "components/LanguageSelector/messages";
import { TRANSLATION, UPDATE_MATERIAL } from "./constants";
import messages from "./messages";

const styles = {
  list: {
    listStyleType: "none",
    display: "flex",
    flexFlow: "row wrap",
  },
  listItem: {
    flex: 0,
    // remove for mobile:
    // minWidth: '350px',
    width: "50%",
    minWidth: "900px",
    padding: "1rem",
  },
  paper: {
    width: "100%",
    padding: "20px",
    position: "relative",
  },
};

const RenderLanguages = ({
  fields,
  intl,
  status,
  onEmailExists,
  onFieldChange,
}) => {
  const { formatMessage } = intl;
  const addLanguage = () => {
    fields.push(new Map());
  };
  if (fields.length === 0) addLanguage();
  // if (status === 'TRANSLATION') addLanguage()
  return (
    <ul style={styles.list}>
      {fields.map((member, index) => (
        <li key={index} style={styles.listItem}>
          <Paper zDepth={2} style={styles.paper}>
            <Field
              name={`${member}.lang`}
              component={SelectField}
              hintText={<FormattedMessage {...messages.chooseLanguage} />}
              floatingLabelText={<FormattedMessage {...messages.language} />}
              fullWidth
              validate={[required()]}
              disabled={index !== 0 && status === TRANSLATION}
            >
              {languages.map((language) => (
                <MenuItem
                  key={language.code}
                  value={language.code}
                  primaryText={formatMessage(languageMessages[language.code])}
                />
              ))}
            </Field>
            <Field
              name={`${member}.title`}
              type="text"
              component={TextField}
              hintText={<FormattedMessage {...messages.titleHint} />}
              floatingLabelText={<FormattedMessage {...messages.title} />}
              fullWidth
              validate={[required()]}
              disabled={index !== 0 && status === TRANSLATION}
            />
            <Field
              name={`${member}.desc`}
              type="text"
              component={TextField}
              hintText={<FormattedMessage {...messages.descriptionHint} />}
              floatingLabelText={<FormattedMessage {...messages.description} />}
              multiLine={true}
              rows={2}
              fullWidth
              validate={[required()]}
              disabled={index !== 0 && status === TRANSLATION}
            />
            {/* if new material we don't show author for languages, too complicated*/}
            {status === UPDATE_MATERIAL && (
              <FieldArray
                name={`${member}.authors`}
                component={RenderAuthors}
                onEmailExists={onEmailExists}
                onFieldChange={onFieldChange}
                mandatory={false}
                showRole={false}
                showDesc={true}
              />
            )}
            {/* {status === TRANSLATION && (
              <FieldArray name={`${member}.authors`} component={RenderAuthors} onEmailExists={onEmailExists} onFieldChange={onFieldChange} hide={true} />
            )} */}
            {status !== TRANSLATION && (
              <div>
                <FloatingActionButton
                  mini={true}
                  style={{ position: "absolute", top: -5, right: 53 }}
                  onClick={() => fields.remove(index)}
                >
                  <Delete />
                </FloatingActionButton>
                <FloatingActionButton
                  mini={true}
                  style={{ position: "absolute", top: -5, right: 3 }}
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
  );
};

RenderLanguages.propTypes = {
  intl: intlShape.isRequired,
  fields: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
};

export default injectIntl(RenderLanguages);
