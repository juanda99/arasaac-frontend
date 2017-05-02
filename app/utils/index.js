function isArray(obj) {
  return !!obj && obj.constructor === Array
}

export function getFilteredItems(items, filters) {
  return items.filter((e) => {
    const k = Object.keys(filters)
    return k.every((key) => {
      if (typeof e[key] === 'string') {
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
