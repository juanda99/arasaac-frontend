/*
 *
 * ToggleFilter
 *
 */

import { PropTypes } from 'react'
import { connect } from 'react-redux'
import Toggle from 'material-ui/Toggle'
import { toggleFilter } from './actions'

const mapStateToProps = (state, ownProps) => (
  {
    defaultToggled: state.getIn(['configuration', 'filters', ownProps.filter]),
    label: ownProps.label,
    style: { width: 100 }
  }
)
const mapDispatchToProps = (dispatch, ownProps) => ({
  onToggle: () => {
    dispatch(toggleFilter(ownProps.filter))
  }
})

const ToggleFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Toggle)

ToggleFilter.propTypes = {
  // object instead of string because of react-intl
  label: PropTypes.object.isRequired,
  filter: PropTypes.string.isRequired
}

export default ToggleFilter
