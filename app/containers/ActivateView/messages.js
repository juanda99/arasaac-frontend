import { defineMessages } from "react-intl";

export default defineMessages({
  invalidCode: {
    id: "activate.invalidCode",
    description: "http error 403 activating user",
    defaultMessage: "Your activation code is not valid",
  },
  expiredCode: {
    id: "activate.expiredCode",
    description: "Error activating new user",
    defaultMessage:
      "Your activation code has expired. We have send you another email to validate your account",
  },
  userNotActivated: {
    id: "activate.userNotActivated",
    description: "Generic error activating user (500)",
    defaultMessage: "An error occurred while activating your user",
  },
  userActivated: {
    id: "activate.userActivated",
    description: "Activated new user",
    defaultMessage: "Your user has been activated. You can sign in.",
  },
  activateUser: {
    id: "activate.activateUser",
    description: "User activation title",
    defaultMessage: "User activation",
  },
});
