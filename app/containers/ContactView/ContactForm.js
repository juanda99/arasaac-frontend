import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import { TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import { Field, reduxForm, propTypes } from 'redux-form/immutable'
import messages from './messages'

const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

const required = (value) => (value ? undefined : 'Required')

class ContactForm extends Component {
  render() {
    const { handleSubmit, pristine, submitting } = this.props
    return (
      <form onSubmit={handleSubmit} style={{ maxWidth: '800px' }}>
        <div>
          <Field
            name='name'
            type='text'
            component={TextField}
            validate={[required]}
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
            validate={[required, email]}
            hintText={<FormattedMessage {...messages.emailHint} />}
            floatingLabelText={<FormattedMessage {...messages.email} />}
            fullWidth
          />
        </div>
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

export default reduxForm({
  form: 'ContactForm'
})(ContactForm)
