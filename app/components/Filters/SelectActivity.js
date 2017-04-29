import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { FormattedMessage } from 'react-intl'
import FilterIcon from './FilterIcon'
import messages from './messages'
import styles from './styles'


class SelectActivity extends React.Component {

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
          <MenuItem value={24} primaryText={<FormattedMessage {...messages.multimediaBook} />} />
          <MenuItem value={29} primaryText={<FormattedMessage {...messages.picaa} />} />
          <MenuItem value={14} primaryText={<FormattedMessage {...messages.blackAndWhitePictograms} />} />
          <MenuItem value={2} primaryText={<FormattedMessage {...messages.pictures} />} />
          <MenuItem value={31} primaryText={<FormattedMessage {...messages.lseVideos} />} />
          <MenuItem value={32} primaryText={<FormattedMessage {...messages.lseColor} />} />
          <MenuItem value={20} primaryText={<FormattedMessage {...messages.pictures} />} />
          <MenuItem value={19} primaryText={<FormattedMessage {...messages.lseVideos} />} />
          <MenuItem value={1} primaryText={<FormattedMessage {...messages.lseColor} />} />
          <MenuItem value={xx} primaryText={<FormattedMessage {...messages.pictures} />} />
          <MenuItem value={34} primaryText={<FormattedMessage {...messages.lseVideos} />} />
          <MenuItem value={15} primaryText={<FormattedMessage {...messages.lseColor} />} />
          <MenuItem value={28} primaryText={<FormattedMessage {...messages.pictures} />} />
          <MenuItem value={6} primaryText={<FormattedMessage {...messages.lseVideos} />} />
          <MenuItem value={33} primaryText={<FormattedMessage {...messages.lseColor} />} />
          <MenuItem value={5} primaryText={<FormattedMessage {...messages.pictures} />} />
          <MenuItem value={18} primaryText={<FormattedMessage {...messages.lseVideos} />} />
          <MenuItem value={3} primaryText={<FormattedMessage {...messages.lseColor} />} />
          <MenuItem value={30} primaryText={<FormattedMessage {...messages.pictures} />} />
          <MenuItem value={21} primaryText={<FormattedMessage {...messages.lseVideos} />} />
          <MenuItem value={4} primaryText={<FormattedMessage {...messages.lseColor} />} />
          <MenuItem value={12} primaryText={<FormattedMessage {...messages.pictures} />} />
          <MenuItem value={26} primaryText={<FormattedMessage {...messages.lseVideos} />} />
          <MenuItem value={25} primaryText={<FormattedMessage {...messages.lseColor} />} />
          <MenuItem value={27} primaryText={<FormattedMessage {...messages.pictures} />} />
          <MenuItem value={23} primaryText={<FormattedMessage {...messages.lseVideos} />} />
          <MenuItem value={16} primaryText={<FormattedMessage {...messages.lseColor} />} />
          <MenuItem value={22} primaryText={<FormattedMessage {...messages.pictures} />} />
          <MenuItem value={13} primaryText={<FormattedMessage {...messages.lseVideos} />} />
          <MenuItem value={xxx} primaryText={<FormattedMessage {...messages.lseColor} />} />
        </SelectField>
      </div>
    )
  }
}

export default SelectActivity
