import stopwords from 'stopwords-iso'
import sw from 'stopword'

const stopWords = (searchText, locale) => {
  let newLocale = locale
  if (locale==='zh' || locale==='hr') return searchText
  if (locale==='val') newLocale='ca'
  if (locale==='br') newLocale='pt'
  /* hack to search for "personas de  estado", and not "personas" as estado is  a stopword */
  if (locale==='es') {
    const index = stopwords['es'].indexOf('estado')
    if (index > -1) {
      stopwords['es'].splice(index, 1)
    }
  }
  let searchItems = searchText.split(' ')
  if (searchItems.length===1) return searchText
  return sw.removeStopwords(searchItems, stopwords[newLocale]).join(' ')
}

export default stopWords