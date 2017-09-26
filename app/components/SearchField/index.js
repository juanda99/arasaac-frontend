import React, { PropTypes, Component } from 'react'
import AutoComplete from 'material-ui/AutoComplete'
import RaisedButton from 'material-ui/RaisedButton'
import { injectIntl, intlShape } from 'react-intl'
import messages from './messages'
import customFilter from './filter'

const styles = {
  button: {
    margin: 22,
    border: 0
  }
}

class SearchField extends Component {

  state = { searchText: this.props.value }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ searchText: nextProps.value })
    }
  }


  handleUpdateInput = (t) => {
    if (t.keyCode === 13) {
      this.props.onSubmit(this.state.searchText)
    } else {
      this.setState({ searchText: t })
    }
  }

  handleSubmit = (t) => {
    this.props.onSubmit(t)
  }

  handleClick = () => {
    this.props.onSubmit(this.state.searchText)
  }

  render() {
    const { formatMessage } = this.props.intl
    const dataSource = this.props.dataSource || []


    return (
      <div>
        <AutoComplete
          ref={(ref) => (this.myInput = ref)}
          floatingLabelText={formatMessage(messages.search)}
          filter={customFilter}
          dataSource={dataSource}
          onNewRequest={this.handleSubmit}
          onUpdateInput={this.handleUpdateInput}
          searchText={this.state.searchText}
          maxSearchResults={10}
        />
        <RaisedButton label='Search' primary={true} style={styles.button} onClick={this.handleClick} />
      </div>
    )
  }
}

SearchField.propTypes = {
  dataSource: PropTypes.array,
  intl: intlShape.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default injectIntl(SearchField)
