/**
*
* Item
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'

const styles = {
  paper: {
    width: '100%',
    padding: '20'
  }
}

class Item extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    title: PropTypes.object.isRequired,
    route: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
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
    const { route, children } = this.props
    return (
        <Paper
          style={styles.paper}
          zDepth={this.state.zDepth}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          {children}
        </Paper>
    )
  }
}

export default Item
