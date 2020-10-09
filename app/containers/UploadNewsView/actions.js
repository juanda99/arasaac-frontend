/*
 *
 * MaterialsView actions
 *
 */

import { createRequestTypes, action } from "utils/actions";

// constants
export const UPLOAD_NEW = createRequestTypes("UPLOAD_NEW");

// actions: materials.request/success/failure
export const uploadNew = {
  request: (locale, text) => action(UPLOAD_NEW.REQUEST, { locale, text }),
  success: (locale, searchText, data) =>
    action(UPLOAD_NEW.SUCCESS, { locale, searchText, data }),
  failure: (error) => action(UPLOAD_NEW.FAILURE, { error }),
};
