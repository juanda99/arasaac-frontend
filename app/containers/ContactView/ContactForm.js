import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, propTypes } from 'redux-form/immutable'

class ContactForm extends Component {

  render() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='firstName'>First Name</label>
          <Field name='firstName' component='input' type='text' />
        </div>
        <div>
          <label htmlFor='lastName'>Last Name</label>
          <Field name='lastName' component='input' type='text' />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <Field name='email' component='input' type='email' />
        </div>
        <button type='submit'>Submit</button>
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
