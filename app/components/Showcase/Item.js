/**
*
* Item
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import Paper from 'material-ui/Paper'
import Image from 'components/Image'
import H3 from 'components/H3'
import { grey200 } from 'material-ui/styles/colors'
import FullWidthSection from 'components/FullWidthSection'

const styles = {
  paper: {
    width: '100%',
    padding: 0,
    margin: '0 0'
  },
  H3: {
    textAlign: 'center',
    color: 'black'
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
      zDepth: 4
    })
  }

  handleMouseLeave = () => {
    this.setState({
      zDepth: 1
    })
  }

  render() {
    const { title, route, image } = this.props
    return (
      <Link to={route}>
        <Paper
          style={styles.paper}
          zDepth={this.state.zDepth}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <FullWidthSection color={grey200}>
            <H3 style={styles.H3}>{title}</H3>
          </FullWidthSection>
          <Image src={image} alt={title} style={{ margin: 20 }} />
        </Paper>
      </Link>
    )
  }
}

export default Item
