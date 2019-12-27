import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import P from 'components/P'
import H2 from 'components/H2'
import View from 'components/View'
import GitHubIcon from './GibhubIcon'
import FacebookIcon from './FacebookIcon'
import messages from './messages'
// import PropTypes from 'prop-types'


class AboutView extends Component {


  render() {
    return (
      <View left={true} right={true}>
        <H2 primary={true}>Who is Arasaac</H2>
        <P>{<FormattedMessage {...messages.whatArasaacOffers} />}</P>
        <P>{<FormattedMessage {...messages.fundedBy} />}</P>
        <H2 primary={true}>Arasaac Team</H2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ margin: 10 }}>
            <a href='https://www.facebook.com/josemanuelmarcosrodrigo'><FacebookIcon />  José Manuel Marcos Rodrigo</a>
          </div>
          <div style={{ margin: 10 }}>
            <a href='https://www.facebook.com/david.romerocorral'><FacebookIcon />  David Romero Corral</a>
          </div>
          <div style={{ margin: 10 }}>
            <a href='https://github.com/lmorillas'><GitHubIcon />  Luis Miguel Morillas</a>
          </div>
          <div style={{ margin: 10 }}>
            <a href='https://github.com/juanda99'><GitHubIcon />  Juan Daniel Burró Aláez</a>
          </div>
        </div>
        <H2 primary={true}>Colaboradores de Arasaac</H2>
        <P>Arasaac tiene sentido además con la participación desinteresada de los usuarios, en la elaboración de materiales y traducciones. ¿Ponemos aquí los traductores?</P>
      </View>
    )
  }
}

export default AboutView
