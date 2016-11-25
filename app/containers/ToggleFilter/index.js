/*
 *
 * ToggleFilter
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectToggleFilter from './selectors';

export class ToggleFilter extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
      </div>
    );
  }
}

const mapStateToProps = selectToggleFilter();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToggleFilter);
