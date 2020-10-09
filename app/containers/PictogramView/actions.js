/*
 *
 * PictogramView actions
 *
 */

import { createRequestTypes, action } from "utils/actions";

// constants
export const PICTOGRAM = createRequestTypes("PICTOGRAM");

// actions: material.request/success/failure
export const pictogram = {
  request: (idPictogram, locale) =>
    action(PICTOGRAM.REQUEST, { idPictogram, locale }),
  success: (locale, data) => action(PICTOGRAM.SUCCESS, { locale, data }),
  failure: (error) => action(PICTOGRAM.FAILURE, { error }),
};
