import removeDiacritics from './removeDiacritics'
const customFilter = (searchText, key) => searchText.length >= 1 && removeDiacritics(key).toLowerCase().indexOf(removeDiacritics(searchText).toLowerCase()) !== -1
export default customFilter

/*
AutoComplete.caseInsensitiveFilter = (searchText, key) => {
  return key.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
};
*/