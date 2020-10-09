import { defineMessages } from "react-intl";

const scope = "app.containers/IntroAAC";
export default defineMessages({
  infoSpanish: {
    id: `${scope}.infoSpanish`,
    defaultMessage: "This section is also available in Spanish.",
  },
  justSpanish: {
    id: `${scope}.justSpanish`,
    defaultMessage:
      "We are sorry but this section is not available in your language. However if you prefer you can read it in Spanish.",
  },
  inSpanish: {
    id: `${scope}.inSpanish`,
    defaultMessage: "Show in Spanish",
  },
});
