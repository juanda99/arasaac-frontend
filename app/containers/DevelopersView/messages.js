/*
 * ConfigurationView Messages
 *
 * This contains all the text for the ConfigurationView component.
 */
import { defineMessages } from "react-intl";

export default defineMessages({
  termsOfUse: {
    id: "app.containers.DevelopersView.termsOfUse",
    description: "Subtitle for API terms of use",
    defaultMessage: "Terms of use",
  },
  introApi: {
    id: "app.containers.DevelopersView.introApi",
    description: "Intro to API webview",
    defaultMessage:
      "ARASAAC has an extensive API to serve our resources to third-party applications.",
  },
  termsOfUseDesc: {
    id: "app.containers.DevelopersView.termsOfUseDesc",
    description: "Description for API terms of use",
    defaultMessage:
      "The ARASAAC API is only available for non-commercial applications. Make sure you meet our license terms.",
  },
  license: {
    id: "app.containers.DevelopersView.license",
    description: "Description for API terms of use",
    defaultMessage: "ARASAAC creative commons license CC BY-NC-SA",
  },
  howto: {
    id: "app.containers.DevelopersView.howto",
    description: "Subtitle for API usage",
    defaultMessage: "API usage",
  },
  howtoDesc: {
    id: "app.containers.DevelopersView.howtoDesc",
    description: "Desc for API usage",
    defaultMessage:
      "In order to use the ARASAAC API you need access credentials. We use the Oauth2 authorization protocol that allows us that third-party applications can access both ARASAAC and its users data.",
  },
  grantTypes: {
    id: "app.containers.DevelopersView.grantTypes",
    description: "Title for grant types",
    defaultMessage: "Grant Types",
  },
  grantTypesDesc: {
    id: "app.containers.DevelopersView.grantTypesDesc",
    description: "Desc for grant types",
    defaultMessage:
      " Depending on the type of application and specific needs, an specific grant type or other must be implemented. Do not hesitate to contact us for more information.",
  },
});
