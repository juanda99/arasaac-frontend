import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import { PICTOGRAMS_URL } from 'services/config'
import { LOW_RESOLUTION } from 'components/Pictogram/constants'
import { TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import P from 'components/P'
import { Field, reduxForm, propTypes } from 'redux-form/immutable'
import messages from './messages'

const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? <FormattedMessage {...messages.invalidEmail} />
    : undefined

const required = (value) => (value ? undefined : <FormattedMessage {...messages.required} />)


const getNumber = (idPictogram, pictograms) => pictograms.indexOf(idPictogram).toString()

class ContactForm extends Component {

  fingersCount = (value) => {
    const { idPictogram, pictograms } = this.props
    const number = getNumber(idPictogram, pictograms)
    return value === number ? undefined : <FormattedMessage {...messages.wrongFingers} />
  };

  render() {
    const { handleSubmit, pristine, submitting, idPictogram } = this.props

    return (
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', marginBottom: '30px' }}>
        <Field
          name='name'
          type='text'
          component={TextField}
          validate={[required]}
          hintText={<FormattedMessage {...messages.nameHint} />}
          floatingLabelText={<FormattedMessage {...messages.name} />}
          fullWidth
        />
        <Field
          name='email'
          type='email'
          component={TextField}
          validate={[required, email]}
          hintText={<FormattedMessage {...messages.emailHint} />}
          floatingLabelText={<FormattedMessage {...messages.email} />}
          fullWidth
        />
        <Field
          name='subject'
          type='text'
          component={TextField}
          validate={[required]}
          hintText={<FormattedMessage {...messages.subjectHint} />}
          floatingLabelText={<FormattedMessage {...messages.subject} />}
          multiLine={false}
          fullWidth
        />
        <Field
          name='message'
          type='text'
          component={TextField}
          validate={[required]}
          hintText={<FormattedMessage {...messages.messageHint} />}
          floatingLabelText={<FormattedMessage {...messages.message} />}
          multiLine={true}
          rows={2}
          fullWidth
        />
        <P><FormattedMessage {...messages.preventSpam} /></P>

        <div>
          <img
            style={{ width: '130px', height: '130px', marginRight: '50px' }}
            src={`${PICTOGRAMS_URL}/${idPictogram}/${idPictogram}_${LOW_RESOLUTION}.png`}
            alt={'spam filter'}
          />
        </div>

        <Field
          name='fingers'
          type='text'
          component={TextField}
          validate={[required, this.fingersCount]}
          hintText={<FormattedMessage {...messages.fingersHint} />}
          floatingLabelText={<FormattedMessage {...messages.fingers} />}
          fullWidth
        />

        <RaisedButton
          type='submit'
          disabled={pristine || submitting}
          label={<FormattedMessage {...messages.send} />}
          style={{ float: 'right' }}
          primary={true}
        />
      </form>
    )
  }
}

ContactForm.propTypes = {
  ...propTypes,
  idPictogram: PropTypes.number.isRequired,
  pictograms: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
}

ContactForm = reduxForm({
  form: 'ContactForm',
  touchOnBlur: false,
  touchOnChange: true
})(ContactForm)

// ContactForm = connect(
//   state => {
//     // can select values individually
//     const idPictogram = selector(state, 'idPictogram')

//     return {
//       idPictogram
//     }
//   }
// )(ContactForm)

export default ContactForm
