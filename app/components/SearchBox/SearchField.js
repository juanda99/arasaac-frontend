import React, { PropTypes } from 'react'
import AutoComplete from 'material-ui/AutoComplete'
import RaisedButton from 'material-ui/RaisedButton'
import { injectIntl, intlShape } from 'react-intl'
import messages from './messages'

const styles = {
  button: {
    margin: 22,
    border: 0
  }
}

class SearchField extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setInputValue(nextProps.value)
    }
  }

  getInputValue() {
    return this.myInput.refs.searchTextField.props.value
  }

  setInputValue(val) {
    // Generally mutating DOM is a bad idea in React components,
    // but doing this for a single uncontrolled field is less fuss
    // than making it controlled and maintaining a state for it.
    this.myInput.value = val
  }


  handleUpdateInput = (t) => {
    if (t.keyCode === 13) {
      this.props.onSubmit(this.getInputValue())
    } else {
      this.props.onChange(this.getInputValue())
    }
  }

  handleSubmit = (t) => {
    this.props.onSubmit(t)
  }

  handleClick = () => {
    this.props.onSubmit(this.getInputValue())
  }

  render() {
    const { formatMessage } = this.props.intl
    const dataSource = this.props.dataSource


    return (
      <div>
        <AutoComplete
          ref={(ref) => (this.myInput = ref)}
          floatingLabelText={formatMessage(messages.search)}
          filter={AutoComplete.fuzzyFilter}
          dataSource={dataSource}
          onNewRequest={this.handleSubmit}
          onUpdateInput={this.handleUpdateInput}
          searchText={this.props.value}
        />
        <RaisedButton label='Search' primary={true} style={styles.button} onClick={this.handleClick} />
      </div>
    )
  }
}

SearchField.propTypes = {
  dataSource: PropTypes.array.isRequired,
  intl: intlShape.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default injectIntl(SearchField)
