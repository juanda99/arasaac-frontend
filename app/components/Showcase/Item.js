/**
*
* Item
*
*/

import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Paper from 'material-ui/Paper'

class Item extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    title: PropTypes.object.isRequired,
    route: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { zDepth: 0 }
  }

  handleMouseEnter = () => {
    this.setState({
      zDepth: 4
    })
  }

  handleMouseLeave = () => {
    this.setState({
      zDepth: 0
    })
  }

  render() {
    const { title, route, image } = this.props
    return (
      <Paper
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <h3>{title}</h3>
        <Link to={route}>
          <img src={image} alt={title} />
        </Link>
      </Paper>
    )
  }
}

export default Item
