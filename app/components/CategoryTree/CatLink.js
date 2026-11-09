import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

const CatLink = ({ keyword, children }) =>
  keyword ? (
    <Link to={`/pictograms/search/${encodeURIComponent(keyword)}`}>
      {children}
    </Link>
  ) : (
    <div>{children}</div>
  )

CatLink.propTypes = {
  keyword: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default CatLink
