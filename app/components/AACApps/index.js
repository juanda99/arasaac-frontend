import React from 'react'
import { Helmet } from 'react-helmet'
import { FormattedMessage, injectIntl } from 'react-intl'

import AppItem from './AppItem'
// import messages from './messages'

const Masonry = require('react-masonry-component')

const styles = {
  masonry: {
    listStyleType: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 2,
    justifyContent: 'space-around',
  },
}

const AACApps = ({ intl }) => {
  const masonryOptions = {
    transitionDuration: '1s',
    // isOriginLeft: !rtl
  }

  return (
    <div>
      <Helmet>
        <title>AAC Apps and software</title>
        <meta name="description" content="desc" />
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>

      <Masonry
        className={'my-gallery-class'} // default ''
        elementType={'div'} // default 'div'
        options={masonryOptions} // default {}
        disableImagesLoaded={false} // default false
        style={styles.masonry}
      >
        <AppItem
          title="Aplicaciones de ARASAAC"
          desc="Las Herrramientas online de ARASAAC permiten, sin tener que instalar
            ningún software en el ordenador, elaborar una serie de juegos, como
            bingos, ocas o dominós, y recursos relacionados con la organización
            del tiempo como horarios o calendarios."
          img="arasaac-apps.jpg"
          tutorialUrl="https://aulaabierta.arasaac.org/herramientas-online-arasaac"
          appUrl="http://old.arasaac.org/herramientas.php"
        />
        <AppItem
          title="PictogramAgenda"
          desc="PictogramAgenda es una aplicación que facilita la generación y uso
            de agendas visuales. Tiene versión web online e insalable para
            Android e iOS. Permite configurar y ordenar una secuencia de
            imágenes o pictogramas que formarán la agenda visual."
          img="pictogram-agenda.jpg"
          tutorialUrl="https://aulaabierta.arasaac.org/pictogramagenda-0-inicio"
          appUrl="https://www.pictogramagenda.es/"
        />
        <AppItem
          title="AsTeRICS GRID"
          desc="AsTeRICS Grid es un comunicador dinámico multiplataforma, gratuito
            y personalizable, que permite la utilización de pictogramas,
            imágenes y signos ortográficos para facilitar la comunicación y la
            participación a todas las personas. Asterics Grid es un desarrollo
            de la UAS Technikum Wien y la Fundación Asterics con sede en Viena
            (Austria)."
          img="asterics-grid.jpg"
          tutorialUrl="https://aulaabierta.arasaac.org/asterics-grid_inicio"
          appUrl="https://grid.asterics.eu/"
        />
        <AppItem
          title="SequenciAAC"
          desc="SequenciAAC es una aplicación web gratuita que permite elaborar e
            imprimir secuencias visuales para la comprensión, anticipación y
            ejecución de actividades y tareas de la vida cotidiana."
          img="sequenciAAC.jpg"
          tutorialUrl="https://www.youtube.com/watch?v=Z3Z4Z3Z3Z3Z"
          appUrl="https://catedu.gitbooks.io/arasaac/content/"
        />
      </Masonry>
      <p></p>
    </div>
  )
}

export default injectIntl(AACApps)
