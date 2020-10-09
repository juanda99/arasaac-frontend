import { createSelector } from "reselect";
import { DEFAULT_LIST, DEFAULT_PROFILE_PICTURE } from "utils";

export const selectTour = (state) => state.get("tour");

export const makeSelectRunTour = () =>
  createSelector(selectTour, (tour) => tour.get("run"));
