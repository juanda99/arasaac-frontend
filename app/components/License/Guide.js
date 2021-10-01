import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import messages from './messages'

import A from 'components/A'

const Guide = ({ locale }) => (
  <span>
    <A
      href={`https://aulaabierta.arasaac.org/senalizacion-de-espacios-publicos-y-servicios-con-pictogramas-de-arasaac`}
      target="_blank"
      alt="Aula Abierta resources"
    >
      <FormattedMessage {...messages.urlGuideAulaAbierta} />
    </A>
    {locale !== 'es' && <FormattedMessage {...messages.onlySpanish} />}
  </span>
)

Guide.propTypes = {
  locale: PropTypes.string.isRequired,
}

export default Guide
