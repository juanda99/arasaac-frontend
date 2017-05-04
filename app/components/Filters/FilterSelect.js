import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import ActionHide from 'material-ui/svg-icons/action/highlight-off'
import styles from './styles'

class MultipleSelect extends React.Component {

  constructor(props) {
    super(props)
    this.state = { values: [] }
  }

  handleChange = (event, index, values) => this.setState({ values })

  menuItems(values, items) {
    return items.map((item) => (
      <MenuItem
        key={item.primaryText}
        insetChildren={true}
        checked={values && values.includes(item.value)}
        {...item}
      />

    ))
  }

  selectionRenderer = (values) => {
    switch (values.length) {
      case 0:
        return 'Areas'
      case 1:
        return this.props.items[values[0]].primaryText
      default:
        return `Areas: filtered (${values.length})`
    }
  }

  render() {
    const { values } = this.state
    const { items } = this.props
    return (
      <span style={styles.span}>
        <IconButton iconStyle={styles.icon} onTouchTap={this.handleHide} tooltip={''}>
          <ActionHide />
        </IconButton>
        <SelectField
          multiple={true} autoWidth={true} value={values} onChange={this.handleChange}
          style={styles.select} maxHeight={300} menuItemStyle={{ fontSize: '14px' }} selectionRenderer={this.selectionRenderer}
        >
          {this.menuItems(values, items)}
        </SelectField>
      </span>
    )
  }
}

MultipleSelect.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.shape({
    value: React.PropTypes.number.isRequired,
    primaryText: React.PropTypes.string.isRequired
  })).isRequired
}

export default MultipleSelect
