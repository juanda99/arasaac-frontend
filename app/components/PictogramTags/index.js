import React, { Component } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import jp from 'jsonpath'
import Chip from 'material-ui/Chip'
import removeDiacritics from 'components/SearchField/removeDiacritics'
import { lightGreen400} from 'material-ui/styles/colors'
import stopWords from 'utils/stopWords'
import P  from 'components/P'
import messages from './messages'

const styles = {
  chip: {
    margin: '4px'
  }
}

/* we must render:
  none: if searchText is empty or not a category
  pictogram tags that belong to the category otherwise not present in 100% pictos + selectedTags
*/


const getTags = (searchText, categoryTree, locale) => {
    const  tree = categoryTree.toJSON()
    const nodes = jp.nodes(tree, '$..keywords')
    const categories = nodes
      .filter(node => node.value.some(keyword => removeDiacritics(stopWords(keyword, locale)).toLowerCase() === searchText))
      .map(node=>
        {
          console.log(node.path)
          // return node.path[node.path.length -2]
          return node.path[1]
        })
      if (categories.length) {
        const tags = []
        categories.forEach(categoryItem => {
          const partialData = jp.value(tree, `$..["${categoryItem}"]`)
          const newTags = getSubcategoryTags(partialData, partialData.tags)
          newTags.forEach(element => {
            tags.push(element)
          });
        })
        return tags
      }
  return []
}

const getSubcategoryTags = (tree, tags) => {
  if (tree.children && Object.keys(tree.children).length !== 0 ) {
    return Object.entries(tree.children).reduce(
      (accumulator, currentValue) => {
        if (currentValue[0]) currentValue[1].tags.forEach(tag => {
          if (tags.indexOf(tag) === -1) tags.push(tag)
        })  
        return getSubcategoryTags(currentValue[1], tags)
      }, [])
  }
  return tags
}


const PictogramTags = ({searchText, selectedTags, categories, locale, pictograms,  onUpdateTags}) => {

  const searchCategory = removeDiacritics(stopWords(searchText, locale)).toLowerCase()
  const tags = pictograms.length ? getTags(searchCategory, categories, locale) : []
  const pictoTags = new Set()
  /* we just show pictoTags present in the tree and not available  in all pictograms */
  pictograms.forEach(pictogram => 
    pictogram.tags.forEach(tag => {
      if (tags.indexOf(tag) !== -1) pictoTags.add(tag)
    })
  )
  /*  if tag is available in  all pictograms, we just remove it, we also delete selectedTags as we
  willl sort them in first place */
  pictoTags.forEach(tag => {
    if (pictograms.every( pictogram => pictogram.tags.indexOf(tag) !== -1) || selectedTags.has(tag)) pictoTags.delete(tag)
  })

  /* we  order then by frequency */
  const countOccurrences  = (item) => (accumulator, currentValue) => {
    if (currentValue.tags.indexOf(item)!==-1) return accumulator + 1
    return accumulator + 0
  }
  const tmpPictoTagsOrdered = [...pictoTags].sort((a, b) => {
    const weightA  = pictograms.reduce(countOccurrences(a), 0)
    const weightB  = pictograms.reduce(countOccurrences(b), 0)
    return weightB - weightA
  })

  const pictoTagsOrdered = [...selectedTags, ...tmpPictoTagsOrdered]

  const handleClick  = (tag) => onUpdateTags(tag)

  /* we add already selected tags */

  const renderTags = pictoTagsOrdered.map((tag) => 
    selectedTags.has(tag) ?
      <Chip backgroundColor={lightGreen400} style={styles.chip} key={tag} onClick={() => handleClick(tag)}>
        {<FormattedMessage {...messages[tag]} />}
      </Chip>
    :
      <Chip style={styles.chip} key={tag} onClick={() => handleClick(tag)}>
        {<FormattedMessage {...messages[tag]} />}
      </Chip>
  )

  return (
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      {renderTags}
    </div>
  )
}

PictogramTags.propTypes = {
  searchText: PropTypes.string,
  selectedTags: ImmutablePropTypes.set.isRequired,
  categories: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  pictograms: PropTypes.array,
}


export default PictogramTags
