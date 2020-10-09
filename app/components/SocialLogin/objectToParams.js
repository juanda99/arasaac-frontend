/**
 * Encode object to url parameters
 *
 * @param      {Object} paramsObj The object needs to encode as url parameters
 * @return     {String} Encoded url parameters
 */

export default (paramsObj) =>
  Object.keys(paramsObj)
    .map(
      (key) =>
        `encodeURIComponent(${key}) = encodeURIComponent(${paramsObj[key]})`
    )
    .join("&");
