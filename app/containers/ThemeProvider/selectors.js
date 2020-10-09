import { createSelector } from "reselect";
const selectTheme = () => (state) => state.get("theme");

export { selectTheme };
