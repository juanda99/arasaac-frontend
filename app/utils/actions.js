const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";

/* eslint-disable no-param-reassign */
export function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}
/* eslint-enable no-param-reassign */

export function action(type, payload = {}) {
  return { type, payload };
}
