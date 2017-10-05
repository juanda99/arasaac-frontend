/**
*
* Item
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import { Link } from 'react-router'

const styles = {
  paper: {
    padding: '20px',
    margin: '30px',
    position: 'relative'
  }
}

class Item extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.node
  }

  constructor(props) {
    super(props)
    this.state = { zDepth: 1 }
  }

  handleMouseEnter = () => {
    this.setState({
      zDepth: 2
    })
  }

  handleMouseLeave = () => {
    this.setState({
      zDepth: 1
    })
  }

  render() {
    const { children } = this.props
    return (
      <Link to={this.props.url}>
        <Paper
          style={styles.paper}
          zDepth={this.state.zDepth}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          {children}
        </Paper>
      </Link>
    )
  }
}

export default Item
