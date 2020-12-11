import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { FormattedMessage } from 'react-intl'
import { lightGreen400} from 'material-ui/styles/colors'
import jp from 'jsonpath'
import Chip from 'material-ui/Chip'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router'
// import ImmutablePropTypes from 'react-immutable-proptypes'
import H3 from 'components/H3'
import P from 'components/P'
import Divider from 'material-ui/Divider'
import  messages from './messages'


const styles = {
  chip: {
    margin: '4px'
  }
}
export default class PictogramCategories extends Component {
  static propTypes = {
    categories: PropTypes.object.isRequired,
    pictoCategories: PropTypes.array.isRequired,
    tags: ImmutablePropTypes.list.isRequired,
  }


  render() {
    const { categories, pictoCategories,  tags } = this.props
    const tree = categories.toJSON()
    const nodes = jp.nodes(tree, '$..text')
    const nodesKeywords = jp.nodes(tree, '$..keywords')
    const categoryPaths = nodes
      .filter(node => {
        const lastCategoryCount = node.path.length - 1
        const lastCategory = node.path[lastCategoryCount - 1]
        return pictoCategories.indexOf(lastCategory) !== -1
      })
      .map(node=>node.path)
      .map(path => {
        const categoryPath = []
        path.forEach((category)  => {
          if (['$', 'children', 'text'].indexOf(category)=== -1) 
            categoryPath.push(category)
          
          })
        return categoryPath
      }).map(path =>path.map((category) => {
          const text = nodes.filter(node => {
            const lastCategoryCount = node.path.length - 1
            const lastCategory = node.path[lastCategoryCount - 1]
            return lastCategory===category
          })
          const keywords = nodesKeywords.filter(node => {
            const lastCategoryCount = node.path.length - 1
            const lastCategory = node.path[lastCategoryCount - 1]
            return lastCategory===category
          })
          return {text: text[0].value, keyword: keywords[0].value[0] }
        })
      )
    const renderPaths = categoryPaths
      .map((categoryPath,  index) =>
        <div key={index} style={{display: 'flex', flexWrap: 'wrap'}}>
          { categoryPath.map((item, index) => {
            if  (!index) {
              return !item.keyword ?
                <FlatButton key={item.text} label={item.text} disabled={true}/>
              : <FlatButton key={item.text} label={item.text} disabled={true}/>
            }
            else {
              return item.keyword ?
                <span key={item.text}><P style={{display:  'inline'}}> / </P><FlatButton key={item.text} label={item.text} /></span>
              : <span key={item.text}><P style={{display:  'inline'}}> / </P><FlatButton label={item.text} /> </span>
            }
          })}
          </div>
    )
    return  (
      <div>
        <H3 primary>{<FormattedMessage {...messages.taxonomy} />}</H3>
        <Divider />
        <P>This pictogram belong to these categories:</P>
        {renderPaths.map(path => 
          <div>
            {path}
          </div>
        )}
        <P>This pictogram has been labeled as:</P>
        { tags && 
          <div style={{display: 'flex', flexWrap: 'wrap', marginTop: '10px'}}>
            {tags.map(tag =>
              <Chip  key={tag} style={styles.chip}>
                {tag}
              {/* {<FormattedMessage {...messages[tag]} />} */}
              </Chip>
            )}
          </div>
        }
      </div>
    )
  }
}
