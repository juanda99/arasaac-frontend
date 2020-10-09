import { defineMessages } from "react-intl";

const scope = "app.containers/IntroAAC";
export default defineMessages({
  infoEnglish: {
    id: `${scope}.infoEnglish`,
    defaultMessage: "This section is also available in English.",
  },
  justEnglish: {
    id: `${scope}.justEnglish`,
    defaultMessage:
      "We are sorry but this section is not available in your language. However if you prefer you can read it in English.",
  },
  inEnglish: {
    id: `${scope}.inEnglish`,
    defaultMessage: "Show in English",
  },
});
