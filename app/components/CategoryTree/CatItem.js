import React from 'react'
import PropTypes from 'prop-types'
import P from 'components/P'

const CatItem = ({ text, depth }) => {
  if (depth === 1) return <h2>{text}</h2>
  return (
    <P
      style={{ marginLeft: `${depth * 15}px` }}
      important={depth === 2 || depth === 3}
      italic={depth === 5 || depth === 3}
    >
      {text}
    </P>
  )
}

CatItem.propTypes = {
  text: PropTypes.string.isRequired,
  depth: PropTypes.number.isRequired,
}

export default CatItem
