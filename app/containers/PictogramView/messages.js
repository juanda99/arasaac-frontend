/*
 * PictogramsView Messages
 *
 * This contains all the text for the PictogramsView component.
 */
import { defineMessages } from "react-intl";

export default defineMessages({
  pictogramNotFound: {
    id: "app.containers.PictogramView.pictogramNotFound",
    description: "Message when there is not a pictogram with the id provided",
    defaultMessage: "Sorry, the pictogram you are looking for does not exist",
  },
  pictogramLoading: {
    id: "app.containers.PictogramView.pictogramLoading",
    description: "Message when loading pictogram",
    defaultMessage: "Loading pictogram...",
  },
});
