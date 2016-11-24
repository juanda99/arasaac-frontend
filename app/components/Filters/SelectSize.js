import React  from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { FormattedMessage } from 'react-intl'
import FilterIcon from './FilterIcon'
import messages from './messages'

class SelectSize extends React.Component {

  constructor(props) {
    super(props)
    this.state = { value: 1 }
  }

  getStyles() {
    return {
      select: {
        fontSize: 13,
        width: '350px',
        marginLeft: this.state.value !== 1 ? 0 : 48
      }
    }
  }

  handleChange = (event, index, value) => this.setState({ value })

  render() {
    const styles = this.getStyles()
    return (
      <span>
        {this.state.value !== 1 ? <FilterIcon /> : null}
        <SelectField autoWidth={true} value={this.state.value} onChange={this.handleChange} style={styles.select}>
          <MenuItem value={1} label={<FormattedMessage {...messages.size} />} primaryText={<FormattedMessage {...messages.any} />} />
          <MenuItem value={2} label={<FormattedMessage {...messages.large} />} primaryText={<FormattedMessage {...messages.largeChoose} />} />
          <MenuItem value={3} label={<FormattedMessage {...messages.medium} />} primaryText={<FormattedMessage {...messages.mediumChoose} />} />
          <MenuItem value={4} label={<FormattedMessage {...messages.small} />} primaryText={<FormattedMessage {...messages.smallChoose} />} />
        </SelectField>
      </span>
    )
  }
}

export default SelectSize
