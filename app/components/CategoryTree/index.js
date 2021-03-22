import React, { Component } from 'react'
import { lightGreen400 } from 'material-ui/styles/colors'
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
class CategoryTree extends Component {
  state = {
    nodes: [],
    selectedKey: '',
    selectedSubKey: '',
  }

  componentDidMount() {
    const tree = this.props.categories.toJSON()
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
    this.setState({ nodes })
  }

  getCategories = (nodes, key = '', depthStart = 0, depth = 1) =>
    nodes
      .filter((node) => node.path.length === depth)
      .filter((node) => node.key.startsWith(key))
      .map((node) => (
        <div>
          {this.categoryItem(node, depth - depthStart)}
          {this.getCategories(nodes, node.key, depthStart, depth + 1)}
        </div>
      ))

  categoryItem = (node, depth) => (
    <CatLink keyword={node.keyword} keyprop={node.key}>
      <CatItem keyword={node.keyword} text={node.text} depth={depth} />
    </CatLink>
  )

  handleCatClick = (selectedKey) => {
    if (selectedKey !== this.state.selectedKey) {
      this.setState({ selectedKey, selectedSubKey: '' })
    }
  }
  handleSubCatClick = (selectedSubKey) => this.setState({ selectedSubKey })

  getBaseCategories = (nodes, selectedKey) =>
    nodes
      .filter((node) => node.path.length === 1)
      .map((node) =>
        node.key === selectedKey ? (
          <Chip
            key={node.key}
            style={styles.chip}
            backgroundColor={lightGreen400}
            onClick={() => this.handleCatClick(node.key)}
          >
            {node.text}
          </Chip>
        ) : (
          <Chip
            key={node.key}
            style={styles.chip}
            onClick={() => this.handleCatClick(node.key)}
          >
            {node.text}
          </Chip>
        )
      )

  getBaseSubCategories = (nodes, selectedKey, selectedSubKey) =>
    nodes
      .filter(
        (node) => node.key.startsWith(selectedKey) && node.path.length === 2
      )
      .filter((node) => !node.key.includes('core vocabulary-knowledge'))
      .filter((node) => !node.key.includes('core vocabulary-living being'))
      .map((node) => {
        const key = node.key.substr(selectedKey.length + 1)
        return selectedSubKey && node.key.indexOf(selectedSubKey) !== -1 ? (
          <Chip
            key={node.key}
            style={styles.chip}
            backgroundColor={lightGreen400}
            onClick={() => this.handleSubCatClick(key)}
          >
            {node.text}
          </Chip>
        ) : (
          <Chip
            key={node.key}
            style={styles.chip}
            onClick={() => this.handleSubCatClick(key)}
          >
            {node.text}
          </Chip>
        )
      })

  render() {
    const { nodes, selectedKey, selectedSubKey } = this.state
    const { locale } = this.props
    let renderSubCategories = ''
    if (selectedKey === 'living being' || selectedKey === 'knowledge') {
      renderSubCategories = (
        <div>
          <P>Elige subcategoría:</P>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {this.getBaseSubCategories(nodes, selectedKey, selectedSubKey)}
          </div>
        </div>
      )
    }
    let renderTree = ''
    if (selectedSubKey) {
      renderTree = this.getCategories(
        nodes,
        `${selectedKey},${selectedSubKey}`,
        1,
        2
      )
    } else if (
      selectedKey &&
      selectedKey !== 'living being' &&
      selectedKey !== 'knowledge'
    ) {
      renderTree = this.getCategories(nodes, selectedKey)
    }

    return (
      <LanguageProvider messages={translationMessages} paramLocale={locale}>
        <div>
          <P>
            Los pictogramas de ARASAAC están agrupados por categorias. Pulsa en
            cualquiera de las categorías principales para obtener más
            información.
          </P>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {this.getBaseCategories(nodes, selectedKey)}
          </div>
          {renderSubCategories}
          {renderTree}
        </div>
      </LanguageProvider>
    )
  }
}

CategoryTree.propTypes = {
  categories: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
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

const CatItem = ({ keyword, text, depth }) => {
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

export default CategoryTree
