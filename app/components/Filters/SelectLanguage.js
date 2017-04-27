import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { FormattedMessage } from 'react-intl'
import FilterIcon from './FilterIcon'
import messages from './messages'
import styles from './styles'


class SelectLanguage extends React.Component {

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
          <MenuItem value={1} label={<FormattedMessage {...messages.catalog} />} primaryText={<FormattedMessage {...messages.allCatalogs} />} />
          <MenuItem value={2} primaryText={<FormattedMessage {...messages.colorPictograms} />} />
          <MenuItem value={3} primaryText={<FormattedMessage {...messages.blackAndWhitePictograms} />} />
          <MenuItem value={4} primaryText={<FormattedMessage {...messages.pictures} />} />
          <MenuItem value={5} primaryText={<FormattedMessage {...messages.lseVideos} />} />
          <MenuItem value={5} primaryText={<FormattedMessage {...messages.lseColor} />} />
        </SelectField>
      </div>
    )
  }
}

export default SelectLanguage
