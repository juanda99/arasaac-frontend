function isArray(obj) {
  return !!obj && obj.constructor === Array
}

export const isEmptyObject = (object) => Object.entries(object).length === 0

export const DEFAULT_LIST = 'defaultList'

const checkLanguage = (item, language) =>
  language.size === 0 ||
  language.includes(item.language) ||
  (item.translations &&
    item.translations.some((translation) =>
      language.includes(translation.language)
    ))

export const getFilteredItems = (items, filters) =>
  items.filter((item) => {
    const [...filterNames] = filters.keys()
    return filterNames.every((filterName) => {
      if (filterName === 'language') {
        return checkLanguage(item, filters.get('language'))
      } else if (
        filters.get(filterName).size === 0 ||
        filters.get(filterName) === ''
      ) {
        return true
      } else if (
        typeof item[filterName] === 'string' ||
        typeof item[filterName] === 'number'
      ) {
        return (
          item[filterName] === filters.get(filterName) ||
          filters.get(filterName).includes(item[filterName])
        )
      } else if (isArray(item[filterName]) && item[filterName].length) {
        return item[filterName].some((keyItems) =>
          filters.get(filterName).includes(keyItems)
        )
      }
      return false
    })
  })

/* inside pictograms, check which keywords meets an specific searchText */
export const keywordSelector = (searchText, keywords) => {
  const emptyResponse = { keyword: '' }
  if (keywords.length === 0) return emptyResponse
  const searchTextArray = searchText ? searchText.split(' ') : []
  if (!searchTextArray.length) return keywords[0]
  // if same keyword exists, return it
  const keyword = keywords.find(
    (keywordsItem) => keywordsItem.keyword && keywordsItem.keyword.toLowerCase() === searchText.toLowerCase(),
  )
  if (keyword) return keyword
  // otherwise, return first partial match or fist keyword if no matches
  return (
    keywords.find((keywordsItem) => {
      if (!keywords.keyword) return false
      const keywordArray = keywordsItem.keyword.split(' ').map((keyword) => keyword.toLowerCase())
      return searchTextArray.some((word) => keywordArray.includes(word.toLowerCase()))
    }) ||
    keywords[0] ||
    emptyResponse
  )
}

/* for hair and skin options, get object key for a given value */
export const getKeyByValue = (object, value) =>
  Object.keys(object).find((key) => object[key] === value)

/* if changed, we should also update pictograms reducer */
export const languages = [
  {
    code: 'es',
    text: 'Español'
  },
  {
    code: 'en',
    text: 'English'
  },
  {
    code: 'ar',
    text: 'عربى'
  },
  {
    code: 'bg',
    text: 'български'
  },
  {
    code: 'br',
    text: 'Português do Brasil'
  },
  {
    code: 'ca',
    text: 'Català'
  },
  {
    code: 'de',
    text: 'Deutsche'
  },
  {
    code: 'eu',
    text: 'Euskal'
  },
  {
    code: 'fr',
    text: 'Français'
  },
  {
    code: 'gl',
    text: 'Galego'
  },
  {
    code: 'he',
    text: 'עברי' // hebreo
  },
  {
    code: 'hr',
    text: 'Hrvatski'
  },
  {
    code: 'it',
    text: 'Italiano'
  },
  {
    code: 'nl',
    text: 'Nederlands'
  },
  {
    code: 'pl',
    text: 'Polskie'
  },
  {
    code: 'pt',
    text: 'Português'
  },
  {
    code: 'ro',
    text: 'Română'
  },
  {
    code: 'ru',
    text: 'Pусский'
  },
  {
    code: 'val',
    text: 'Valencia'
  },
  {
    code: 'zh',
    text: '简体中文）'
  }
]
