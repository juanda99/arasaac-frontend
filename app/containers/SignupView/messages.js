import { defineMessages } from "react-intl";

export default defineMessages({
  userNotActivated: {
    id: "signup.userNotActivated",
    description: "http error 403 activating user",
    defaultMessage:
      "You have already signed up. Please check your email to verify your account.",
  },
  userConflict: {
    id: "signup.userConflict",
    description: "Error description creating new user",
    defaultMessage:
      "You have already signed up and confirmed your account. Did you forget your password?",
  },
  userCreated: {
    id: "signup.userCreated",
    description: "New user created message",
    defaultMessage:
      "An email has been sent to you. Please check it to verify your account.",
  },
  userNotCreated: {
    id: "signup.userNotCreated",
    description: "Generic error creating user (500)",
    defaultMessage: "An error occurred while creating a new user",
  },
  userActivated: {
    id: "signup.userActivated",
    description: "Activated new user",
    defaultMessage: "Your user has been activated.",
  },
  createUser: {
    id: "signup.createUser",
    description: "User creation title",
    defaultMessage: "New ARASAAC user",
  },
  creatingUser: {
    id: "signup.creatingUser",
    description: "info message",
    defaultMessage: "Creating new ARASAAC account...",
  },
  recoverPassword: {
    id: "signup.recoverPassword",
    description: "Recover password text button",
    defaultMessage: "Recover password",
  },
});
