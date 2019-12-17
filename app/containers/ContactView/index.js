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
    const pictos = [
      35677,
      35679,
      35681,
      35665,
      35631,
      35683,
      35685,
      35687,
      35691,
      35693
    ]
    const idPictogram = pictos[Math.floor(Math.random() * pictos.length)]
    return (
      <View left={true} right={true}>
        <p>Here we should put people pictures, or center image </p>
        <ContactForm onSubmit={this.submit} idPictogram={idPictogram} />
      </View>
    )
  }
}

export default ContactView
