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

const SearchField = (props) => {
  const { formatMessage } = props.intl
  const dataSource = props.dataSource

  const getInputValue = () => (
    this.refs.input.refs.searchTextField.props.value
  )

  const handleUpdateInput = (t) => {
    if (t.keyCode === 13) {
      this.props.onChange(this.getInputValue())
    }
  }

  const handleSubmit = (t) => {
    this.props.onChange(t)
  }

  const handleClick = () => {
    this.props.onChange(getInputValue())
  }

  // let link = `/pictograms/search/${this.props.value}`
  // if (typeof dataSource === 'undefined') dataSource = []
  return (
    <div>
      <AutoComplete
        ref='input'
        floatingLabelText={formatMessage(messages.search)}
        filter={AutoComplete.fuzzyFilter}
        dataSource={dataSource}
        onNewRequest={handleSubmit} onUpdateInput={handleUpdateInput} searchText={props.value}
      />
      <RaisedButton label='Search' primary={true} style={styles.button} onClick={handleClick} />
    </div>
  )
}

SearchField.propTypes = {
  dataSource: PropTypes.array.isRequired,
  intl: intlShape.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default injectIntl(SearchField)
