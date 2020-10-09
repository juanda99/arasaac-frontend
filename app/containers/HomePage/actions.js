import { createRequestTypes, action } from "utils/actions";
import { DEFAULT_LIST } from "utils";

// constants
export const START_TOUR = "START_TOUR";
export const STOP_TOUR = "STOP_TOUR";

export const startTour = () => action(START_TOUR);

export const stopTour = () => action(STOP_TOUR);
