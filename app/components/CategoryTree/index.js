import React, { Component } from 'react'
import { lightGreen400 } from 'material-ui/styles/colors'
import LanguageProvider from 'containers/LanguageProvider'
// Import i18n messages
import { translationMessages } from '../../i18n'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import jp from 'jsonpath'
import Chip from 'material-ui/Chip'
import P from 'components/P'
import CatLink from './CatLink'
import CatItem from './CatItem.js'
import messages from './messages'

const styles = {
  chip: {
    margin: '4px',
  },
}
class CategoryTree extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nodes: this.getNodes(props.categories),
    }
  }

  componentDidMount() {
    if (!this.state.nodes || this.state.nodes.length === 0) {
      this.setState({ nodes: this.getNodes(this.props.categories) })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.categories !== nextProps.categories ||
      this.props.locale !== nextProps.locale
    ) {
      this.setState({ nodes: this.getNodes(nextProps.categories) })
    }
  }

  getNodes(categories) {
    if (!categories || !categories.toJSON) return []
    const tree = categories.toJSON()
    const textNodes = jp.nodes(tree, '$..text').map((node) => {
      const path = node.path.filter(
        (item) => ['$', 'children', 'text'].indexOf(item) === -1
      )
      return { text: node.value, path }
    })
    const keywordNodes = jp.nodes(tree, '$..keywords').map((node) => {
      const path = node.path.filter(
        (item) => ['$', 'children', 'keywords'].indexOf(item) === -1
      )
      return { keyword: node.value[0] || '', path }
    })

    const nodes = textNodes.map((node) => {
      const key = node.path.join()
      const keywordItem = keywordNodes.find((kn) => kn.path.join() === key)
      const keyword = (keywordItem && keywordItem.keyword) || node.text
      return { ...node, keyword, key }
    })
    return nodes
  }

  getCategories = (nodes, key = '', depthStart = 0, depth = 1) =>
    nodes
      .filter((node) => node.path.length === depth)
      .filter((node) => node.key.startsWith(key))
      .map((node) => (
        <div key={node.key}>
          {this.categoryItem(node, depth - depthStart)}
          {this.getCategories(nodes, node.key, depthStart, depth + 1)}
        </div>
      ))

  categoryItem = (node, depth) => (
    <CatLink keyword={node.keyword || node.text} key={node.key}>
      <CatItem text={node.text} depth={depth} />
    </CatLink>
  )

  handleCatClick = (selectedKey) => {
    if (selectedKey !== this.props.selectedKey) {
      this.props.onCatChange(selectedKey)
    }
  }
  handleSubCatClick = (selectedSubKey) =>
    this.props.onSubCatChange(selectedSubKey)

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
    const { nodes } = this.state
    const { selectedKey, selectedSubKey } = this.props
    const { locale } = this.props
    let renderSubCategories = ''
    if (selectedKey === 'living being' || selectedKey === 'knowledge') {
      renderSubCategories = (
        <div>
          <P>
            <FormattedMessage {...messages.chooseSubcategory} />
          </P>
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
  selectedKey: PropTypes.string.isRequired,
  selectedSubKey: PropTypes.string,
  categories: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  onCatChange: PropTypes.func.isRequired,
  onSubCatChange: PropTypes.func.isRequired,
}

export default CategoryTree
