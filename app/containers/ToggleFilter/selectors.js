import { createSelector } from "reselect";
import { selectConfigurationViewDomain } from "containers/ConfigurationView/selectors";

/**
 * Direct selector to the toggleFilter state domain
 */
const selectToggleFilterDomain = () => (state) => state.get("toggleFilter");

/**
 * Other specific selectors
 */

/**
 * Default selector used by ToggleFilter
 */

const selectToggleFilter = () =>
  createSelector(selectToggleFilterDomain(), (substate) => substate.toJS());

const selectFilters = () =>
  createSelector(selectConfigurationViewDomain(), (substate) =>
    substate.get("filters")
  );

export default selectToggleFilter;
export { selectFilters };
