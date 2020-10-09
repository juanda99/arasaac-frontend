import { defineMessages } from "react-intl";

export default defineMessages({
  authentication: {
    id: "loginView.authentication",
    description: "Error title alert window",
    defaultMessage: "Authentication error",
  },
  communicationError: {
    id: "loginView.communicationError",
    description: "Error description alert window",
    defaultMessage: "Can't access authentication server",
  },
  invalidUser: {
    id: "loginView.invalidUser",
    description: "Error description alert window",
    defaultMessage: "Invalid user or password",
  },
});
