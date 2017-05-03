import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FilterIcon from './FilterIcon'
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
        key={item.value}
        insetChildren={true}
        checked={values && values.includes(item.value)}
        {...item}
      />
    ))
  }

  render() {
    const { values } = this.state
    const { items } = this.props
    return (
      <div style={styles.div}>
        {values[0] ? <FilterIcon /> : null}
        <SelectField multiple={true} autoWidth={false} value={values} onChange={this.handleChange} style={styles.select}>
          {this.menuItems(values, items)}
        </SelectField>
      </div>
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
