/**
 *  Check if token as expired
 *  @param   {String}     token
 *  @return  {Boolean}
 */
import jwtDecode from "jwt-decode";
const tokenExpired = (token) => {
  const decoded = jwtDecode(token);
  return decoded.exp > new Date().getTime() / 1000;
};

export default tokenExpired;
