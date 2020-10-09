/*
 * Welcome Messages
 *
 * This contains all the text for the Welcome component.
 */
import { defineMessages } from "react-intl";

export default defineMessages({
  header: {
    id: "app.components.Welcome.header",
    description: "Home header",
    defaultMessage:
      "{aragones} Center of Augmentative and Alternative Communication",
  },
  aragonese: {
    id: "app.components.Welcome.aragonese",
    description: "Home header",
    defaultMessage: "Aragonese",
  },
  chooseLanguage: {
    id: "app.components.Welcome.chooseLanguage",
    defaultMessage: "Choose your language:",
  },
  discover: {
    id: "app.HomePage.discover",
    defaultMessage: "Discover ARASAAC",
  },
});
