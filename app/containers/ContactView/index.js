import React, { Component } from 'react'
import PropTypes from 'prop-types'
import View from 'components/View'
import ContactForm from './ContactForm'

class ContactView extends Component {
  constructor(props) {
    super(props)
  }

  submit = (values) => {
    // print the form values to the console
    console.log(values)
  };

  render() {
    return (
      <View left={true} right={true}>
        <p>Here we should put people pictures, or center image </p>
        <ContactForm onSubmit={this.submit} />
      </View>
    )
  }
}

export default ContactView
