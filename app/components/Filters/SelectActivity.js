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
          <MenuItem value={24} primaryText={<FormattedMessage {...messages.lim} />} />
          <MenuItem value={29} primaryText={<FormattedMessage {...messages.picaa} />} />
          <MenuItem value={14} primaryText={<FormattedMessage {...messages.animation} />} />
          <MenuItem value={2} primaryText={<FormattedMessage {...messages.software} />} />
          <MenuItem value={31} primaryText={<FormattedMessage {...messages.araBoard} />} />
          <MenuItem value={16} primaryText={<FormattedMessage {...messages.board} />} />
          <MenuItem value={32} primaryText={<FormattedMessage {...messages.bingo} />} />
          <MenuItem value={20} primaryText={<FormattedMessage {...messages.song} />} />
          <MenuItem value={19} primaryText={<FormattedMessage {...messages.notebook} />} />
          <MenuItem value={1} primaryText={<FormattedMessage {...messages.story} />} />
          <MenuItem value={36} primaryText={<FormattedMessage {...messages.multimedia} />} />
          <MenuItem value={34} primaryText={<FormattedMessage {...messages.domino} />} />
          <MenuItem value={5} primaryText={<FormattedMessage {...messages.game} />} />
          <MenuItem value={6} primaryText={<FormattedMessage {...messages.group} />} />
          <MenuItem value={15} primaryText={<FormattedMessage {...messages.exercise} />} />
          <MenuItem value={28} primaryText={<FormattedMessage {...messages.jClic} />} />
          <MenuItem value={33} primaryText={<FormattedMessage {...messages.goose} />} />
          <MenuItem value={18} primaryText={<FormattedMessage {...messages.book} />} />
          <MenuItem value={3} primaryText={<FormattedMessage {...messages.image} />} />
          <MenuItem value={35} primaryText={<FormattedMessage {...messages.video} />} />
          <MenuItem value={30} primaryText={<FormattedMessage {...messages.pictodroidLite} />} />
          <MenuItem value={21} primaryText={<FormattedMessage {...messages.digitalBoard} />} />
          <MenuItem value={4} primaryText={<FormattedMessage {...messages.slide} />} />
          <MenuItem value={12} primaryText={<FormattedMessage {...messages.protocol} />} />
          <MenuItem value={26} primaryText={<FormattedMessage {...messages.routine} />} />
          <MenuItem value={25} primaryText={<FormattedMessage {...messages.signalling} />} />
          <MenuItem value={27} primaryText={<FormattedMessage {...messages.sequence} />} />
          <MenuItem value={23} primaryText={<FormattedMessage {...messages.smartNotebook} />} />
          <MenuItem value={22} primaryText={<FormattedMessage {...messages.tico} />} />
          <MenuItem value={13} primaryText={<FormattedMessage {...messages.test} />} />
          <MenuItem value={37} primaryText={<FormattedMessage {...messages.socialHistory} />} />
        </SelectField>
      </div>
    )
  }
}

export default SelectActivity
