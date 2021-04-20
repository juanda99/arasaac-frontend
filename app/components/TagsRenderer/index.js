import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Chip from 'material-ui/Chip'
import ActivityIcon from 'material-ui/svg-icons/action/input'
import AreaIcon from 'material-ui/svg-icons/social/school'
import Avatar from 'material-ui/Avatar'
import { lightGreen400, lightGreen800 } from 'material-ui/styles/colors'
import { FormattedMessage } from 'react-intl'

import muiThemeable from 'material-ui/styles/muiThemeable'

import activities from 'data/activities'
import areas from 'data/areas'
import messages from 'components/Filters/messages'

const styles = {
  chip: {
    margin: '4px',
  },
  div: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}

class TagsRenderer extends Component {
  getIcon(type) {
    switch (type) {
      case 'activity':
        return <ActivityIcon />
      case 'area':
        return <AreaIcon />
      default:
        return null
    }
  }

  getArray(type) {
    switch (type) {
      case 'activity':
        return activities
      case 'area':
        return areas
      default:
        return null
    }
  }

  handleClick = (filterItem, nextStatus, e) => {
    const { onClick, type } = this.props
    if (onClick) onClick(type, filterItem, nextStatus, e)
  }

  render() {
    const { tags, type, selected } = this.props
    const customIcon = this.getIcon(type)
    const selectedArray = this.getArray(type)
    const rendered = tags.map((tag) => {
      const tagCode = selectedArray.filter((item) => item.code === tag)[0].text
      if (selected && selected === tag) {
        return (
          <Chip
            backgroundColor={lightGreen400}
            style={styles.chip}
            key={tag}
            onClick={(e) => this.handleClick(tag, 0, e)}
          >
            <Avatar
              color={'white'}
              size={30}
              backgroundColor={lightGreen800}
              icon={customIcon}
            />
            <FormattedMessage {...messages[tagCode]} />
          </Chip>
        )
      }
      return (
        <Chip
          style={styles.chip}
          key={tag}
          onClick={(e) => this.handleClick(tag, 1, e)}
        >
          <Avatar icon={customIcon} />
          <FormattedMessage {...messages[tagCode]} />
        </Chip>
      )
    })
    return <div style={styles.div}> {rendered}</div>
  }
}

TagsRenderer.propTypes = {
  tags: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  selected: PropTypes.string,
  onClick: PropTypes.func,
}

export default muiThemeable()(TagsRenderer)
