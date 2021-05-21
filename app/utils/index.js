import { PICTOGRAMS_URL, IMAGES_URL } from 'services/config'
export const ARASAAC = 'arasaac'
export const GOOGLE = 'google'
export const FACEBOOK = 'facebook'
export const FB_CLIENT_TOKEN = '1687810071473822|kI26Z4s_U5SYFBZLBc_sTR9QJYc'
/* for material status */
export const NOT_PUBLISHED = 0
export const PUBLISHED = 1
export const PENDING = 2

function isArray(obj) {
  return !!obj && obj.constructor === Array
}

export const isEmptyObject = (object) => Object.entries(object).length === 0

export const DEFAULT_LIST = 'defaultList'

export const DEFAULT_PROFILE_PICTURE = `${PICTOGRAMS_URL}/28307/28307_300.png`
// export const DEFAULT_AVATAR_PICTURE = `${IMAGES_URL}/arasaac-avatar.gif`

export const getDirection = (locale) =>
  locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr'

const checkLanguage = (item, language) => {
  const prueba =
    !language ||
    language === item.language ||
    (item.translations &&
      item.translations.some((translation) => language === translation.lang))
  return prueba
}

export const getFilteredItems = (items, filters) =>
  items.filter((item) => {
    const [...filterNames] = filters.keys()
    return filterNames.every((filterName) => {
      // filterName can have a name different to material structure... small hack:
      let fieldName = filterName
      if (filterName === 'activity') fieldName = 'activities'
      else if (filterName === 'area') fieldName = 'areas'
      if (filterName === 'language') {
        return checkLanguage(item, filters.get(filterName))
      } else if (filters.get(filterName) === '') {
        return true
      } else if (
        typeof item[fieldName] === 'string' ||
        typeof item[fieldName] === 'number'
      ) {
        return (
          item[fieldName] === filters.get(filterName) ||
          filters.get(filterName) === item[fieldName]
        )
      } else if (isArray(item[fieldName]) && item[fieldName].length) {
        return item[fieldName].some(
          (keyItems) => filters.get(filterName) === keyItems
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
  let keyword = keywords.find(
    (keywordsItem) =>
      keywordsItem.keyword &&
      keywordsItem.keyword.toLowerCase() === searchText.toLowerCase()
  )
  if (keyword) return keyword

  // otherwise, return first partial match or fist keyword if no matches
  keyword = keywords.find((keywordsItem) => {
    if (!keywordsItem.keyword) return false
    const keywordArray = keywordsItem.keyword
      .split(' ')
      .map((keyword) => keyword.toLowerCase())
    return searchTextArray.some((word) =>
      keywordArray.includes(word.toLowerCase())
    )
  })
  if (keyword) return keyword

  const regexp = new RegExp(searchText, 'i')
  keyword = keywords.find((keywordsItem) => {
    if (!keywordsItem.keyword) return false
    //  use regex for phonemen
    return regexp.test(keywordsItem.keyword)
  })
  if (keyword) return keyword
  return keywords[0] || emptyResponse
}

/* for hair and skin options, get object key for a given value */
export const getKeyByValue = (object, value) =>
  Object.keys(object).find((key) => object[key] === value)

export const getMongoDBLanguage = (language) => {
  switch (language) {
    case 'da':
    case 'nl':
    case 'en':
    case 'fi':
    case 'fr':
    case 'de':
    case 'hu':
    case 'it':
    case 'nb':
    case 'pt':
    case 'ro':
    case 'ru':
    case 'es':
    case 'sv':
    case 'tr':
      return language
    default:
      return 'none'
  }
}

export const getAreaUrl = (id) => `/materials/search?area=${id}`
export const getActivityUrl = (id) => `/materials/search?activity=${id}`

export const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1)
