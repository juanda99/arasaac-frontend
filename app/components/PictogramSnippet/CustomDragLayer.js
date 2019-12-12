import React from 'react'
import { DragLayer } from 'react-dnd'
import { PICTOGRAMS_URL } from 'services/config'
import Image from './Image'
import StyledPaper from './StyledPaper'

function getItemStyles(props) {
  console.log(props)
  const { currentOffset, initialOffset } = props
  if (!currentOffset) {
    return {
      display: 'none'
    }
  }

  const { x, y } = currentOffset
  const transform = `translate(${x - 100}px, ${y - 850 + window.scrollY}px)`
  return {
    transform,
    WebkitTransform: transform
  }
}

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
}

function CustomDragLayer({ item, itemType, isDragging, ...props }) {
  if (!isDragging) {
    return null
  }

  // function renderItem(type, item) {
  //   switch (type) {
  //     case ItemTypes.BOX:
  //       return <BoxDragPreview title={item.title} />
  //   }
  // }
  {
    console.log('drawing.....')
    console.log(item)
  }
  return (
    <div style={layerStyles} id='kkkkkk' ref={(c) => (this.layer = c)}>
      <div style={getItemStyles(props)}>
        <Image
          src={`${PICTOGRAMS_URL}/${item._id}/${item._id}_300.png`}
          style={{ width: 300, height: 300 }}
        />
      </div>
    </div>
  )
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }
}

export default DragLayer(collect)(CustomDragLayer)
