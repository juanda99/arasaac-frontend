import { defineMessages } from "react-intl";

const scope = "app.containers/collaboratorsView";
export default defineMessages({
  translateArasaac: {
    id: `${scope}.translateArasaac`,
    defaultMessage:
      "ARASAAC is translated by volunteers into multiple languages. Contact us if you want to help translating ARASAAC into a new language or improving an existing translation.",
  },
  translationStatus: {
    id: `${scope}.translationStatus`,
    defaultMessage: "Translation status",
  },
  removeFilter: {
    id: `${scope}.removeFilter`,
    defaultMessage: "Remove filter",
  },
  filterByLanguage: {
    id: `${scope}.filterByLanguage`,
    defaultMessage: "Filter by language",
  },
});
