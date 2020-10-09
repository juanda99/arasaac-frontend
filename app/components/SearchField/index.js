import React, { Component } from "react";
import PropTypes from "prop-types";
import SearchBar from "material-ui-search-bar";
import { injectIntl, intlShape } from "react-intl";
// import RaisedButton from 'material-ui/RaisedButton'
import NoMobileButton from "components/NoMobileButton";
import SearchIcon from "material-ui/svg-icons/action/search";
import messages from "./messages";
import customFilter, { pictogramFilter } from "./filter";

class SearchField extends Component {
  state = { searchText: this.props.value };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ searchText: nextProps.value });
    }
  }

  handleUpdateInput = (t) => {
    if (t.keyCode === 13) {
      this.props.onSubmit(this.state.searchText);
    } else {
      this.setState({ searchText: t });
    }
  };

  handleClick = () => {
    this.props.onSubmit(this.state.searchText);
  };

  render() {
    const { formatMessage } = this.props.intl;
    const filter = this.props.filterFromStart ? pictogramFilter : customFilter;
    const dataSource = this.props.dataSource || [];
    return (
      <div style={this.props.style}>
        <div style={{ display: "flex", wrap: "nowrap" }}>
          <SearchBar
            style={this.props.style}
            ref={(ref) => (this.myInput = ref)}
            filter={filter}
            dataSource={dataSource}
            onChange={this.handleUpdateInput}
            onNewRequest={this.handleClick}
            onRequestSearch={this.handleClick}
            value={this.state.searchText}
            maxSearchResults={10}
            hintText={formatMessage(messages.search)}
          />
          {this.state.searchText ? (
            <NoMobileButton
              style={{ height: "48px" }}
              label=""
              primary={true}
              onClick={this.handleClick}
              icon={<SearchIcon style={{ height: "48px" }} />}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

SearchField.propTypes = {
  dataSource: PropTypes.array,
  style: PropTypes.object,
  intl: intlShape.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  filterFromStart: PropTypes.bool,
};

export default injectIntl(SearchField);
