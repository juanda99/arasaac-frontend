import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { FormattedMessage } from 'react-intl'
import FilterIcon from './FilterIcon'
import messages from './messages'
import styles from './styles'


class SelectArea extends React.Component {

  constructor(props) {
    super(props)
    this.state = { value: 1 }
  }

  handleChange = (event, index, value) => this.setState({ value })

  render() {
    return (
      <div style={styles.div}>
        {this.state.value !== 1 ? <FilterIcon /> : null}
        <SelectField autoWidth={true} value={this.state.value} onChange={this.handleChange} style={styles.select}>
          <MenuItem value={1} primaryText={<FormattedMessage {...messages.selfawareness} />} />
          <MenuItem value={2} primaryText={<FormattedMessage {...messages.visualdiscrimination} />} />
          <MenuItem value={3} primaryText={<FormattedMessage {...messages.auditorydiscrimination} />} />
          <MenuItem value={4} primaryText={<FormattedMessage {...messages.phonology} />} />
          <MenuItem value={5} primaryText={<FormattedMessage {...messages.morphosyntax} />} />
          <MenuItem value={6} primaryText={<FormattedMessage {...messages.semantics} />} />
          <MenuItem value={7} primaryText={<FormattedMessage {...messages.pragmatics} />} />
          <MenuItem value={8} primaryText={<FormattedMessage {...messages.reading} />} />
          <MenuItem value={9} primaryText={<FormattedMessage {...messages.writing} />} />
          <MenuItem value={10} primaryText={<FormattedMessage {...messages.literature} />} />
          <MenuItem value={11} primaryText={<FormattedMessage {...messages.languages} />} />
          <MenuItem value={12} primaryText={<FormattedMessage {...messages.numeration} />} />
          <MenuItem value={13} primaryText={<FormattedMessage {...messages.basicOperations} />} />
          <MenuItem value={14} primaryText={<FormattedMessage {...messages.problems} />} />
          <MenuItem value={15} primaryText={<FormattedMessage {...messages.geometry} />} />
          <MenuItem value={16} primaryText={<FormattedMessage {...messages.naturalSciences} />} />
          <MenuItem value={17} primaryText={<FormattedMessage {...messages.socialSciences} />} />
          <MenuItem value={18} primaryText={<FormattedMessage {...messages.music} />} />
          <MenuItem value={19} primaryText={<FormattedMessage {...messages.art} />} />
          <MenuItem value={20} primaryText={<FormattedMessage {...messages.physicalEducation} />} />
          <MenuItem value={21} primaryText={<FormattedMessage {...messages.religion} />} />
          <MenuItem value={22} primaryText={<FormattedMessage {...messages.health} />} />
          <MenuItem value={23} primaryText={<FormattedMessage {...messages.leisure} />} />
          <MenuItem value={24} primaryText={<FormattedMessage {...messages.signalling} />} />
        </SelectField>
      </div>
    )
  }
}

export default SelectArea
