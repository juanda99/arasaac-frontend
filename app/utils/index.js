import { PICTOGRAMS_URL, IMAGES_URL } from "services/config";
export const ARASAAC = "arasaac";
export const GOOGLE = "google";
export const FACEBOOK = "facebook";
/* for material status */
export const NOT_PUBLISHED = 0;
export const PUBLISHED = 1;
export const PENDING = 2;

function isArray(obj) {
  return !!obj && obj.constructor === Array;
}

export const isEmptyObject = (object) => Object.entries(object).length === 0;

export const DEFAULT_LIST = "defaultList";

export const DEFAULT_PROFILE_PICTURE = `${PICTOGRAMS_URL}/28307/28307_300.png`;
// export const DEFAULT_AVATAR_PICTURE = `${IMAGES_URL}/arasaac-avatar.gif`

const checkLanguage = (item, language) =>
  language.size === 0 ||
  language.includes(item.language) ||
  (item.translations &&
    item.translations.some((translation) =>
      language.includes(translation.language)
    ));

export const getFilteredItems = (items, filters) =>
  items.filter((item) => {
    const [...filterNames] = filters.keys();
    return filterNames.every((filterName) => {
      // filterName can have a name different to material structure... small hack:
      let fieldName = filterName;
      // if (filterName === 'activities') fieldName = 'activity'
      // else if (filterName === 'areas') fieldName = 'area'
      if (filterName === "languages") {
        return checkLanguage(item, filters.get("languages"));
      } else if (
        filters.get(filterName).size === 0 ||
        filters.get(filterName) === ""
      ) {
        return true;
      } else if (
        typeof item[fieldName] === "string" ||
        typeof item[fieldName] === "number"
      ) {
        return (
          item[fieldName] === filters.get(filterName) ||
          filters.get(filterName).includes(item[fieldName])
        );
      } else if (isArray(item[fieldName]) && item[fieldName].length) {
        return item[fieldName].some((keyItems) =>
          filters.get(filterName).includes(keyItems)
        );
      }
      return false;
    });
  });

/* inside pictograms, check which keywords meets an specific searchText */
export const keywordSelector = (searchText, keywords) => {
  const emptyResponse = { keyword: "" };
  if (keywords.length === 0) return emptyResponse;
  const searchTextArray = searchText ? searchText.split(" ") : [];
  if (!searchTextArray.length) return keywords[0];
  // if same keyword exists, return it
  const keyword = keywords.find(
    (keywordsItem) =>
      keywordsItem.keyword &&
      keywordsItem.keyword.toLowerCase() === searchText.toLowerCase()
  );
  if (keyword) return keyword;
  // otherwise, return first partial match or fist keyword if no matches
  return (
    keywords.find((keywordsItem) => {
      if (!keywords.keyword) return false;
      const keywordArray = keywordsItem.keyword
        .split(" ")
        .map((keyword) => keyword.toLowerCase());
      return searchTextArray.some((word) =>
        keywordArray.includes(word.toLowerCase())
      );
    }) ||
    keywords[0] ||
    emptyResponse
  );
};

/* for hair and skin options, get object key for a given value */
export const getKeyByValue = (object, value) =>
  Object.keys(object).find((key) => object[key] === value);

export const getMongoDBLanguage = (language) => {
  switch (language) {
    case "da":
    case "nl":
    case "en":
    case "fi":
    case "fr":
    case "de":
    case "hu":
    case "it":
    case "nb":
    case "pt":
    case "ro":
    case "ru":
    case "es":
    case "sv":
    case "tr":
      return language;
    default:
      return "none";
  }
};
