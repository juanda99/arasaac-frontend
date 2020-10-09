/*
 *
 * ToggleFilter
 *
 */
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Toggle from "material-ui/Toggle";
import { toggleFilter } from "./actions";

const mapStateToProps = (state, ownProps) => ({
  defaultToggled: state.getIn([
    "configuration",
    "filters",
    ownProps.type,
    ownProps.filter,
  ]),
  label: ownProps.label,
  style: { width: 200, margin: "0 auto" },
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onToggle: () => {
    dispatch(toggleFilter(ownProps.type, ownProps.filter));
  },
});

const ToggleFilter = connect(mapStateToProps, mapDispatchToProps)(Toggle);

ToggleFilter.propTypes = {
  // object instead of string because of react-intl
  label: PropTypes.object.isRequired,
  filter: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ToggleFilter;
