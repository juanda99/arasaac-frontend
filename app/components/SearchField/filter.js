import removeDiacritics from "./removeDiacritics";
const customFilter = (searchText, key) =>
  searchText.length >= 1 &&
  removeDiacritics(key)
    .toLowerCase()
    .indexOf(removeDiacritics(searchText).toLowerCase()) !== -1;
export const pictogramFilter = (searchText, key) =>
  searchText.length >= 1 &&
  removeDiacritics(key)
    .toLowerCase()
    .indexOf(removeDiacritics(searchText).toLowerCase()) === 0;
export default customFilter;
