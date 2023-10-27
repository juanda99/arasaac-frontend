import React from 'react'
import { Helmet } from 'react-helmet'
import { FormattedMessage, injectIntl } from 'react-intl'

import AppItem from './AppItem'
import messages from './messages'

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
        <title>{intl.formatMessage(messages.title)}</title>
        <meta name="description" content={intl.formatMessage(messages.desc)} />
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
          title="AsTeRICS GRID"
          desc={intl.formatMessage(messages.astericsGrid)}
          img="asterics-grid.jpg"
          tutorialUrl="https://aulaabierta.arasaac.org/asterics-grid_inicio"
          appUrl="https://grid.asterics.eu/"
        />
        <AppItem
          title="SequenciAAC"
          desc={intl.formatMessage(messages.sequenciAAC)}
          img="sequenciAAC.jpg"
          tutorialUrl="https://aulaabierta.arasaac.org/sequenciaac"
          appUrl="https://sequenciaac.arasaac.org/"
        />

        <AppItem
          title="PictogramAgenda"
          desc={intl.formatMessage(messages.pictogramAgenda)}
          img="pictogram-agenda.jpg"
          tutorialUrl="https://aulaabierta.arasaac.org/pictogramagenda-0-inicio"
          appUrl="https://www.pictogramagenda.es/"
        />
                <AppItem
          title={intl.formatMessage(messages.onlineToolsTitle)}
          desc={intl.formatMessage(messages.onlineTools)}
          img="arasaac-apps.jpg"
          tutorialUrl="https://aulaabierta.arasaac.org/herramientas-online-arasaac"
          appUrl="http://old.arasaac.org/herramientas.php"
        />

      </Masonry>
      <p></p>
    </div>
  )
}

export default injectIntl(AACApps)
