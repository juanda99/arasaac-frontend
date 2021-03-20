import React from 'react'
import LanguageProvider from 'containers/LanguageProvider'
import { Link } from 'react-router'
// Import i18n messages
import { translationMessages } from '../../i18n'
import Avatar from 'material-ui/Avatar'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import jp from 'jsonpath'
import Chip from 'material-ui/Chip'
import SearchIcon from 'material-ui/svg-icons/action/search'
import P from 'components/P'
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

  const nodes = textNodes
    .map((node) => {
      const key = node.path.join()
      const keyword = keywordNodes
        .filter((node) => node.path.join() === key)
        .map((node) => node.keyword)[0]
      return { ...node, keyword, key }
    })
    .sort((a, b) => {
      // console.log(a.path[0], a)
      return a.path[0] - b.path[0]
    })

  const categoryItem = (node, depth) => (
    <CatLink keyword={node.keyword} keyprop={node.key}>
      <CatItem keyword={node.keyword} text={node.text} depth={depth} />
    </CatLink>
  )

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

  const CatItem = ({ keyword, text, depth }) => {
    if (depth === 1) return <h2>{text}</h2>
    return (
      <P style={{ marginLeft: `${depth * 10}px` }} important={depth === 2}>
        {text}
      </P>
    )
  }

  const titles = (key = '', depth = 1) =>
    nodes
      .filter((node) => node.path.length === depth)
      .filter((node) => node.key.startsWith(key))
      .map((node) =>
        node.keyword && depth > 5 ? (
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
