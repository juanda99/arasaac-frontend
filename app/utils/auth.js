import { connectedReduxRedirect } from "redux-auth-wrapper/history3/redirect";
import { routerActions } from "react-router-redux";

const userIsAuthenticated = connectedReduxRedirect({
  // The url to redirect user to if they fail
  redirectPath: "/signin",
  // Determine if the user is authenticated or not
  authenticatedSelector: (state) => !!state.getIn(["auth", "accessToken"]),
  // A nice display name for this check
  wrapperDisplayName: "UserIsAuthenticated",
  redirectAction: routerActions.replace,
});

export const userIsAdmin = connectedReduxRedirect({
  // The url to redirect user to if they fail
  redirectPath: "/permissionsError",
  // Determine if the user is authenticated or not
  authenticatedSelector: (state) => state.getIn(["auth", "role"]) === "admin",
  // A nice display name for this check
  wrapperDisplayName: "UserIsAdmin",
  redirectAction: routerActions.replace,
});

export default userIsAuthenticated;
