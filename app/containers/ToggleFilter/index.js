/*
 *
 * ToggleFilter
 *
 */

import { PropTypes } from 'react'
import { connect } from 'react-redux'
import Toggle from 'material-ui/Toggle'
import { action } from 'utils/actions'

const ToggleFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Toggle)


const mapStateToProps = (state, ownProps) => ({
  defaultToggled: state.gui.filters[ownProps.filter],
  label: ownProps.label,
  style: { width: 100 }
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onToggle: () => {
    dispatch(action.toggleFilter(ownProps.filter))
  }
})


ToggleFilter.propTypes = {
  label: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired
}

export default ToggleFilter
