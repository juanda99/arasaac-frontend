import React from "react";
import { DragLayer } from "react-dnd";
import { PICTOGRAMS_URL } from "services/config";
import Image from "./Image";
import StyledPaper from "./StyledPaper";

function getItemStyles(props) {
  const { currentOffset, initialOffset } = props;
  if (!currentOffset) {
    return {
      display: "none",
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

const layerStyles = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
};

function CustomDragLayer({ item, itemType, isDragging, ...props }) {
  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles} id="kkkkkk">
      <div style={getItemStyles(props)}>
        <StyledPaper>
          <Image src={`${PICTOGRAMS_URL}/${item._id}/${item._id}_300.png`} />
        </StyledPaper>
      </div>
    </div>
  );
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  };
}

export default DragLayer(collect)(CustomDragLayer);
