import React, { Component } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
// import PropTypes from 'prop-types'
import View from 'components/View'
import ReadMargin from 'components/ReadMargin'
import Image from 'components/PictogramSnippet/Image'
import H3 from 'components/H3'
import A from 'components/A'
import P from 'components/P'
import { Helmet } from 'react-helmet'
import messages from './messages'

class DevCollaboratorsView extends Component {
  render() {
    const { formatMessage } = this.props.intl
    const title = formatMessage(messages.pageTitle)
    return (
      <View left={true} right={true}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <ReadMargin>
          <P>
            <FormattedMessage {...messages.collaboratorsARASAAC} />
          </P>
          <H3 primary={true}>Eduardo Lleida Solano</H3>
          <img
            src="https://static.arasaac.org/images/collaborators/eduardo-lleida.jpg"
            alt="Eduardo Lleida"
          />
          <P>
            Catedrático de{' '}
            <A href="https://diec2.unizar.es/" target="_blank">
              Universidad Departamento de Ingeniería Electrónica y
              Comunicaciones
            </A>{' '}
            ,
            <A href="http://vivolab.i3a.es" target="_blank">
              Vivolab,
            </A>
            Instituto de Investigación en Ingeniería de Aragón, Universidad de
            Zaragoza
          </P>
          <P>
            Creación y desarrollo de la API que integra el Procesamiento del
            Lenguaje Natural (PLN), mediante Inteligencia Artificial (IA) en
            aplicaciones y software relacionado con la Comunicación Aumentativa
            y Alternativa (CAA). Este API realiza las flexiones gramaticales
            (conjugación de verbos, concordancia de género y número…) de forma
            automática en español y puede ser utilizada en actividades de
            comunicación y de modelamiento del lenguaje a través del Lenguaje
            Natural Asistido (LNA).
          </P>
          <H3 primary={true}>Lorenzo Moreno</H3>
          <img
            src="https://static.arasaac.org/images/collaborators/lorenzo-moreno.jpg"
            alt="Lorenzo Moreno"
          />
          <P>
            Ingeniero Informático. Desarrollador de software, especializado en
            aplicaciones móviles y soluciones web.
          </P>
          <A
            alternative={false}
            href="https://www.lorenzomoreno.com/"
            target="_blank"
          >
            {' '}
            https://www.lorenzomoreno.com/
          </A>
          <A />
        </ReadMargin>
      </View>
    )
  }
}

export default injectIntl(DevCollaboratorsView)
