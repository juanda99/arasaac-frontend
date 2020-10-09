/*
 * PictogramsView Messages
 *
 * This contains all the text for the PictogramsView component.
 */
import { defineMessages } from "react-intl";

export default defineMessages({
  materialNotFound: {
    id: "app.containers.MaterialView.materialNotFound",
    description: "Message when there is not a material with the id provided",
    defaultMessage: "Sorry, the material you are looking for does not exist",
  },
  materialLoading: {
    id: "app.containers.MaterialView.materialLoading",
    description: "Message when loading material",
    defaultMessage: "Loading material...",
  },
});
