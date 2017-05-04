import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
// import { FormattedMessage } from 'react-intl'
import FilterIcon from './FilterIcon'
// import messages from './messages'
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
          <MenuItem value={'da'} primaryText='Dansk' />
          <MenuItem value={'nl'} primaryText='Nederlands' />
          <MenuItem value={'en'} primaryText='English' />
          <MenuItem value={'fi'} primaryText='suomi' />
          <MenuItem value={'fr'} primaryText='Français' />
          <MenuItem value={'de'} primaryText='Deutsch' />
          <MenuItem value={'hu'} primaryText='Magyar' />
          <MenuItem value={'it'} primaryText='Italiano' />
          <MenuItem value={'nb'} primaryText='Norsk' />
          <MenuItem value={'pt'} primaryText='Português' />
          <MenuItem value={'ro'} primaryText='Român' />
          <MenuItem value={'ru'} primaryText='Русский язык' />
          <MenuItem value={'es'} primaryText='Español' />
          <MenuItem value={'sv'} primaryText='svenska' />
          <MenuItem value={'tr'} primaryText='Türkçe' />
          <MenuItem value={'ara'} primaryText='جزائري' />
          <MenuItem value={'prs'} primaryText='درى' />
          <MenuItem value={'pes'} primaryText=' فارسى' />
          <MenuItem value={'urd'} primaryText='اردو' />
          <MenuItem value={'zhs'} primaryText='简体中文' />
          <MenuItem value={'zht'} primaryText='繁體中文' />
        </SelectField>
      </div>
    )
  }
}

export default SelectLanguage
