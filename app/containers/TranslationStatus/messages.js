import { defineMessages } from "react-intl";

const scope = "app.containersTranslationStatus";

export default defineMessages({
  noDataAvailable: {
    id: `${scope}.noDataAvailable`,
    defaultMessage: "No data available",
  },
  webTranslationStatus: {
    id: `${scope}.webTranslationStatus`,
    defaultMessage: "Web translation: {webTranslatedString}%",
  },
  pictosTranslationStatus: {
    id: `${scope}.pictosTranslationStatus`,
    defaultMessage:
      "Pictograms translation (maybe already translated but not validated): {pictosValidatedString}%",
  },
});
