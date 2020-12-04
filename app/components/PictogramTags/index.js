import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import jp from 'jsonpath'
import Chip from 'material-ui/Chip'
import removeDiacritics from 'components/SearchField/removeDiacritics'
import stopWords from 'utils/stopWords'

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
    const nodes = jp.nodes(categoryTree.toJSON(), '$..keywords')
    const categories = nodes
      .filter(node => node.value.some(keyword => removeDiacritics(stopWords(keyword, locale)).toLowerCase() === searchText))
      .map(node=>node.path[node.path.length -2])
    // if (categories.length) {
    //   return categories
    //   const subCategories = []
    //   categories.forEach(categoryItem => {
    //     const partialData = jp.value(category.data, `$..["${categoryItem}"]`)
    //     const newCategories = getSubcategories(partialData, [categoryItem])
    //     newCategories.forEach(element => {
    //       subCategories.push(element)
    //     });
    //   })
    console.log(categories)
  return 'finished!'
}


const PictogramTags = ({searchText, selectedTags, categories, locale}) => {

  const searchCategory = removeDiacritics(stopWords(searchText, locale)).toLowerCase()
  const  tags = getTags(searchCategory, categories, locale)


  // const tags = selectedTags.map((id) => {
  //     const key = areas.filter(item => item.code === id)[0].text
  //     return (
  //       <Chip style={styles.chip} key={id} onClick={() => this.handleAreaClick(id)}>
  //         <FormattedMessage {...classificationMessages[key]} />
  //       </Chip>
  //     )
  //   })
  return (
    <div>
      <p>{tags}</p>
    </div>
  )
}

PictogramTags.propTypes = {
  searchText: PropTypes.string,
  selectedTags: PropTypes.array,
  cagegories: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
}


export default PictogramTags
