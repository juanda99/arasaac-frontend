import React, { Component } from 'react'
import Item from 'components/AACUsage/Item'
import Img from 'components/AACUsage/Img'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import H2 from 'components/H2'
import P from 'components/P'
import PictogramTitle from '../BoxTitle'
import { IMAGES_URL } from 'services/config'

const styles = {
  button: {
    margin: 8,
    minWidth: 120,
    maxWidth: 200,
  },
}

class AppItem extends Component {
  render() {
    const { title, desc, img, tutorialUrl, appUrl } = this.props
    return (
      <Item>
        <H2 primary={true}>{title}</H2>

        <Img src={`${IMAGES_URL}/apps/${img}`} />
        <PictogramTitle>
          <RaisedButton
            label="Ver tutorial"
            style={styles.button}
            secondary={true}
          />
          <RaisedButton primary={true} label="Acceder" style={styles.button} />
        </PictogramTitle>
        <P justify>{desc}</P>
      </Item>
    )
  }
}

AppItem.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  tutorialUrl: PropTypes.string.isRequired,
  appUrl: PropTypes.string.isRequired,
}

export default AppItem
