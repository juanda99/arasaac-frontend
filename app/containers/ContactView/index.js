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
      6972,
      7291,
      7027,
      7283,
      7005,
      6979,
      7241,
      7248,
      7189,
      7188,
      7025
    ]
    const idPictogram = pictos[Math.floor(Math.random() * pictos.length)]
    return (
      <View left={true} right={true}>
        <p>Here we should put people pictures, or center image </p>
        <ContactForm onSubmit={this.submit} idPictogram={idPictogram} pictograms={pictos} />
      </View>
    )
  }
}

export default ContactView
