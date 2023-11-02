import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'

import AppItem from './AppItem'
import messages from './messages'

const Masonry = require('react-masonry-component')

const astericsUrl = (locale) => {
  let url = ''
  switch (locale) {
    case 'ca':
    case 'es':
    case 'an':
    case 'val':
    case 'gl':
    case 'eu':
      url = 'https://aulaabierta.arasaac.org/asterics-grid_inicio'
      break
    case 'fr':
      url = 'https://aulaabierta.arasaac.org/fr/asterics-grid_accueil'
      break
    case 'pt':
    case 'br':
      url = 'https://aulaabierta.arasaac.org/pt-pt/asterics-grid_inicio_pt'
      break
    case 'it':
      url = 'https://aulaabierta.arasaac.org/it/asterics-grid_inizio'
      break
    case 'de':
      url = 'https://aulaabierta.arasaac.org/en/asterics-grid_home'
      break
    default:
      url = 'https://aulaabierta.arasaac.org/en/asterics-grid_home'
      break
  }
  return url
}

const sequenziUrl = (locale) => {
  let url = ''
  switch (locale) {
    case 'ca':
    case 'es':
    case 'an':
    case 'val':
    case 'gl':
    case 'eu':
      url = 'https://aulaabierta.arasaac.org/sequenciaac'
      break
    case 'fr':
      url = 'https://aulaabierta.arasaac.org/fr/sequenciaac_fr'
      break
    case 'pt':
    case 'br':
      url = 'https://aulaabierta.arasaac.org/pt-pt/sequenciaac_pt'
      break
    case 'it':
      url = 'https://aulaabierta.arasaac.org/it/sequenciaac_it'
      break
    default:
      url = 'https://aulaabierta.arasaac.org/de/sequenciaac'
      break
  }
  return url
}

const pictogramAgendaUrl = (locale) => {
  let url = ''
  switch (locale) {
    case 'ca':
    case 'es':
    case 'an':
    case 'val':
    case 'gl':
    case 'eu':
      url = 'https://aulaabierta.arasaac.org/pictogramagenda-0-inicio'
      break
    case 'fr':
      url = 'https://aulaabierta.arasaac.org/fr/pictogramagenda-0-accueil'
      break
    case 'pt':
    case 'br':
      url = 'https://aulaabierta.arasaac.org/pt-pt/pictogramagenda-0-inicio-pt'
      break
    case 'it':
      url = 'https://aulaabierta.arasaac.org/it/pictogramagenda-0-inizio'
      break
    default:
      url = 'https://aulaabierta.arasaac.org/en/pictogramagenda-0-home'
      break
  }
  return url
}

const arasaacUrl = (locale) => {
  let url = ''
  switch (locale) {
    case 'ca':
    case 'es':
    case 'an':
    case 'val':
    case 'gl':
    case 'eu':
      url = 'https://aulaabierta.arasaac.org/herramientas-online-arasaac'
      break
    case 'fr':
      url = 'https://aulaabierta.arasaac.org/fr/tools-online-arasaac'
      break
    case 'pt':
    case 'br':
      url = 'https://aulaabierta.arasaac.org/pt-pt/ferramentas-online-arasaac'
      break
    case 'it':
      url = 'https://aulaabierta.arasaac.org/it/strumenti-online-arasaac'
      break
    default:
      url = 'https://aulaabierta.arasaac.org/en/tools-online-arasaac'
      break
  }
  return url
}

const styles = {
  masonry: {
    listStyleType: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 2,
    justifyContent: 'space-around',
  },
}

const AACApps = ({ intl, locale }) => {
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
          tutorialUrl={astericsUrl(locale)}
          appUrl="https://grid.asterics.eu/"
        />
        <AppItem
          title="SequenciAAC"
          desc={intl.formatMessage(messages.sequenciAAC)}
          img="sequenciAAC.jpg"
          tutorialUrl={sequenziUrl(locale)}
          appUrl="https://sequenciaac.arasaac.org/"
        />

        <AppItem
          title="PictogramAgenda"
          desc={intl.formatMessage(messages.pictogramAgenda)}
          img="pictogram-agenda.jpg"
          tutorialUrl={pictogramAgendaUrl(locale)}
          appUrl="https://www.pictogramagenda.es/"
        />
        <AppItem
          title={intl.formatMessage(messages.onlineToolsTitle)}
          desc={intl.formatMessage(messages.onlineTools)}
          img="arasaac-apps.jpg"
          tutorialUrl={arasaacUrl(locale)}
          appUrl="http://old.arasaac.org/herramientas.php"
        />
      </Masonry>
      <p></p>
    </div>
  )
}

AACApps.propTypes = {
  locale: PropTypes.string.isRequired,
}

export default injectIntl(AACApps)
