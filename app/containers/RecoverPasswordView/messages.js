import { defineMessages } from "react-intl";

export default defineMessages({
  resetPassword: {
    id: "recoverPasswordView.resetPassword",
    description: "Error title header",
    defaultMessage: "Recover password",
  },
  userNotActivated: {
    id: "recoverPasswordView.userNotActivated",
    description: "Error message",
    defaultMessage:
      "Your user was no active. We have send you an activation link, once you login you can change your password from your user profile",
  },
  userNotExists: {
    id: "recoverPasswordView.userNotExists",
    description: "Error message",
    defaultMessage:
      "We are sorry but there is no account with your email account",
  },
  passwordNotReset: {
    id: "recoverPasswordView.passwordNotReset",
    description: "Error message",
    defaultMessage:
      "We are sorry but there was an error resetting your password",
  },
  passwordResetSend: {
    id: "recoverPasswordView.passwordResetSend",
    description: "Description about email sent",
    defaultMessage:
      "You are almost done! Check your email to recover your password",
  },
});
