import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import { PICTOGRAMS_URL } from 'services/config'
import { LOW_RESOLUTION } from 'components/Pictogram/constants'
import { TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import { Field, reduxForm, propTypes } from 'redux-form/immutable'
import messages from './messages'

const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

const required = (value) => (value ? undefined : 'Required')

const pictograms = [
  35693,
  35677,
  35679,
  35681,
  35665,
  35631,
  35683,
  35685,
  35687,
  35689,
  35691
]

const getNumber = (idPictogram) => pictograms.indexOf(idPictogram).toString()

class ContactForm extends Component {
  componentDidMount() {}

  fingersCount = (value) => {
    const number = getNumber(this.props.idPictogram)
    return value === number ? undefined : 'Wrong number of fingers'
  };

  render() {
    const { handleSubmit, pristine, submitting, idPictogram } = this.props

    return (
      <form onSubmit={handleSubmit} style={{ maxWidth: '800px' }}>
        <div>
          <Field
            name='name'
            type='text'
            component={TextField}
            // validate={[required]}
            hintText={<FormattedMessage {...messages.nameHint} />}
            floatingLabelText={<FormattedMessage {...messages.name} />}
            fullWidth
          />
        </div>
        <div>
          <Field
            name='email'
            type='email'
            component={TextField}
            // validate={[required, email]}
            hintText={<FormattedMessage {...messages.emailHint} />}
            floatingLabelText={<FormattedMessage {...messages.email} />}
            fullWidth
          />
        </div>
        <Field
          name='message2'
          type='text'
          component={TextField}
          // validate={[required]}
          hintText={<FormattedMessage {...messages.messageHint} />}
          floatingLabelText={<FormattedMessage {...messages.message} />}
          multiLine={true}
          rows={2}
          fullWidth
        />

        <div style={{ display: 'flex' }}>
          <img
            style={{ width: '130px', height: '130px', marginRight: '50' }}
            src={`${PICTOGRAMS_URL}/${idPictogram}/${idPictogram}_${LOW_RESOLUTION}.png`}
            alt={'spam filter'}
          />
          <Field
            name='fingers'
            type='text'
            component={TextField}
            validate={[required, this.fingersCount]}
            hintText={<FormattedMessage {...messages.fingersHint} />}
            floatingLabelText={<FormattedMessage {...messages.fingers} />}
            fullWidth
          />
        </div>

        <RaisedButton
          type='submit'
          disabled={pristine || submitting}
          label='Enviar'
          style={{ float: 'right' }}
          primary={true}
        />
      </form>
    )
  }
}

ContactForm.propTypes = {
  ...propTypes
}

ContactForm = reduxForm({
  form: 'ContactForm'
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
