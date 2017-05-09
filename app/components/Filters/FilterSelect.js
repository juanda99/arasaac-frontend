import React, { PropTypes } from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import ActionHide from 'material-ui/svg-icons/action/highlight-off'
import { FormattedMessage } from 'react-intl'
import styles from './styles'
import messages from './messages'

class FilterSelect extends React.Component {


  handleChange = (event, index, values) => { this.props.setFilterItems(this.props.filterType, values) }

  handleReset = () => { this.props.setFilterItems(this.props.filterType, []) }

  menuItems(values, items) {
    const { multiple } = this.props
    return items.map((item) => (
      multiple
      ? <MenuItem
        key={item.primaryText}
        insetChildren={true}
        checked={values && values.includes(item.value)}
        {...item}
      />
      : <MenuItem
        key={item.primaryText}
        {...item}
      />
    ))
  }
  /*
  selectionRenderer = (values, item) => {
    if (values[0]) {
      switch (values.length) {
        case 0:
          return ''
        case 1:
          return this.props.items[values[0]].primaryText
        default:
          return `Areas: filtered (${values.length})`
      }
    } else return item
  }
  */
  render() {
    const { values, items, floatingLabelText, multiple } = this.props
    let multipleProps = {}
    // useful for defining a selectionRenderer:
    if (multiple) multipleProps = { multiple }
    return (
      <span style={styles.span}>
        <IconButton iconStyle={styles.icon} onClick={this.handleReset} tooltip={<FormattedMessage {...messages.filterTooltip} />}>
          <ActionHide />
        </IconButton>
        <SelectField
          {...multipleProps}
          autoWidth={true} value={values} onChange={this.handleChange}
          style={styles.select} maxHeight={300} menuItemStyle={{ fontSize: '14px' }}
          floatingLabelText={floatingLabelText}
        >
          {this.menuItems(values, items)}
        </SelectField>
      </span>
    )
  }
}

FilterSelect.propTypes = {
  items: PropTypes.arrayOf(React.PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    primaryText: PropTypes.string.isRequired
  })).isRequired,
  multiple: PropTypes.bool,
  floatingLabelText: PropTypes.string.isRequired,
  values: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]).isRequired,
  setFilterItems: PropTypes.func.isRequired,
  filterType: PropTypes.string.isRequired
}

export default FilterSelect
