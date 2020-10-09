import { createSelector } from "reselect";
import { Map } from "immutable";

const makeSelectIdPictogram = () => (_, ownProps) =>
  ownProps.params.idPictogram;
const makeSelectLocale = () => (_, ownProps) => ownProps.params.locale;

const selectPictogramsViewDomain = (state) => state.get("pictogramsView");

export const makePictogramByIdSelector = () =>
  createSelector(
    selectPictogramsViewDomain,
    makeSelectLocale(),
    makeSelectIdPictogram(),
    (substate, locale, idPictogram) =>
      // pictograms.locale does not exists first time, just pictograms
      substate.getIn(["pictograms", locale, idPictogram]) || new Map()
  );
