function isArray(obj) {
  return !!obj && obj.constructor === Array
}

const checkLanguage = (item, language) =>
  language.length === 0 || language.includes(item.language) || (item.translations && item.translations.some((translation) => language.includes(translation.language)))

export function getFilteredItems(items, filters) {
  return items.filter((item) => {
    const k = Object.keys(filters)
    return k.every((key) => {
      if (key === 'Language') {
        return checkLanguage(item, filters.Language)
      } else if (filters[key].length === 0 || filters[key] === '') return true /* no filter data */
      else if (typeof item[key] === 'string' || typeof item[key] === 'number') {
        return item[key] === filters[key]
      } else if (isArray(item[key])) {
        return item[key].includes(filters[key])
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
