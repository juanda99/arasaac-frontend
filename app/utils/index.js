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
