import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { FormattedMessage, injectIntl } from 'react-intl'
import jp from 'jsonpath'
import Chip from 'material-ui/Chip'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router'
// import ImmutablePropTypes from 'react-immutable-proptypes'
import H3 from 'components/H3'
import { IMAGES_URL } from 'services/config'
import P from 'components/P'
import Divider from 'material-ui/Divider'
import tagMessages from 'components/PictogramTags/messages'
import messages from './messages'

const styles = {
  chip: {
    margin: '4px',
  },
}
class PictogramCategories extends Component {
  static propTypes = {
    categories: PropTypes.object.isRequired,
    pictoCategories: PropTypes.array.isRequired,
    tags: ImmutablePropTypes.list.isRequired,
    showAAC: PropTypes.bool.isRequired,
  }

  render() {
    const { categories, pictoCategories, tags, intl, showAAC } = this.props
    const tree = categories.toJSON()
    const nodes = jp.nodes(tree, '$..text')
    const nodesKeywords = jp.nodes(tree, '$..keywords')
    const categoryPaths = nodes
      .filter((node) => {
        const lastCategoryCount = node.path.length - 1
        const lastCategory = node.path[lastCategoryCount - 1]
        return pictoCategories.indexOf(lastCategory) !== -1
      })
      .sort((a, b) => {
        const aLastCategoryCount = a.path.length - 1
        const aLastCategory = a.path[aLastCategoryCount - 1]
        const bLastCategoryCount = b.path.length - 1
        const bLastCategory = b.path[bLastCategoryCount - 1]
        return (
          pictoCategories.indexOf(aLastCategory) -
          pictoCategories.indexOf(bLastCategory)
        )
      })
      .map((node) => node.path)
      .map((path) => {
        const categoryPath = []
        path.forEach((category) => {
          if (['$', 'children', 'text'].indexOf(category) === -1)
            categoryPath.push(category)
        })
        return categoryPath
      })
      .map((path) =>
        path.map((category) => {
          const text = nodes.filter((node) => {
            const lastCategoryCount = node.path.length - 1
            const lastCategory = node.path[lastCategoryCount - 1]
            return lastCategory === category
          })
          const keywords = nodesKeywords.filter((node) => {
            const lastCategoryCount = node.path.length - 1
            const lastCategory = node.path[lastCategoryCount - 1]
            return lastCategory === category
          })
          return { text: text[0].value, keyword: keywords[0].value[0] }
        })
      )
    const renderPaths = categoryPaths.map((categoryPath, index) => (
      <div key={index} style={{ display: 'flex', flexWrap: 'wrap' }}>
        {categoryPath.map((item, index) => {
          if (!index) {
            return !item.keyword ? (
              <FlatButton key={item.text} label={item.text} disabled={true} />
            ) : (
              <Link to={`/pictograms/search/${item.keyword}`}>
                <FlatButton key={item.text} label={item.text} />
              </Link>
            )
          } else {
            return item.keyword ? (
              <span key={item.text}>
                <P style={{ display: 'inline' }}> / </P>
                <Link to={`/pictograms/search/${item.keyword}`}>
                  <FlatButton key={item.text} label={item.text} />
                </Link>
              </span>
            ) : (
              <span key={item.text}>
                <P style={{ display: 'inline' }}> / </P>
                <FlatButton label={item.text} disabled={true} />
              </span>
            )
          }
        })}
      </div>
    ))
    return (
      <div>
        <H3 primary>{<FormattedMessage {...messages.taxonomy} />}</H3>
        <Divider />
        {showAAC && (
          <div>
            <div style={{ display: 'flex' }}>
              <img
                style={{ width: '40px', height: '40px' }}
                src={`${IMAGES_URL}/core-vocabulary-icon.svg`}
              />
              <P>
                <FormattedMessage {...messages.coreVocabularyIntro} />
              </P>
            </div>
            <Link
              to={`/pictograms/search/${intl.formatMessage(
                tagMessages['core vocabulary']
              )}`}
            >
              <RaisedButton
                label={<FormattedMessage {...messages.showCoreVocabulary} />}
                secondary={true}
                style={{ marginRight: '20px' }}
              />
            </Link>
            <a
              href="http://aulaabierta.arasaac.org/vocabulario-utac-cace"
              target="_blank"
            >
              <RaisedButton
                label={<FormattedMessage {...messages.knowMore} />}
                secondary={true}
              />
            </a>
          </div>
        )}

        <P>{<FormattedMessage {...messages.pictoBelongs} />}</P>
        {renderPaths.map((path) => (
          <div>{path}</div>
        ))}
        <P>{<FormattedMessage {...messages.pictoLabels} />}</P>
        {tags && (
          <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
            {tags.map((tag) => (
              <Chip key={tag} style={styles.chip}>
                {<FormattedMessage {...tagMessages[tag]} />}
              </Chip>
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default injectIntl(PictogramCategories)
