/**
*
* Item
*
*/

import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Paper from 'material-ui/Paper'
import Image from 'components/Image'
import H3 from 'components/H3'

const styles = {
  paper: {
    width: '100%',
    maxWidth: '370px',
    padding: '1em',
    margin: '0 auto'
  },
  H3: {
    textAlign: 'center'
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
        style={styles.paper}
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <H3 style={styles.H3}>{title}</H3>
        <Link to={route}>
          <Image src={image} alt={title} />
        </Link>
      </Paper>
    )
  }
}

export default Item
