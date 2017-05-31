function isArray(obj) {
  return !!obj && obj.constructor === Array
}

const checkLanguage = (item, language) =>
  language.length === 0 || language.includes(item.language) || (item.translations && item.translations.some((translation) => language.includes(translation.language)))

export function getFilteredItems(items, filters) {
  return items.filter((item) => {
    const filterNames = Object.keys(filters)
    return filterNames.every((filterName) => {
      if (filterName === 'language') {
        return checkLanguage(item, filters.language)
      } else if (filters[filterName].length === 0 || filters[filterName] === '') return true /* no filter data */
      else if (typeof item[filterName] === 'string' || typeof item[filterName] === 'number') {
        return item[filterName] === filters[filterName] || filters[filterName].includes(item[filterName])
      } else if (isArray(item[filterName]) && item[filterName].length) {
        return item[filterName].some((keyItems) => filters[filterName].includes(keyItems))
      }
      return false
    })
  })
}
/*
export function getFilteredItems2(items, filters) {
  return items.filter((e) =>
    filters.map((value, key) => {
      console.log('valor ' + e[key])
      console.log('value '+ value)
      console.log('key '+ key)
      if (typeof e[key] === 'string') {
        return e[key] === value
      } else if (isArray(e[key])) {
        return e[key].includes(value)
      }
      return false
    })
  )
}
*/
