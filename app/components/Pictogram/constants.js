/* eslint no-mixed-operators: 0 */
export const THIN = 10
export const MEDIUM = 20
export const THICK = 40
export const PICTO_SIZE = 500
export const CAPTION_SIZE = 50
export const getCanvasSize = (topCaption, buttonCaption) => {
  let canvasSize = PICTO_SIZE
  // increase canvasSize if topCaption
  canvasSize = topCaption ? canvasSize + CAPTION_SIZE : canvasSize
  // increase canvasSize if buttonCaption
  canvasSize = buttonCaption ? canvasSize + CAPTION_SIZE : canvasSize
  return canvasSize
}
