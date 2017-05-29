const LANGUAGE = 'language'
function isArray(obj) {
  return !!obj && obj.constructor === Array
}

const checkLanguage = (items, language) =>
  items.some((item) => {
    console.log(item[language])
    return item[LANGUAGE] === language || (item.translations && item.translations.some((translation) => translation[LANGUAGE] === language))
  })

export function getFilteredItems(items, filters) {
  return items.filter((e) => {
    const k = Object.keys(filters)
    return k.every((key) => {
      /* for language... */
      console.log(key)
      if (key === LANGUAGE) {
        return checkLanguage(items, filters[key])
      } else if (filters[key].length === 0 || filters[key] === '') return true /* no filter data */
      else if (typeof e[key] === 'string' || typeof e[key] === 'number') {
        return e[key] === filters[key]
      } else if (isArray(e[key])) {
        return e[key].includes(filters[key])
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
