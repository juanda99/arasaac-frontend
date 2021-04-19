import React from 'react'
import PropTypes from 'prop-types'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import muiThemeable from 'material-ui/styles/muiThemeable'
import IconButton from 'material-ui/IconButton'
import ActionHide from 'material-ui/svg-icons/action/highlight-off'
import { FormattedMessage } from 'react-intl'
import { List } from 'immutable'
import styles from './styles'
import messages from './messages'

class FilterSelect extends React.Component {
  handleChange = (event, index, values) => {
    if (this.props.multiple) {
      this.props.onChange(this.props.filterType, List(values))
    } else {
      this.props.onChange(this.props.filterType, values)
    }
  }

  handleReset = () => {
    if (this.props.multiple) {
      this.props.onChange(this.props.filterType, List())
    } else {
      this.props.onChange(this.props.filterType, '')
    }
  }

  menuItems(values, items) {
    const { multiple } = this.props
    return items.map((item) =>
      multiple ? (
        <MenuItem
          key={item.primaryText}
          insetChildren={true}
          checked={values && values.includes(item.value)}
          {...item}
        />
      ) : (
        <MenuItem key={item.primaryText} {...item} />
      )
    )
  }
  render() {
    // filterType will be used also as id, see https://github.com/callemall/material-ui/issues/6834
    const {
      values,
      items,
      floatingLabelText,
      multiple,
      filterType,
      muiTheme,
    } = this.props
    let multipleProps = {}
    // useful for defining a selectionRenderer:
    if (multiple) multipleProps = { multiple }
    return (
      <span style={styles.span}>
        <IconButton
          className="btnDeleteFilter"
          iconStyle={{
            color: muiTheme.palette.accent1Color,
            verticalAlign: 'bottom',
          }}
          onClick={this.handleReset}
          tooltip={<FormattedMessage {...messages.filterTooltip} />}
        >
          <ActionHide />
        </IconButton>
        <SelectField
          {...multipleProps}
          autoWidth={true}
          value={values}
          onChange={this.handleChange}
          style={styles.select}
          maxHeight={300}
          menuItemStyle={{ fontSize: '14px' }}
          floatingLabelText={floatingLabelText}
          id={filterType}
        >
          {this.menuItems(values, items)}
        </SelectField>
      </span>
    )
  }
}

FilterSelect.displayName = 'FilterSelect'

FilterSelect.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      primaryText: PropTypes.string.isRequired,
    })
  ).isRequired,
  multiple: PropTypes.bool,
  muiTheme: PropTypes.object,
  floatingLabelText: PropTypes.string.isRequired,
  values: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]).isRequired,
  filterType: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default muiThemeable()(FilterSelect)
