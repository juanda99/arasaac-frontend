import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

const CatLink = ({ keyword, key, children }) =>
  keyword ? (
    <Link key={key} to={`/pictograms/search/${encodeURIComponent(keyword)}`}>
      {children}
    </Link>
  ) : (
    <div>{children}</div>
  )

CatLink.propTypes = {
  key: PropTypes.string.isRequired,
  keyword: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default CatLink
