import React, { Component } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import LanguageProvider from 'containers/LanguageProvider'
// Import i18n messages
import { translationMessages } from '../../i18n'
import Avatar from 'material-ui/Avatar'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import jp from 'jsonpath'
import Chip from 'material-ui/Chip'
import removeDiacritics from 'components/SearchField/removeDiacritics'
import { lightGreen400} from 'material-ui/styles/colors'
import SearchIcon from 'material-ui/svg-icons/action/search';
import stopWords from 'utils/stopWords'
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
    const tree = categoryTree.toJSON()
    const nodes = jp.nodes(tree, '$..keywords')
    const categories = nodes
      .filter(node => node.value.some(keyword => removeDiacritics(stopWords(keyword, locale)).toLowerCase() === searchText))
      .map(node=>node.path[1])
      if (categories.length) {
        const tags = []
        categories.forEach(categoryItem => {
          const partialData = jp.value(tree, `$..["${categoryItem}"]`)
          const newTags = getSubcategoryTags(partialData, partialData.tags)
          newTags.forEach(element => tags.push(element))
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


const getKeywords = (pictoCategories, categoryTree) => {
  const tree = categoryTree.toJSON()
  const nodes = jp.nodes(tree, '$..keywords')
  const keywords = pictoCategories.reduce(
    (accumulator, currentValue) => {
      const keywords = nodes.filter(node=>node.path[node.path.length -2]===currentValue).map(node => node.value)
      return keywords[0].length ? [...accumulator, keywords[0][0]] : accumulator
    }, [])
  return keywords
}


const PictogramTags = ({searchText, selectedTags, categories, locale, pictograms,  onUpdateTags, onCategoryClick}) => {

  const searchCategory = removeDiacritics(stopWords(searchText, locale)).toLowerCase()
  const tags = pictograms.length ? getTags(searchCategory, categories, locale) : null
  let renderTags

  if (tags.length) {
    /*  if search is a category, tags wont' be empty and we use tags as filter, in other  case
    we wet categories of first pictogram to give suggestions */
    const pictoTags = new Set()
    /* we just show pictoTags present in the tree and not available  in all pictograms */
    pictograms.forEach(pictogram => 
      pictogram.tags.forEach(tag => {
        if (tags.indexOf(tag) !== -1) pictoTags.add(tag)
      })
    )
    /*  if tag is available in  all pictograms, we just remove it, we also delete selectedTags as we
    will sort them in first place */
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

    renderTags = pictoTagsOrdered.map((tag) => 
      selectedTags.has(tag) ?
        <Chip backgroundColor={lightGreen400} style={styles.chip} key={tag} onClick={() => handleClick(tag)}>
          {<FormattedMessage {...messages[tag]} />}
        </Chip>
      :
        <Chip style={styles.chip} key={tag} onClick={() => handleClick(tag)}>
          {<FormattedMessage {...messages[tag]} />}
        </Chip>
    )

  }

  else {
    const pictoCategories = pictograms
      .filter(pictogram =>
        pictogram.keywords.some(keyword =>
          searchCategory===removeDiacritics(stopWords(keyword.keyword, locale)).toLowerCase()))
      .map(pictogram=> pictogram.categories)
    const mergedCategories  = [].concat.apply([], pictoCategories)
    const keywords = getKeywords(mergedCategories, categories)
    renderTags = (
      keywords.map((keyword) => 
          <Chip style={styles.chip} key={keyword} onClick={() => onCategoryClick(keyword)}>
          <Avatar icon={<SearchIcon />} />
            {keyword}			
          </Chip>
      )
    )
  }



  return (
    <LanguageProvider messages={translationMessages} paramLocale={locale}>
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {renderTags}
      </div>
    </LanguageProvider>
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
