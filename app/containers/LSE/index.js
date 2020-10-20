import React, { Component } from 'react'
import {Helmet} from 'react-helmet'
import P from 'components/P'
import H2 from 'components/H2'
import View from 'components/View'
import ReadMargin from 'components/ReadMargin'
import RaisedButton from 'material-ui/RaisedButton'

// import PropTypes from 'prop-types'


class LSEView extends Component {



  render() {
    return (
      <View left={true} right={true}>
        <Helmet>
          <title>Lengua de signos española (LSE) - ARASAAC</title>
          <meta name="description" content="Catálogo de videos e imágenes de la lengua española de signos (LSE). Disponible para consulta y descarga." />
          {/* <link rel="canonical" href="http://mysite.com/example" /> */}

        </Helmet>
        <ReadMargin>
          <H2 primary={true}>Lengua de signos española (LSE)</H2>
          <P>Estamos trabajando para importar la lengua de signos del <a href="http://old.arasaac.org" target="_blank">antiguo portal de ARASAAC</a>.</P>
          <P>Esperamos que esté disponible durante el mes de noviembre de 2020.</P>
          <P>Mientras tanto puedes acceder desde la web antigua:</P>
          <a href="http://old.arasaac.org/videos_lse.php" target="_blank" ><RaisedButton primary={true} label={"Acceder a videos de acepciones (LSE)"}  style={{marginTop:10, marginRight: 20, minWidth: 310}}  /></a>
          <a href="http://old.arasaac.org/signos_lse_color.php" target="_blank" ><RaisedButton primary={true} label={"Aceder a catálogo de signos (LSE)"} style={{ marginTop: 10, marginBottom: 20, marginRight: 20,  minWidth: 310 }} /></a>
        </ReadMargin>


      </View >
    )
  }
}

export default LSEView
