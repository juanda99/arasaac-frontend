import React from 'react'
import PropTypes from 'prop-types'
import A from 'components/A'

const CreativeCommons = ({ locale }) =>
  locale === 'es' ? (
    <A
      href={`https://creativecommons.org/licenses/by-nc-sa/4.0/deed.${locale}`}
      target='_blank'
      alt='Creative Commons (BY-NC-SA)'
    >
      Licencia Creative Commons BY-NC-SA
    </A>
  ) : (
    <A
      href={`https://creativecommons.org/licenses/by-nc-sa/4.0/deed.${locale}`}
      target='_blank'
      alt='Creative Commons (BY-NC-SA)'
    >
      Creative Commons License BY-NC-SA
    </A>
  )

CreativeCommons.propTypes = {
  locale: PropTypes.string.isRequired
}

export default CreativeCommons
