function isArray(obj) {
  return !!obj && obj.constructor === Array
}

const checkLanguage = (item, language) =>
  language.size === 0 || language.includes(item.language) || (item.translations && item.translations.some((translation) => language.includes(translation.language)))

export const getFilteredItems = (items, filters) =>
  items.filter((item) => {
    const [...filterNames] = filters.keys()
    return filterNames.every((filterName) => {
      if (filterName === 'language') {
        return checkLanguage(item, filters.get('language'))
      } else if (filters.get(filterName).size === 0 || filters.get(filterName) === '') {
        return true
      } else if (typeof item[filterName] === 'string' || typeof item[filterName] === 'number') {
        return item[filterName] === filters.get(filterName) || filters.get(filterName).includes(item[filterName])
      } else if (isArray(item[filterName]) && item[filterName].length) {
        return item[filterName].some((keyItems) => filters.get(filterName).includes(keyItems))
      }
      return false
    })
  })

/* inside pictograms, check which keywords meets an specific searchText */
export const keywordSelector = (searchText, keywords) => {
  const searchTextArray = searchText.split(' ')
  if (!searchTextArray.length) return keywords[0]
  return keywords.find(
    (keywordsItem) => {
      const keywordArray = keywordsItem.keyword.split(' ')
      const found = searchTextArray.some(
        (word) => keywordArray.includes(word)
      )
      return found
    }
  ) || keywords[0] /* in case find doesn't get any results, we get first one */
}
