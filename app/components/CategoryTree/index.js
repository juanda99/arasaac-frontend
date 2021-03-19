import React, { Component } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import LanguageProvider from 'containers/LanguageProvider'
import { Link } from 'react-router'
// Import i18n messages
import { translationMessages } from '../../i18n'
import Avatar from 'material-ui/Avatar'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import jp from 'jsonpath'
import Chip from 'material-ui/Chip'
import removeDiacritics from 'components/SearchField/removeDiacritics'
import { lightGreen400 } from 'material-ui/styles/colors'
import SearchIcon from 'material-ui/svg-icons/action/search'
import stopWords from 'utils/stopWords'
import { not } from 'ip'
import { bindKey } from 'lodash'
// import messages from './messages'

const styles = {
  chip: {
    margin: '4px',
  },
}

const CategoryTree = ({ categories, locale }) => {
  if (categories.size === 0) return <div></div>

  const tree = categories.toJSON()

  const textNodes = jp.nodes(tree, '$..text').map((node) => {
    const path = node.path.filter(
      (item) => ['$', 'children', 'text'].indexOf(item) === -1
    )
    return { text: node.value, path: path }
  })
  const keywordNodes = jp.nodes(tree, '$..keywords').map((node) => {
    const path = node.path.filter(
      (item) => ['$', 'children', 'keywords'].indexOf(item) === -1
    )
    return { keyword: node.value[0] || '', path: path }
  })

  const nodes = textNodes.map((node) => {
    const key = node.path.join()
    const keyword = keywordNodes
      .filter((node) => node.path.join() === key)
      .map((node) => node.keyword)[0]
    return { ...node, keyword, key }
  })

  const categoryItem = (node, depth) => {
    if (depth === 1) {
      return (
        <CatLink keyword={node.keyword} keyprop={node.key}>
          <h3 key={node.key}>{node.text}</h3>
        </CatLink>
      )
    } else if (depth === 2) {
      return (
        <CatLink keyword={node.keyword} keyprop={node.key}>
          <h4
            style={{ display: node.keyword ? 'inline' : 'block' }}
            key={node.key}
          >
            {node.text}
          </h4>
        </CatLink>
      )
    } else if (depth === 3) {
      return (
        <CatLink keyword={node.keyword} keyprop={node.key}>
          <h5
            style={{ display: node.keyword ? 'inline' : 'block' }}
            key={node.key}
          >
            {node.text}
          </h5>
        </CatLink>
      )
    } else if (depth === 4) {
      return (
        <CatLink keyword={node.keyword} keyprop={node.key}>
          <h6
            style={{ display: node.keyword ? 'inline' : 'block' }}
            key={node.key}
          >
            {node.text}
          </h6>
        </CatLink>
      )
    }
  }

  const CatLink = ({ keyword, keyprop, children }) =>
    keyword ? (
      <Link
        key={keyprop}
        to={`/pictograms/search/${encodeURIComponent(keyword)}`}
      >
        {children}
      </Link>
    ) : (
      <div>{children}</div>
    )

  const titles = (key = '', depth = 1) =>
    nodes
      .filter((node) => node.path.length === depth)
      .filter((node) => node.key.startsWith(key))
      .map((node) =>
        node.keyword && depth > 1 ? (
          categoryItem(node, depth)
        ) : (
          <div>
            {categoryItem(node, depth)}
            {titles(node.key, depth + 1)}
          </div>
        )
      )

  return (
    <LanguageProvider messages={translationMessages} paramLocale={locale}>
      <div>
        <h2>Arbol de Categorías</h2>
        {titles()}
      </div>
    </LanguageProvider>
  )
}

CategoryTree.propTypes = {
  categories: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
}

export default CategoryTree
